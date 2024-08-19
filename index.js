import { join, dirname } from 'path'
import { createRequire } from 'module';
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'
import express from 'express'
import chalk from 'chalk'
import path from 'path'
import os from 'os'
import { promises as fsPromises } from 'fs'

// https://stackoverflow.com/a/50052194
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) //Incorpora la capacidad de crear el método 'requerir'
const { name, author } = require(join(__dirname, './package.json')) //https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

//const app = express()
//const port = process.env.PORT || 8080;

// Mostrar el texto '𝑨𝒅𝒎𝒊𝒏\n𝑻𝑲' en la consola con un estilo de fuente y gradiente de color específico
say('Admin\nBot\nTK', {
    font: 'chrome',              // Estilo de fuente utilizado ('chrome')
    align: 'center',             // Alineación del texto en el centro
    gradient: ['red', 'magenta'] // Gradiente de colores utilizado (de rojo a magenta)
})

// Mostrar el texto 'Por 𝑱𝒐𝒂𝒏-𝑻𝑲' en la consola con otro estilo de fuente y gradiente de color
say(`Por Joan-TK`, {
    font: 'console',             // Estilo de fuente utilizado ('console')
    align: 'center',             // Alineación del texto en el centro
    gradient: ['red', 'magenta'] // Gradiente de colores utilizado (de rojo a magenta)
})

// Variable para controlar si el proceso ya está en ejecución
var isRunning = false

// Función asíncrona para iniciar un archivo específico
async function start(file) {
    // Verificar si el proceso ya está en ejecución, y si es así, no continuar
    if (isRunning) return
    isRunning = true // Marcar que el proceso está en ejecución

    // Obtener la ruta actual del archivo
    const currentFilePath = new URL(import.meta.url).pathname

    // Configurar los argumentos para ejecutar el archivo, incluyendo los argumentos de la línea de comandos
    let args = [join(__dirname, file), ...process.argv.slice(2)]

    // Mostrar en la consola los argumentos con una fuente y gradiente específicos
    say([process.argv[0], ...args].join(' '), {
        font: 'console',            // Estilo de fuente ('console')
        align: 'center',            // Alineación del texto en el centro
        gradient: ['red', 'magenta'] // Gradiente de colores (rojo a magenta)
    })

    // Configurar el proceso maestro para ejecutar el archivo especificado
    setupMaster({
        exec: args[0],         // Archivo a ejecutar
        args: args.slice(1)    // Argumentos adicionales
    })

    // Crear un proceso hijo
    let p = fork()

    // Manejar mensajes enviados desde el proceso hijo
    p.on('message', data => {
        switch (data) {
            // Reiniciar el proceso si se recibe el mensaje 'reset'
            case 'reset':
                p.process.kill()     // Terminar el proceso hijo
                isRunning = false    // Marcar que ya no está en ejecución
                start.apply(this, arguments) // Reiniciar el proceso
                break
            // Enviar el tiempo de actividad del proceso si se recibe el mensaje 'uptime'
            case 'uptime':
                p.send(process.uptime()) // Enviar el tiempo de actividad
                break
        }
    })
}

// Escuchar el evento 'exit' del proceso hijo
p.on('exit', (_, code) => {
    // Marcar que el proceso ya no está en ejecución
    isRunning = false

    // Mostrar un mensaje de error en la consola con el código de salida
    console.error('⚠️ ERROR ⚠️ >> ', code)

    // Reiniciar el proceso llamando a la función 'start' con el archivo 'main.js'
    start('main.js')

    // Si el código de salida es 0, terminar la función aquí
    if (code === 0) return

    // Vigilar el archivo especificado en 'args[0]'
    watchFile(args[0], () => {
        // Dejar de vigilar el archivo
        unwatchFile(args[0])

        // Reiniciar el proceso llamando nuevamente a 'start' con el archivo original
        start(file)
    })
})

// Importar módulos necesarios
const ramInGB = os.totalmem() / (1024 * 1024 * 1024); // Calcula la memoria total del sistema en GB
const freeRamInGB = os.freemem() / (1024 * 1024 * 1024); // Calcula la memoria RAM libre del sistema en GB
const packageJsonPath = path.join(path.dirname(currentFilePath), './package.json'); // Define la ruta al archivo package.json

try {
    // Intentar leer el archivo package.json
    const packageJsonData = await fsPromises.readFile(packageJsonPath, 'utf-8');
    const packageJsonObj = JSON.parse(packageJsonData); // Convertir los datos JSON en un objeto JavaScript
    const currentTime = new Date().toLocaleString(); // Obtener la hora actual

    let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》';

    // Mostrar información del sistema y del proyecto en la consola
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
┊${chalk.blueBright('┊')}${chalk.cyan(`😺 Autor del Proyecto: ${packageJsonObj.author.name} (@gata_dios)`)}
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

    // Mantener el proceso en ejecución indefinidamente
    setInterval(() => {}, 1000);

} catch (err) {
    // Manejo de errores al leer el archivo package.json
    console.error(chalk.red(`❌ No se pudo leer el archivo package.json: ${err}`));
}

// Importa la librería 'yargs' para el manejo de argumentos de línea de comandos
const yargs = require('yargs');

// Procesa los argumentos de línea de comandos
let opts = yargs(process.argv.slice(2))
  .exitProcess(false) // Evita que 'yargs' termine el proceso automáticamente
  .parse(); // Analiza los argumentos y los convierte en un objeto

// Verifica si la opción 'test' no está presente en los argumentos
if (!opts['test']) {
  // Verifica si no hay listeners (escuchadores) registrados en el objeto 'rl'
  if (!rl.listenerCount()) {
    // Agrega un listener para el evento 'line' del objeto 'rl'
    rl.on('line', line => {
      // Emite el evento 'message' con la línea de entrada, eliminando los espacios en blanco alrededor
      p.emit('message', line.trim());
    });
  }
}

// Llama a la función 'start' con el archivo 'main.js' como argumento
start('main.js');
