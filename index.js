import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import cluster from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import express from 'express';
import chalk from 'chalk';
import os from 'os';
import { promises as fsPromises } from 'fs';
import { z } from 'zod';

// Definir los esquemas con zod
const BioskopArgsSchema = z.object({
    page: z.number().min(1).max(4)
});

const BioskopSchema = z.object({
    title: z.string(),
    img: z.string(),
    url: z.string(),
    genre: z.string(),
    duration: z.string(),
    release: z.string(),
    director: z.string(),
    cast: z.string()
});

const BioskopNowSchema = z.object({
    title: z.string(),
    img: z.string(),
    url: z.string(),
    genre: z.string(),
    duration: z.string(),
    playingAt: z.string()
});

export { BioskopArgsSchema, BioskopSchema, BioskopNowSchema };

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

const displayText = (text, options) => {
    const { font, align, gradient } = options;
    say(text, {
        font: font || 'default',
        align: align || 'left',
        gradient: gradient || ['white', 'black']
    });
};

displayText('Admin\nBot\nTK', {
    font: 'chrome',
    align: 'center',
    gradient: ['red', 'magenta']
});

displayText('Por Joan-TK', {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
});

var isRunning = false;

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
        // Configuración del master
        cluster.setupMaster({
            exec: args[0],
            args: args.slice(1)
        });

        cluster.on('fork', (worker) => {
            console.log(`Worker ${worker.id} forked`);
        });

        cluster.on('exit', (worker, code, signal) => {
            console.error(`Worker ${worker.id} died with code: ${code}, and signal: ${signal}`);
            if (code !== 0) {
                console.log('Reiniciando proceso...');
                start(file);
            }
        });

        let p = cluster.fork();

        p.on('message', data => {
            switch (data) {
                case 'reset':
                    p.process.kill();
                    isRunning = false;
                    start(file);
                    break;
                case 'uptime':
                    p.send(process.uptime());
                    break;
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
            
            let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》';
            console.log(chalk.yellow(`╭${lineM}

