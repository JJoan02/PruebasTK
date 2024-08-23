// Importaciones
const cluster = require('cluster');
const { fork } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;
const os = require('os');
const { watchFile, unwatchFile } = require('fs');
const fetch = require('node-fetch');

// Configuración del proyecto
const config = {
    apiBaseUrl: 'https://violetics.pw/api/media/youtube-play',
    apiKey: 'beta',
    logLevel: 'info' // Otros niveles: 'debug', 'warn', 'error'
};

// Funciones de logging
const levels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};

const log = (level, message) => {
    if (levels[level] >= levels[config.logLevel]) {
        console.log(`[${level.toUpperCase()}] ${message}`);
    }
};

const logger = {
    debug: (message) => log('debug', message),
    info: (message) => log('info', message),
    warn: (message) => log('warn', message),
    error: (message) => log('error', message)
};

// Manejo de errores
const handleError = async (conn, m, command, usedPrefix, error) => {
    await conn.reply(m.chat, `Error en el comando ${usedPrefix + command}\n\n${error}`, m);
    logger.error(`Error en el comando ${usedPrefix + command}: ${error}`);
};

// Funciones para obtener URLs de audio y video
const fetchUrl = async (text, type) => {
    try {
        const res = await fetch(`${config.apiBaseUrl}?apikey=${config.apiKey}&query=${text}`);
        const json = await res.json();
        if (!json.result || !json.result.url) {
            throw new Error('No se encontró la URL');
        }
        return json.result.url;
    } catch (err) {
        logger.error(`Error al obtener URL para ${type}: ${err}`);
        throw err;
    }
};

const fetchAudioUrl = (text) => fetchUrl(text, 'audio');
const fetchVideoUrl = (text) => fetchUrl(text, 'video');

// Función para manejar solicitudes de medios
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

// Función para iniciar el proceso
let isRunning = false;

async function start(file) {
    if (isRunning) return;
    isRunning = true;

    const currentFilePath = path.resolve(__filename);
    const args = [path.join(__dirname, file), ...process.argv.slice(2)];

    logger.info(`Iniciando proceso con: ${[process.argv[0], ...args].join(' ')}`);

    if (cluster.isMaster) {
        cluster.setupMaster({
            exec: args[0],
            args: args.slice(1)
        });

        const p = cluster.fork();

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
            logger.error(`⚠️ ERROR ⚠️ >> ${code}`);
            if (code !== 0) {
                logger.info('Reiniciando proceso...');
                start(file);
            }
        });

        watchFile(args[0], () => {
            unwatchFile(args[0]);
            start(file);
        });

        const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
        const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);
        logger.info(`RAM total: ${ramInGB.toFixed(2)} GB`);
        logger.info(`RAM libre: ${freeRamInGB.toFixed(2)} GB`);

        const packageJsonPath = path.join(path.dirname(currentFilePath), './package.json');

        try {
            const packageJsonData = await fsPromises.readFile(packageJsonPath, 'utf-8');
            const packageJsonObj = JSON.parse(packageJsonData);
            const currentTime = new Date().toLocaleString();
            logger.info(`package.json leído exitosamente a las ${currentTime}`);
        } catch (error) {
            logger.error('Error al leer package.json:', error);
        }
    }
}

// Manejador de comandos
const handler = async (m, { command, usedPrefix, conn, text }) => {
    if (!text) throw `Por favor, proporciona un texto para el comando. Ejemplo: ${usedPrefix + command} Billie Eilish - Bellyache`;

    await handleMediaRequest(m, command, conn, text, usedPrefix);
};

handler.help = ['play.1', 'play.2'].map(v => v + ' <texto>');
handler.tags = ['downloader'];
handler.command = ['play.1', 'play.2'];
handler.limit = 1;

// Exportaciones
module.exports = {
    start,
    handler
};

