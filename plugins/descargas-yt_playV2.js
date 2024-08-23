// Importaciones (usa 'require' para CommonJS)
const cluster = require('cluster');
const { fork } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;
const os = require('os');
const { watchFile, unwatchFile } = require('fs');
const { join } = require('path');

// Definición de variables
let isRunning = false;

// Función para iniciar el proceso
async function start(file) {
    if (isRunning) return;
    isRunning = true;

    const currentFilePath = new URL(import.meta.url).pathname;
    let args = [join(__dirname, file), ...process.argv.slice(2)];

    displayText([process.argv[0], ...args].join(' '), {
        font: 'console',
        align: 'center',
        gradient: ['red', 'magenta']
    });

    if (cluster.isMaster) {
        cluster.setupMaster({
            exec: args[0],
            args: args.slice(1)
        });

        let p = cluster.fork();

        p.on('message', data => {
            if (data === 'reset') {
                p.process.kill();
                isRunning = false;
                start(file);
            } else if (data === 'uptime') {
                p.send(process.uptime());
            }
        });

        p.on('exit', (_, code) => {
            isRunning = false;
            console.error('⚠️ ERROR ⚠️ >> ', code);
            if (code !== 0) {
                console.log('Reiniciando proceso...');
                start(file);
            }
        });

        watchFile(args[0], () => {
            unwatchFile(args[0]);
            start(file);
        });

        const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
        const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);
        const packageJsonPath = path.join(path.dirname(currentFilePath), './package.json');

        try {
            const packageJsonData = await fsPromises.readFile(packageJsonPath, 'utf-8');
            const packageJsonObj = JSON.parse(packageJsonData);
            const currentTime = new Date().toLocaleString();
            // Agrega lógica adicional aquí si es necesario
        } catch (error) {
            console.error('Error al leer package.json:', error);
        }
    }
}

// Funciones adicionales y manejo de errores
const handleError = async (conn, m, command, usedPrefix, error) => {
    await conn.reply(m.chat, `Error en el comando ${usedPrefix + command}\n\n${error}`, m);
    console.error(`Error en el comando ${usedPrefix + command}:`, error);
};

// Funciones para obtener URLs de audio y video
const fetchAudioUrl = async (text) => {
    const res = await fetch(`https://violetics.pw/api/media/youtube-play?apikey=beta&query=${text}`);
    const json = await res.json();
    return json.result.url;
};

const fetchVideoUrl = async (text) => {
    const res = await fetch(`https://violetics.pw/api/media/youtube-play?apikey=beta&query=${text}`);
    const json = await res.json();
    return json.result.url;
};

// Función principal para manejar solicitudes de medios
const handleMediaRequest = async (m, command, conn, text, usedPrefix) => {
    try {
        if (command === 'play.1') {
            await conn.reply(m.chat, 'Descargando audio...', m);
            const audioUrl = await fetchAudioUrl(text);
            await conn.sendMessage(m.chat, {
                audio: { url: audioUrl },
                fileName: 'audio.mp3',
                mimetype: 'audio/mp4'
            }, { quoted: m });
        } else if (command === 'play.2') {
            await conn.reply(m.chat, 'Descargando video...', m);
            const videoUrl = await fetchVideoUrl(text);
            await conn.sendFile(m.chat, videoUrl, 'video.mp4', 'Video descargado', m);
        }
    } catch (error) {
        await handleError(conn, m, command, usedPrefix, error);
    }
};

// Manejador de comandos
const handler = async (m, { command, usedPrefix, conn, text }) => {
    if (!text) throw `Por favor, proporciona un texto para el comando. Ejemplo: ${usedPrefix + command} Billie Eilish - Bellyache`;

    await handleMediaRequest(m, command, conn, text, usedPrefix);
};

handler.help = ['play.1', 'play.2'].map(v => v + ' <texto>');
handler.tags = ['downloader'];
handler.command = ['play.1', 'play.2'];
handler.limit = 1;

module.exports = handler;

