import fetch from "node-fetch";
import yts from "yt-search";
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) throw `${lenguajeGB['smsAvisoMG']()}${mid.smsMalused4}\n*${usedPrefix + command} Billie Eilish - Bellyache*`;
    
    try {
        const yt_play = await search(args.join(" "));
        let additionalText = command === 'play' ? '𝘼𝙐𝘿𝙄𝙊 🔊' : '𝙑𝙄𝘿𝙀𝙊 🎥';
        let captionvid = `𓆩 𓃠 𓆪 ✧═══ ${vs} ═══✧ 𓆩 𓃠 𓆪*

        ও ${mid.smsYT1}
        »  ${yt_play[0].title}
        ﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
        ও ${mid.smsYT15}
        » ${yt_play[0].ago}
        ﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
        ও ${mid.smsYT5}
        » ${secondString(yt_play[0].duration.seconds)}
        ﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
        ও  ${mid.smsYT10}
        » ${MilesNumber(yt_play[0].views)}
        ﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
        ও  ${mid.smsYT4}
        » ${yt_play[0].url}
        ﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
        ও ${mid.smsAguarde(additionalText)}

        *𓆩 𓃠 𓆪 ✧═══ ${vs} ═══✧ 𓆩 𓃠 𓆪*`;

        await conn.sendMessage(m.chat, {
            text: captionvid,
            contextInfo: {
                externalAdReply: {
                    title: yt_play[0].title,
                    body: packname,
                    thumbnailUrl: yt_play[0].thumbnail,
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        if (command === 'play') {
            await handleAudio(m, yt_play, conn);
        } else if (command === 'play2') {
            await handleVideo(m, yt_play, conn);
        }
    } catch (error) {
        handler.limit = 0;
        console.error(`Error in handler: ${error.message}`);
    }
};

async function handleAudio(m, yt_play, conn) {
    try {
        let q = '128kbps';
        let v = yt_play[0].url;
        const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v));
        const dl_url = await yt.audio[q].download();
        const ttl = await yt.title;
        const size = await yt.audio[q].fileSizeH;
        await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: 'audio/mpeg', contextInfo: {
            externalAdReply: {
                title: ttl,
                body: "",
                thumbnailUrl: yt_play[0].thumbnail,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }}, { quoted: m });
    } catch (error) {
        await handleAudioFallback(m, yt_play, conn, error);
    }
}

async function handleAudioFallback(m, yt_play, conn, error) {
    try {
        let q = '128kbps';
        let v = yt_play[0].url;
        let dl_url = (await ytdl.getInfo(v)).formats.find(f => f.itag === 140)?.url;
        const ttl = yt_play[0].title;
        const size = "Unknown";

        await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: 'audio/mpeg', contextInfo: {
            externalAdReply: {
                title: ttl,
                body: "",
                thumbnailUrl: yt_play[0].thumbnail,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }}, { quoted: m });
    } catch (error) {
        console.error(`Error in handleAudioFallback: ${error.message}`);
    }
}

async function handleVideo(m, yt_play, conn) {
    try {
        const url = yt_play[0].url;
        const yt = await youtubedl(url).catch(async _ => await youtubedlv2(url));
        const dl_url = yt.video['360p'].download();
        await conn.sendMessage(m.chat, { video: { url: dl_url }, mimetype: 'video/mp4', contextInfo: {
            externalAdReply: {
                title: yt_play[0].title,
                body: "",
                thumbnailUrl: yt_play[0].thumbnail,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }}, { quoted: m });
    } catch (error) {
        console.error(`Error in handleVideo: ${error.message}`);
    }
}

async function search(query) {
    return new Promise((resolve, reject) => {
        yts(query, (err, res) => {
            if (err) return reject(err);
            resolve(res.videos);
        });
    });
}

export { handler };
