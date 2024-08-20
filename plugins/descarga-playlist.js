import yts from 'yt-search';

const handler = async (m, { conn, usedPrefix, text, command }) => {
  if (!text) {
    return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝙐𝙉 𝙑𝙄𝘿𝙀𝙊 𝙊 𝘾𝘼𝙉𝘼𝙇 𝘿𝙀 𝙔𝙊𝙐𝙏𝙐𝘽𝙀\n\n𝙒𝙍𝙄𝙏𝙀 𝙏𝙃𝙀 𝙉𝘼𝙈𝙀 𝙊𝙁 𝘼 𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝙑𝙄𝘿𝙀𝙊 𝙊𝙍 𝘾𝙃𝘼𝙉𝙉𝙀𝙇`, fkontak, m);
  }

  try {
    const result = await yts(text);
    const videos = result.videos;

    if (videos.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    const listSections = videos.map(v => ({
      title: `${htki} 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎 ${htka}`,
      rows: [
        { header: '𝗔 𝗨 𝗗 𝗜 𝗢', title: '', description: `${v.title} | ${v.timestamp}`, id: `${usedPrefix}ytmp3 ${v.url}` },
        { header: '𝗩 𝗜 𝗗 𝗘 𝗢', title: '', description: `${v.title} | ${v.timestamp}`, id: `${usedPrefix}ytmp4 ${v.url}` },
        { header: '𝗔 𝗨 𝗗 𝗜 𝗢   𝗗 𝗢 𝗖', title: '', description: `${v.title} | ${v.timestamp}`, id: `${usedPrefix}ytmp3doc ${v.url}` },
        { header: '𝗩 𝗜 𝗗 𝗘 𝗢   𝗗 𝗢 𝗖', title: '', description: `${v.title} | ${v.timestamp}`, id: `${usedPrefix}ytmp4doc ${v.url}` }
      ]
    }));

    await conn.sendList(
      m.chat,
      `${htki} *𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎* ${htka}\n\n𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖 𝙙𝙚: ${text}`,
      '𝗕 𝗨 𝗦 𝗖 𝗔 𝗥',
      listSections,
      fkontak
    );

  } catch (e) {
    console.error(e);
    await conn.sendButton(
      m.chat,
      `\n${wm}`,
      `${lenguajeGB['smsMalError3']()}#report ${usedPrefix + command}\n\n${lenguajeGB['smsMensError2']()} ${usedPrefix + command}`,
      null,
      [[lenguajeGB.smsMensError1(), `#reporte ${lenguajeGB['smsMensError2']()} *${usedPrefix + command}*`]],
      null,
      null,
      m
    );
  }
};

handler.help = ['playlist'];
handler.tags = ['dl'];
handler.command = /^playlist|ytbuscar|yts(earch)?$/i;
handler.limit = 1;
handler.level = 3;

export default handler;
