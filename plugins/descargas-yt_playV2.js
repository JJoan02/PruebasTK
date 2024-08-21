import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import fs from 'fs';

// Helper function to handle errors
const handleError = async (conn, m, command, usedPrefix, error) => {
    await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, m);
    console.error(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`);
    console.error(error);
};

// Function to get a URL for the audio
const fetchAudioUrl = async (text) => {
    const res = await fetch(`https://violetics.pw/api/media/youtube-play?apikey=beta&query=${text}`);
    const json = await res.json();
    return json.result.url;
};

// Function to get a URL for the video
const fetchVideoUrl = async (text) => {
    const res = await fetch(`https://violetics.pw/api/media/youtube-play?apikey=beta&query=${text}`);
    const json = await res.json();
    return json.result.url;
};

// Function to handle audio and video commands
const handleMediaRequest = async (m, command, conn, text, usedPrefix) => {
    try {
        if (command === 'play.1') {
            await conn.reply(m.chat, lenguajeGB['smsAvisoEG']() + mid.smsAud, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        description: null,
                        title: wm,
                        body: '𝗦𝘂𝗽𝗲𝗿 𝗝𝗼𝗮𝗻𝗕𝗼𝘁-𝗧𝗞 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽',
                        previewType: 0,
                        thumbnail: joanImg,
                        sourceUrl: accountsgb
                    }
                }
            });
            try {
                const audioUrl = await fetchAudioUrl(text);
                await conn.sendMessage(m.chat, {
                    audio: { url: audioUrl },
                    fileName: 'error.mp3',
                    mimetype: 'audio/mp4'
                }, { quoted: m });
            } catch (error) {
                await handleError(conn, m, command, usedPrefix, error);
            }
        } else if (command === 'play.2') {
            await conn.reply(m.chat, lenguajeGB['smsAvisoEG']() + mid.smsVid, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        description: null,
                        title: wm,
                        body: '𝗦𝘂𝗽𝗲𝗿 𝗝𝗼𝗮𝗻𝗕𝗼𝘁-𝗧𝗞 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽',
                        previewType: 0,
                        thumbnail: joanImg,
                        sourceUrl: accountsgb
                    }
                }
            });
            try {
                const videoUrl = await fetchVideoUrl(text);
                await conn.sendFile(m.chat, videoUrl, 'error.mp4', `${wm}`, m);
            } catch (error) {
                await handleError(conn, m, command, usedPrefix, error);
            }
        }
    } catch (error) {
        await handleError(conn, m, command, usedPrefix, error);
    }
};

const handler = async (m, { command, usedPrefix, conn, text }) => {
    if (!text) throw `${mg}${mid.smsMalused4}\n*${usedPrefix + command} Billie Eilish - Bellyache*`;

    await handleMediaRequest(m, command, conn, text, usedPrefix);
};

handler.help = ['play.1', 'play.2'].map(v => v + ' <texto>');
handler.tags = ['downloader'];
handler.command = ['play.1', 'play.2'];
handler.limit = 1;

export default handler;

function bytesToSize(bytes) {
    return new Promise((resolve) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return resolve('n/a');
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        resolve(`${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`);
    });
}

async function ytMp3(url) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(url).then(async (getUrl) => {
            const result = getUrl.formats
                .filter(item => item.mimeType === 'audio/webm; codecs="opus"')
                .map(async (item) => {
                    const bytes = await bytesToSize(item.contentLength);
                    return { audio: item.url, size: bytes };
                });
            const resultFix = (await Promise.all(result)).filter(x => x.audio && x.size);
            const tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
            const tinyUrl = tiny.data;
            const title = getUrl.videoDetails.title;
            const thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({ title, result: tinyUrl, result2: resultFix, thumb });
        }).catch(reject);
    });
}

async function ytMp4(url) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(url).then(async (getUrl) => {
            const result = getUrl.formats
                .filter(item => item.container === 'mp4' && item.hasVideo && item.hasAudio)
                .map(async (item) => {
                    const bytes = await bytesToSize(item.contentLength);
                    return { video: item.url, quality: item.qualityLabel, size: bytes };
                });
            const resultFix = (await Promise.all(result)).filter(x => x.video && x.size && x.quality);
            const tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
            const tinyUrl = tiny.data;
            const title = getUrl.videoDetails.title;
            const thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({ title, result: tinyUrl, rersult2: resultFix[0].video, thumb });
        }).catch(reject);
    });
}

async function ytPlay(query) {
    return new Promise((resolve, reject) => {
        yts(query).then(async (getData) => {
            const result = getData.videos.slice(0, 5);
            const url = result.map(video => video.url);
            const random = url[0];
            const getAudio = await ytMp3(random);
            resolve(getAudio);
        }).catch(reject);
    });
}

async function ytPlayVid(query) {
    return new Promise((resolve, reject) => {
        yts(query).then(async (getData) => {
            const result = getData.videos.slice(0, 5);
            const url = result.map(video => video.url);
            const random = url[0];
            const getVideo = await ytMp4(random);
            resolve(getVideo);
        }).catch(reject);
    });
}
