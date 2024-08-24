import { groupInviteCode } from 'path-to-your-utils'; // Asegúrate de importar la función si está en otro archivo

// Expresión regular para detectar enlaces relacionados con WhatsApp en los mensajes
const linkRegex = /whatsapp.com|wa.me|whatsapp.com\/channel/i;

// Mensajes para las advertencias
const messages = {
    warning1: "⚠️ *Advertencia 1 de 3:* Enlace prohibido detectado. (Grupo WSP)¡No vuelvas a hacerlo! 🚫",
    warning2: "⚠️ *Advertencia 2 de 3:* ¡Aún estás enviando enlaces prohibidos! (Grupo WSP) 🚫😡",
    warning3: "🚨 *Advertencia Final 3 de 3:* ¡Has sido expulsado por enviar enlaces prohibidos! 🚪👋"
};

let handler = m => m;

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
    // Verifica si el mensaje proviene de un grupo
    if (!m.isGroup) return;

    // Verifica permisos del usuario y evita que el bot actúe si el mensaje proviene del bot, un administrador, o el propietario
    if (isAdmin || isOwner || m.fromMe || isROwner || !isBotAdmin) return;

    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    const user = `@${m.sender.split`@`[0]}`; // Nombre del usuario para las menciones
    const bot = global.db.data.settings[this.user.jid] || {};

    // Verifica si el mensaje contiene un enlace relacionado con WhatsApp
    const isGroupLink = linkRegex.exec(m.text);

    // Si la protección contra enlaces está activada y se detecta un enlace
    if (chat.antiLink && isGroupLink) {
        // Obtiene el enlace del grupo actual
        const linkThisGroup = `https://chat.whatsapp.com/${await groupInviteCode(m.chat)}`;

        // Si el enlace del mensaje es el del grupo actual, no hace nada
        if (m.text.includes(linkThisGroup)) return;

        // Cargar el contador de advertencias del usuario
        let warnings = global.db.data.users[m.sender]?.warnings || 0;

        // Incrementar el contador de advertencias
        warnings += 1;
        global.db.data.users[m.sender] = { ...global.db.data.users[m.sender], warnings };

        // Mensajes de advertencia según el número de advertencias
        if (warnings === 1) {
            await conn.sendMessage(m.chat, { text: messages.warning1, mentions: [m.sender] }, { quoted: m });
        } else if (warnings === 2) {
            await conn.sendMessage(m.chat, { text: messages.warning2, mentions: [m.sender] }, { quoted: m });
        } else if (warnings >= 3) {
            await conn.sendMessage(m.chat, { text: messages.warning3, mentions: [m.sender] }, { quoted: m });
            // Elimina el mensaje del enlace
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
            // Expulsa al usuario del grupo
            let response = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            if (response[0].status === '404') return;
            // Reinicia el contador de advertencias del usuario
            global.db.data.users[m.sender].warnings = 0;
        }

        return !0;
    }

    return !0;
};

export default handler;
