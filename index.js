import { join, dirname } from 'path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'url';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';
import os from 'os';
import { promises as fsPromises } from 'fs';
import cluster from 'cluster';

// Importar cluster usando createRequire
const require = createRequire(import.meta.url);
const { name, author } = require(join(dirname(fileURLToPath(import.meta.url)), './package.json'));
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
    let args = [join(dirname(currentFilePath), file), ...process.argv.slice(2)];

    displayText([process.argv[0], ...args].join(' '), {
        font: 'console',
        align: 'center',
        gradient: ['red', 'magenta']
    });

    // Configurar el proceso maestro
    cluster.setupMaster({
        exec: args[0], // El archivo que se ejecutará en el worker
        args: args.slice(1) // Argumentos pasados al worker
    });

    let worker = cluster.fork();

    worker.on('message', data => {
        switch (data) {
            case 'reset':
                worker.process.kill();
                isRunning = false;
                start(file);
                break;
            case 'uptime':
                worker.send(process.uptime());
                break;
        }
    });

    worker.on('exit', (_, code) => {
        isRunning = false;
        console.error('⚠️ ERROR ⚠️ >> ', code);
        if (code !== 0) {
            console.log('Reiniciando proceso...');
            start(file);
        }
    });

    // Monitorea cambios en el archivo y reinicia si hay cambios
    watchFile(args[0], () => {
        unwatchFile(args[0]);
        start(file);
    });

    const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
    const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);
    const packageJsonPath = join(dirname(currentFilePath), './package.json');
    
    try {
        const packageJsonData = await fsPromises.readFile(packageJsonPath, 'utf-8');
        const packageJsonObj = JSON.parse(packageJsonData);
        const currentTime = new Date().toLocaleString();
        
        let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》';
        console.log(chalk.yellow(`╭${lineM}
┊${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊${chalk.blueBright('┊')}${chalk.yellow(`🖥️ ${os.type()}, ${os.release()} - ${os.arch()}`)}
┊${chalk.blueBright('┊')}${chalk.yellow(`💾 Total RAM: ${ramInGB.toFixed(2)} GB`)}
┊${chalk.blueBright('┊')}${chalk.yellow(`💽 Free RAM: ${freeRamInGB.toFixed(2)} GB`)}
┊${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊${chalk.blueBright('┊')} ${chalk.blue.bold(`🟢INFORMACIÓN :`)}
┊${chalk.blueBright('┊')} ${chalk.blueBright('┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
┊${chalk.blueBright('┊')}${chalk.cyan(`💚 Nombre: ${packageJsonObj.name}`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`💻 Versión: ${packageJsonObj.version}`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`💜 Descripción: ${packageJsonObj.description}`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`😺 Project Author: ${packageJsonObj.author.name} (@Joan-TK)`)}
┊${chalk.blueBright('┊')}${chalk.blueBright('┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
┊${chalk.blueBright('┊')}${chalk.yellow(`💜 Colaboradores:`)}
┊${chalk.blueBright('┊')}${chalk.yellow(`• JJoan02 (Joan-TK)`)}
┊${chalk.blueBright('┊')}${chalk.yellow(`• KatashiFukushima (Katashi)`)}
┊${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
┊${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊${chalk.blueBright('┊')}${chalk.cyan(`⏰ Hora Actual :`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`${currentTime}`)}
┊${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
╰${lineM}`));
        setInterval(() => {}, 1000);
    } catch (err) {
        console.error(chalk.red(`❌ No se pudo leer el archivo package.json: ${err}`));
    }

    let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
    if (!opts['test']) {
        if (!rl.listenerCount()) rl.on('line', line => {
            worker.send({ type: 'message', data: line.trim() });
        });
    }
}

start('main.js');

