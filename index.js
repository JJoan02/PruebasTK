import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as cluster from 'cluster';
import { promises as fs } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';
import os from 'os';
import packageJson from './package.json' assert { type: 'json' };

const { name, author } = packageJson;

const rl = createInterface(process.stdin, process.stdout);

// Función para mostrar texto estilizado en la consola
const displayText = (text, options) => {
    const { font, align, gradient } = options;
    cfonts.say(text, {
        font: font || 'default',
        align: align || 'left',
        gradient: gradient || ['white', 'black']
    });
};

// Función para imprimir el encabezado
const printHeader = () => {
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
};

// Imprime el encabezado inicial
printHeader();

let isRunning = false;
const maxRestartAttempts = 5; // Límite de reinicios
let restartAttempts = 0;

// Función para iniciar el proceso principal
async function start(file) {
    if (isRunning) return;
    isRunning = true;

    const currentFilePath = fileURLToPath(import.meta.url);
    const args = [join(dirname(currentFilePath), file), ...process.argv.slice(2)];

    displayText([process.argv[0], ...args].join(' '), {
        font: 'console',
        align: 'center',
        gradient: ['red', 'magenta']
    });

    if (cluster.isMaster) {
        cluster.on('fork', (worker) => {
            console.log(`Worker ${worker.id} forked`);
        });

        cluster.on('exit', (worker, code, signal) => {
            console.error(`Worker ${worker.id} died with code: ${code}, and signal: ${signal}`);
            if (code !== 0 && restartAttempts < maxRestartAttempts) {
                restartAttempts++;
                console.log(`Reiniciando proceso (${restartAttempts}/${maxRestartAttempts})...`);
                start(file);
            } else if (restartAttempts >= maxRestartAttempts) {
                console.error('Número máximo de reinicios alcanzado. No se reiniciará el proceso.');
            }
        });

        const worker = cluster.fork();

        worker.on('message', (data) => {
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

        try {
            const watcher = fs.watch(args[0], () => {
                watcher.close();
                start(file);
            });

            watcher.on('error', (err) => {
                console.error(chalk.red(`❌ Error al monitorear el archivo: ${err}`));
            });
        } catch (err) {
            console.error(chalk.red(`❌ Error al iniciar el monitoreo del archivo: ${err}`));
        }

        // Información del sistema
        const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
        const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);
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
┊${chalk.blueBright('┊')}${chalk.cyan(`💚 Nombre: ${name}`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`💻 Versión: ${packageJson.version}`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`💜 Descripción: ${packageJson.description}`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`😺 Project Author: ${author.name} (@Joan-TK)`)}
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
        } catch (err) {
            console.error(chalk.red(`❌ No se pudo leer el archivo package.json: ${err}`));
        }

    } else {
        console.log('Worker process started.');
    }

    // Configuración de argumentos de línea de comando
    const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
    if (!opts['test']) {
        if (rl.listenerCount('line') === 0) {
            rl.on('line', line => {
                process.send(line.trim());
            });
        }
    }
}

// Inicia el proceso con el archivo principal
start('main.js');
