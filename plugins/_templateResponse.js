// @type {import('@whiskeysockets/baileys')}

const { proto, generateWAMessage, areJidsSameUser } = (await import('@whiskeysockets/baileys')).default;

/**
 * Maneja los mensajes recibidos y actualiza los mensajes según el tipo de respuesta.
 * @param {Object} m - El mensaje recibido.
 * @param {Object} chatUpdate - La actualización del chat.
 */
export async function all(m, chatUpdate) {
  // Verificar si el mensaje es de Baileys o si no contiene un mensaje
  if (m.isBaileys || !m.message) return;

  // Extraer el ID del mensaje dependiendo del tipo de mensaje
  let id;
  const messageTypes = [
    'buttonsResponseMessage',
    'templateButtonReplyMessage',
    'listResponseMessage',
    'interactiveResponseMessage'
  ];

  for (const type of messageTypes) {
    if (m.message[type]) {
      id = m.message[type].selectedButtonId ||
           m.message[type].selectedId ||
           m.message[type].singleSelectReply?.selectedRowId ||
           JSON.parse(m.message[type].nativeFlowResponseMessage?.paramsJson)?.id;
      break;
    }
  }

  // Obtener el texto del mensaje
  const text = m.message.buttonsResponseMessage?.selectedDisplayText ||
               m.message.templateButtonReplyMessage?.selectedDisplayText ||
               m.message.listResponseMessage?.title ||
               m.message.interactiveResponseMessage?.body?.text;

  let isIdMessage = false;
  let usedPrefix;

  // Validar y buscar el plugin correspondiente
  for (const name in global.plugins) {
    const plugin = global.plugins[name];
    if (!plugin || plugin.disabled) continue;
    if (!opts['restrict'] && plugin.tags && plugin.tags.includes('admin')) continue;
    if (typeof plugin !== 'function' || !plugin.command) continue;

    // Función para escapar caracteres especiales en expresiones regulares
    const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    const _prefix = plugin.customPrefix || this.prefix || global.prefix;
    
    // Encontrar el prefijo y el comando
    const match = (_prefix instanceof RegExp ? [[_prefix.exec(id), _prefix]] :
                   Array.isArray(_prefix) ? _prefix.map((p) => {
                     const re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
                     return [re.exec(id), re];
                   }) :
                   typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(id), new RegExp(str2Regex(_prefix))]] :
                   [[[], new RegExp]]
    ).find((p) => p[1]);

    if ((usedPrefix = (match[0] || '')[0])) {
      const noPrefix = id.replace(usedPrefix, '');
      let [command] = noPrefix.trim().split(' ').filter((v) => v);
      command = (command || '').toLowerCase();

      const isId = plugin.command instanceof RegExp ? plugin.command.test(command) :
                    Array.isArray(plugin.command) ? plugin.command.some((cmd) => cmd instanceof RegExp ? cmd.test(command) : cmd === command) :
                    typeof plugin.command === 'string' ? plugin.command === command : false;

      if (isId) {
        isIdMessage = true;
        break;
      }
    }
  }

  // Generar el mensaje de respuesta y manejar excepciones
  try {
    const messages = await generateWAMessage(m.chat, {
      text: isIdMessage ? id : text,
      mentions: m.mentionedJid || []
    }, {
      userJid: this.user.id,
      quoted: m.quoted?.fakeObj || undefined
    });

    messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.name;

    if (m.isGroup) {
      messages.key.participant = messages.participant = m.sender;
    }

    const msg = {
      ...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(messages)].map((v) => (v.conn = this, v)),
      type: 'append'
    };

    this.ev.emit('messages.upsert', msg);
  } catch (error) {
    console.error('Error in processing message:', error);
  }
}
