import fs from 'fs';
const rutaArchivo = './prefijos.json';
const existeArchivo = fs.existsSync(rutaArchivo);

let handler = m => m;
handler.before = async function (m, { conn, isAdmin, isOwner, isROwner, isBotAdmin }) {
    if (!m.isGroup || m.fromMe || isAdmin || isOwner || isROwner || !isBotAdmin) return;

    let delet = m.key.participant;
    let bang = m.key.id;
    let chat = global.db.data.chats[m.chat];

    if (chat.antifake) {
        let textoAdvertencia = `${mid.mAdvertencia} 😜 *¡Oh oh! Parece que tu número no es bienvenido aquí, ${m.sender.split('@')[0]}* 🚫\n*¡Fuera del grupo!* 😏`;

        const verificarPrefijo = (numero, prefijos) => prefijos.some(prefijo => numero.startsWith(prefijo));

        try {
            const prefijos = existeArchivo ? JSON.parse(fs.readFileSync(rutaArchivo, 'utf-8')) : ['6', '9', '7', '4', '2'];

            if (verificarPrefijo(m.sender, prefijos)) {
                await conn.sendMessage(m.chat, { text: textoAdvertencia, mentions: [m.sender] }, { quoted: m });
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
                let response = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                if (response[0].status === "404") return;
            }
        } catch (error) {
            console.error('Error al procesar prefijos:', error);
        }
    }
};
export default handler;
