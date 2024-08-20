import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import { exec } from 'child_process';

// Buscar en YouTube y devolver la primera coincidencia
async function search(query) {
  const results = await yts(query);
  return results.videos[0];
}

// Descargar la música del video de YouTube
async function downloadAudio(url, title) {
  const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
  const filePath = `./downloads/${title}.mp3`;

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath);
    stream.pipe(writeStream);

    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
}

// Manejar la solicitud de descarga
const handler = async (m, { conn, command, args }) => {
  if (!args.length) {
    return conn.reply(m.chat, 'Por favor, proporciona el nombre de la canción o el artista.', m);
  }

  try {
    const query = args.join(' ');
    const video = await search(query);

    if (!video) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    const filePath = await downloadAudio(video.url, video.title);
    conn.reply(m.chat, `Descarga completada: ${filePath}`, m);

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Ocurrió un error al intentar descargar la música.', m);
  }
};

handler.command = ['play', 'play2', 'play3', 'play4']
//handler.limit = 3
//handler.register = true 
export default handler;

async function search(query, options = {}) {
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
return search.videos;
}

function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1.';
const arr = number.toString().split('.');
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
seconds = Number(seconds);
const d = Math.floor(seconds / (3600 * 24));
const h = Math.floor((seconds % (3600 * 24)) / 3600);
const m = Math.floor((seconds % 3600) / 60);
const s = Math.floor(seconds % 60);
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
return dDisplay + hDisplay + mDisplay + sDisplay;
  }
