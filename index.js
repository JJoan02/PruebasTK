import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import cluster from 'cluster';  // Importar el módulo cluster
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';
import os from 'os';
import { promises as fsPromises } from 'fs';
import { z } from 'zod'; // Importar zod para validar los esquemas

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

// Exportar los esquemas para que estén disponibles en otros módulos si es necesario
export { BioskopArgsSchema, BioskopSchema, BioskopNowSchema };

// https://stackoverflow.com/a/50052194
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname); // Incorpora la capacidad de crear el método 'requerir'
const { name, author } = require(join(__dirname, './package.json')); // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

const displayText = (text, options) => {
    const { font, align, gradient } = options;
    say(text, {
        font: font || 'default',    // Estilo de fuente, usa 'default' si no se especifica
        align: align || 'left',     // Alineación del texto, usa 'left' si no se especifica
        gradient: gradient || ['white', 'black'] // Gradiente de colores, usa blanco a negro por defecto
    });
};

displayText('Admin\nBot\nTK', {
    font: 'chrome',              // Estilo de fuente utilizado ('chrome')
    align: 'center',             // Alineación del texto en el centro
    gradient: ['red', 'magenta'] // Gradiente de colores utilizado (de rojo a magenta)
});

displayText('Por Joan-TK', {
    font: 'console',             // Estilo de fuente utilizado ('console')
    align: 'center',             // Alineación del texto en el centro
    gradient: ['red', 'magenta'] // Gradiente de colores utilizado (de rojo a magenta)
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
        // Master process
        console.log(`Master ${process.pid} is running`);
        const numCPUs = os.cpus().length;
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.error(`⚠️ Worker ${worker.process.pid} exited with code ${code}`);
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
    } else {
        // Worker processes
        console.log(`Worker ${process.pid} started`);

        process.on('message', data => {
            switch (data) {
                case 'reset':
                    process.exit(0);
                    break;
                case 'uptime':
                    process.send(process.uptime());
                    break;
            }
        });
    }

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

    let opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
    if (!opts['test']) {
        if (!rl.listenerCount()) {
            rl.on('line', line => {
                process.send({ message: line.trim() });
            });
        }
    }
}

start('main.js');
