import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'   
import fetch from 'node-fetch'
import './plugins/_content.js'
 
/**
 * @type {import('@adiwajshing/baileys')}  
 */
const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
clearTimeout(this)
resolve()
}, ms))

/**
 * Handle messages upsert
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate 
 */
export async function handler(chatUpdate) {
this.msgqueque = this.msgqueque || [];
this.uptime = this.uptime || Date.now();
if (!chatUpdate) {
return
}
if (!chatUpdate || !chatUpdate.messages) {
return
} else {
this.pushMessage(chatUpdate.messages).catch(console.error)
}
let m = chatUpdate.messages[chatUpdate.messages.length - 1]
if (!m) {
return;
}
if (global.db.data == null) await global.loadDatabase()
/*------------------------------------------------*/	     
if (global.chatgpt.data === null) await global.loadChatgptDB()
/*------------------------------------------------*/	
try {
m = smsg(this, m) || m
if (!m)
return
m.exp = 0
m.limit = false
m.money = false
try {
// TODO: use loop to insert data instead of this
let user = global.db.data.users[m.sender]
/*------------------------------------------------*/	            
let chatgptUser = global.chatgpt.data.users[m.sender];
if (typeof chatgptUser !== "object")
global.chatgpt.data.users[m.sender] = [];		
/*------------------------------------------------*/
if (typeof user !== 'object')
global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.exp)) user.exp = 0
if (!('premium' in user)) user.premium = false
if (!('muto' in user)) user.muto = false
if (!isNumber(user.joincount)) user.joincount = 1
if (!isNumber(user.money)) user.money = 150
if (!isNumber(user.limit)) user.limit = 15 	       
if (!('registered' in user)) user.registered = false
if (!('registroR' in user)) user.registroR = false
if (!('registroC' in user)) user.registroC = false  
if (!isNumber(user.IDregister)) user.IDregister = 0 
	
if (!user.registered) {
if (!('name' in user)) user.name = m.name
if (!('age' in user)) user.age = 0
if (!('descripcion' in user)) user.descripcion = 0
if (!('genero' in user)) user.genero = 0
if (!('identidad' in user)) user.identidad = 0
if (!('pasatiempo' in user)) user.pasatiempo = 0
if (!('tiempo' in user)) user.tiempo = 0 
if (!('miestado' in user)) user.miestado = 0
if (!('midLanguage' in user)) user.midLanguage = 0
if (!isNumber(user.premLimit)) user.premLimit = 0
if (!isNumber(user.anggur)) user.anggur = 0
if (!isNumber(user.apel)) user.apel = 0
if (!isNumber(user.bibitanggur)) user.bibitanggur = 0
if (!isNumber(user.bibitapel)) user.bibitapel = 0
if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0
if (!isNumber(user.bibitmangga)) user.bibitmangga = 0
if (!isNumber(user.bibitpisang)) user.bibitpisang = 0
if (!isNumber(user.emas)) user.emas = 0
if (!isNumber(user.jeruk)) user.jeruk = 0
if (!isNumber(user.kayu)) user.kayu = 0
if (!isNumber(user.makanan)) user.makanan = 0
if (!isNumber(user.mangga)) user.mangga = 0
if (!isNumber(user.pisang)) user.pisang = 0
if (!isNumber(user.premiumDate)) user.premiumDate = -1
if (!isNumber(user.regTime)) user.regTime = -1
if (!isNumber(user.semangka)) user.semangka = 0
if (!isNumber(user.stroberi)) user.stroberi = 0
}
	              		    
if (!isNumber(user.afk)) user.afk = -1
//if (!('autolevelup' in user))  user.autolevelup = true
if (!isNumber(user.reporte)) user.reporte = 0
if (!('role' in user)) user.role = '*NOVATO(A)* 🪤'
if (!isNumber(user.agility)) user.agility = 0
if (!isNumber(user.anakanjing)) user.anakanjing = 0
if (!isNumber(user.mesagge)) user.anakanjing = 0
if (!isNumber(user.anakcentaur)) user.anakcentaur = 0
if (!isNumber(user.anakgriffin)) user.anakgriffin = 0
if (!isNumber(user.anakkucing)) user.anakkucing = 0
if (!isNumber(user.anakkuda)) user.anakkuda = 0
if (!isNumber(user.anakkyubi)) user.anakkyubi = 0
if (!isNumber(user.anaknaga)) user.anaknaga = 0
if (!isNumber(user.anakpancingan)) user.anakpancingan = 0
if (!isNumber(user.anakphonix)) user.anakphonix = 0
if (!isNumber(user.anakrubah)) user.anakrubah = 0
if (!isNumber(user.anakserigala)) user.anakserigala = 0
if (!isNumber(user.anggur)) user.anggur = 0
if (!isNumber(user.anjing)) user.anjing = 0
if (!isNumber(user.juegos)) user.juegos = 0
if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0
if (!isNumber(user.antispam)) user.antispam = 0
if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0
if (!isNumber(user.apel)) user.apel = 0
if (!isNumber(user.aqua)) user.aqua = 0
if (!isNumber(user.arc)) user.arc = 0
if (!isNumber(user.arcdurability)) user.arcdurability = 0
if (!isNumber(user.arlok)) user.arlok = 0
if (!isNumber(user.armor)) user.armor = 0
if (!isNumber(user.armordurability)) user.armordurability = 0
if (!isNumber(user.armormonster)) user.armormonster = 0
if (!isNumber(user.as)) user.as = 0
if (!isNumber(user.atm)) user.atm = 0
if (!isNumber(user.axe)) user.axe = 0
if (!isNumber(user.axedurability)) user.axedurability = 0
if (!isNumber(user.ayam)) user.ayam = 0
if (!isNumber(user.ayamb)) user.ayamb = 0
if (!isNumber(user.ayambakar)) user.ayambakar = 0
if (!isNumber(user.ayamg)) user.ayamg = 0
if (!isNumber(user.ayamgoreng)) user.ayamgoreng = 0
if (!isNumber(user.babi)) user.babi = 0
if (!isNumber(user.babihutan)) user.babihutan = 0
if (!isNumber(user.babipanggang)) user.babipanggang = 0
if (!isNumber(user.bandage)) user.bandage = 0
if (!isNumber(user.bank)) user.bank = 0
if (!isNumber(user.banteng)) user.banteng = 0
if (!isNumber(user.batu)) user.batu = 0
if (!isNumber(user.bawal)) user.bawal = 0
if (!isNumber(user.bawalbakar)) user.bawalbakar = 0
if (!isNumber(user.bayam)) user.bayam = 0
if (!isNumber(user.berlian)) user.berlian = 10
if (!isNumber(user.bibitanggur)) user.bibitanggur = 0
if (!isNumber(user.bibitapel)) user.bibitapel = 0
if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0
if (!isNumber(user.bibitmangga)) user.bibitmangga = 0
if (!isNumber(user.bibitpisang)) user.bibitpisang = 0
if (!isNumber(user.botol)) user.botol = 0
if (!isNumber(user.bow)) user.bow = 0
if (!isNumber(user.bowdurability)) user.bowdurability = 0
if (!isNumber(user.boxs)) user.boxs = 0
if (!isNumber(user.brick)) user.brick = 0
if (!isNumber(user.brokoli)) user.brokoli = 0
if (!isNumber(user.buaya)) user.buaya = 0
if (!isNumber(user.buntal)) user.buntal = 0
if (!isNumber(user.cat)) user.cat = 0
if (!isNumber(user.catexp)) user.catexp = 0
if (!isNumber(user.catlastfeed)) user.catlastfeed = 0
if (!isNumber(user.centaur)) user.centaur = 0
if (!isNumber(user.centaurexp)) user.centaurexp = 0
if (!isNumber(user.centaurlastclaim)) user.centaurlastclaim = 0
if (!isNumber(user.centaurlastfeed)) user.centaurlastfeed = 0
if (!isNumber(user.clay)) user.clay = 0
if (!isNumber(user.coal)) user.coal = 0
if (!isNumber(user.coin)) user.coin = 0
if (!isNumber(user.fantasy)) user.fantasy = 0
if (!isNumber(user.common)) user.common = 0
if (!isNumber(user.crystal)) user.crystal = 0
if (!isNumber(user.cumi)) user.cumi = 0
if (!isNumber(user.cupon)) user.cupon = 0
if (!isNumber(user.diamond)) user.diamond = 3
if (!isNumber(user.dog)) user.dog = 0
if (!isNumber(user.dogexp)) user.dogexp = 0
if (!isNumber(user.doglastfeed)) user.doglastfeed = 0
if (!isNumber(user.dory)) user.dory = 0
if (!isNumber(user.dragon)) user.dragon = 0
if (!isNumber(user.dragonexp)) user.dragonexp = 0
if (!isNumber(user.dragonlastfeed)) user.dragonlastfeed = 0
if (!isNumber(user.emas)) user.emas = 0
if (!isNumber(user.emerald)) user.emerald = 0
if (!isNumber(user.enchant)) user.enchant = 0
if (!isNumber(user.esteh)) user.esteh = 0
if (!isNumber(user.exp)) user.exp = 0
if (!isNumber(user.expg)) user.expg = 0
if (!isNumber(user.exphero)) user.exphero = 0
if (!isNumber(user.eleksirb)) user.eleksirb = 0
if (!isNumber(user.emasbatang)) user.emasbatang = 0
if (!isNumber(user.emasbiasa)) user.emasbiasa = 0
if (!isNumber(user.fideos)) user.fideos = 0    
if (!isNumber(user.fishingrod)) user.fishingrod = 0
if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0
if (!isNumber(user.fortress)) user.fortress = 0
if (!isNumber(user.fox)) user.fox = 0
if (!isNumber(user.foxexp)) user.foxexp = 0
if (!isNumber(user.foxlastfeed)) user.foxlastfeed = 0
if (!isNumber(user.fullatm)) user.fullatm = 0
if (!isNumber(user.fantasy)) user.fantasy = []
if (!isNumber(user.fantasy_character)) user.fantasy_character = 0
if (!isNumber(user.fantasy_character2)) user.fantasy_character2 = 0
if (!isNumber(user.fantasy_character3)) user.fantasy_character3 = 0
if (!isNumber(user.fantasy_character4)) user.fantasy_character4 = 0
if (!isNumber(user.fantasy_character5)) user.fantasy_character5 = 0
if (!isNumber(user.gadodado)) user.gadodado = 0
if (!isNumber(user.gajah)) user.gajah = 0
if (!isNumber(user.gamemines)) user.gamemines = false
if (!isNumber(user.ganja)) user.ganja = 0
if (!isNumber(user.gardenboxs)) user.gardenboxs = 0
if (!isNumber(user.gems)) user.gems = 0
if (!isNumber(user.glass)) user.glass = 0
if (!isNumber(user.glimit)) user.glimit = 15
if (!isNumber(user.glory)) user.glory = 0
if (!isNumber(user.gold)) user.gold = 0
if (!isNumber(user.griffin)) user.griffin = 0
if (!isNumber(user.griffinexp)) user.griffinexp = 0
if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0
if (!isNumber(user.griffinlastfeed)) user.griffinlastfeed = 0
if (!isNumber(user.gulai)) user.gulai = 0
if (!isNumber(user.gurita)) user.gurita = 0
if (!isNumber(user.harimau)) user.harimau = 0
if (!isNumber(user.haus)) user.haus = 100
if (!isNumber(user.healt)) user.healt = 100
if (!isNumber(user.health)) user.health = 100
if (!isNumber(user.healthmonster)) user.healthmonster = 0
if (!isNumber(user.healtmonster)) user.healtmonster = 0
if (!isNumber(user.hero)) user.hero = 1
if (!isNumber(user.herolastclaim)) user.herolastclaim = 0
if (!isNumber(user.hiu)) user.hiu = 0
if (!isNumber(user.horse)) user.horse = 0
if (!isNumber(user.horseexp)) user.horseexp = 0
if (!isNumber(user.horselastfeed)) user.horselastfeed = 0
if (!isNumber(user.ikan)) user.ikan = 0
if (!isNumber(user.ikanbakar)) user.ikanbakar = 0
if (!isNumber(user.intelligence)) user.intelligence = 0
if (!isNumber(user.iron)) user.iron = 0
if (!isNumber(user.jagung)) user.jagung = 0
if (!isNumber(user.jagungbakar)) user.jagungbakar = 0
if (!isNumber(user.jeruk)) user.jeruk = 0
if (!isNumber(user.joinlimit)) user.joinlimit = 1
if (!isNumber(user.judilast)) user.judilast = 0
if (!isNumber(user.kaleng)) user.kaleng = 0
if (!isNumber(user.kambing)) user.kambing = 0
if (!isNumber(user.kangkung)) user.kangkung = 0
if (!isNumber(user.kapak)) user.kapak = 0
if (!isNumber(user.kardus)) user.kardus = 0
if (!isNumber(user.katana)) user.katana = 0
if (!isNumber(user.katanadurability)) user.katanadurability = 0
if (!isNumber(user.kayu)) user.kayu = 0
if (!isNumber(user.kentang)) user.kentang = 0
if (!isNumber(user.kentanggoreng)) user.kentanggoreng = 0
if (!isNumber(user.kepiting)) user.kepiting = 0
if (!isNumber(user.kepitingbakar)) user.kepitingbakar = 0
if (!isNumber(user.kerbau)) user.kerbau = 0
if (!isNumber(user.kerjadelapan)) user.kerjadelapan = 0
if (!isNumber(user.kerjadelapanbelas)) user.kerjadelapanbelas = 0
if (!isNumber(user.kerjadua)) user.kerjadua = 0
if (!isNumber(user.kerjaduabelas)) user.kerjaduabelas = 0
if (!isNumber(user.kerjaduadelapan)) user.kerjaduadelapan = 0
if (!isNumber(user.kerjaduadua)) user.kerjaduadua = 0
if (!isNumber(user.kerjaduaempat)) user.kerjaduaempat = 0
if (!isNumber(user.kerjaduaenam)) user.kerjaduaenam = 0
if (!isNumber(user.kerjadualima)) user.kerjadualima = 0
if (!isNumber(user.kerjaduapuluh)) user.kerjaduapuluh = 0
if (!isNumber(user.kerjaduasatu)) user.kerjaduasatu = 0
if (!isNumber(user.kerjaduasembilan)) user.kerjaduasembilan = 0
if (!isNumber(user.kerjaduatiga)) user.kerjaduatiga = 0
if (!isNumber(user.kerjaduatujuh)) user.kerjaduatujuh = 0
if (!isNumber(user.kerjaempat)) user.kerjaempat = 0
if (!isNumber(user.kerjaempatbelas)) user.kerjaempatbelas = 0
if (!isNumber(user.kerjaenam)) user.kerjaenam = 0
if (!isNumber(user.kerjaenambelas)) user.kerjaenambelas = 0
if (!isNumber(user.kerjalima)) user.kerjalima = 0
if (!isNumber(user.kerjalimabelas)) user.kerjalimabelas = 0
if (!isNumber(user.kerjasatu)) user.kerjasatu = 0
if (!isNumber(user.kerjasebelas)) user.kerjasebelas = 0
if (!isNumber(user.kerjasembilan)) user.kerjasembilan = 0
if (!isNumber(user.kerjasembilanbelas)) user.kerjasembilanbelas = 0
if (!isNumber(user.kerjasepuluh)) user.kerjasepuluh = 0
if (!isNumber(user.kerjatiga)) user.kerjatiga = 0
if (!isNumber(user.kerjatigabelas)) user.kerjatigabelas = 0
if (!isNumber(user.kerjatigapuluh)) user.kerjatigapuluh = 0
if (!isNumber(user.kerjatujuh)) user.kerjatujuh = 0
if (!isNumber(user.kerjatujuhbelas)) user.kerjatujuhbelas = 0
if (!isNumber(user.korbanngocok)) user.korbanngocok = 0
if (!isNumber(user.kubis)) user.kubis = 0
if (!isNumber(user.kucing)) user.kucing = 0
if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0
if (!isNumber(user.kuda)) user.kuda = 0
if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0
if (!isNumber(user.kyubi)) user.kyubi = 0
if (!isNumber(user.kyubiexp)) user.kyubiexp = 0
if (!isNumber(user.kyubilastclaim)) user.kyubilastclaim = 0
if (!isNumber(user.kyubilastfeed)) user.kyubilastfeed = 0
if (!isNumber(user.labu)) user.labu = 0
if (!isNumber(user.laper)) user.laper = 100
if (!isNumber(user.lastadventure)) user.lastadventure = 0
if (!isNumber(user.lastbansos)) user.lastbansos = 0
if (!isNumber(user.lastberbru)) user.lastberbru = 0
if (!isNumber(user.lastberkebon)) user.lastberkebon = 0
if (!isNumber(user.lastbunga)) user.lastbunga = 0
if (!isNumber(user.lastbunuhi)) user.lastbunuhi = 0
if (!isNumber(user.lastcoins)) user.lastcoins = 0    
if (!isNumber(user.lastclaim)) user.lastclaim = 0
if (!isNumber(user.lastcode)) user.lastcode = 0
if (!isNumber(user.lastcofre)) user.lastcofre = 0
if (!isNumber(user.lastcodereg)) user.lastcodereg = 0
if (!isNumber(user.lastcrusade)) user.lastcrusade = 0
if (!isNumber(user.lastdagang)) user.lastdagang = 0
if (!isNumber(user.lastdiamantes)) user.lastdiamantes = 0    
if (!isNumber(user.lastduel)) user.lastduel = 0
if (!isNumber(user.lastdungeon)) user.lastdungeon = 0
if (!isNumber(user.lasteasy)) user.lasteasy = 0
if (!isNumber(user.lastfight)) user.lastfight = 0
if (!isNumber(user.lastfishing)) user.lastfishing = 0
if (!isNumber(user.lastgift)) user.lastgift = 0
if (!isNumber(user.crime)) user.crime = 0
if (!isNumber(user.lastgojek)) user.lastgojek = 0
if (!isNumber(user.lastgrab)) user.lastgrab = 0
if (!isNumber(user.lasthourly)) user.lasthourly = 0
if (!isNumber(user.halloween)) user.halloween = 0
if (!isNumber(user.lasthunt)) user.lasthunt = 0
if (!isNumber(user.lastIstigfar)) user.lastIstigfar = 0
if (!isNumber(user.lastjb)) user.lastjb = 0
if (!isNumber(user.lastkill)) user.lastkill = 0
if (!isNumber(user.lastlink)) user.lastlink = 0
if (!isNumber(user.lastlumber)) user.lastlumber = 0
if (!isNumber(user.lastmancingeasy)) user.lastmancingeasy = 0
if (!isNumber(user.lastmancingextreme)) user.lastmancingextreme = 0
if (!isNumber(user.lastmancinghard)) user.lastmancinghard = 0
if (!isNumber(user.lastmancingnormal)) user.lastmancingnormal = 0
if (!isNumber(user.lastmining)) user.lastmining = 0
if (!isNumber(user.lastmisi)) user.lastmisi = 0
if (!isNumber(user.lastmonthly)) user.lastmonthly = 0
if (!isNumber(user.lastmulung)) user.lastmulung = 0
if (!isNumber(user.lastnambang)) user.lastnambang = 0
if (!isNumber(user.lastnebang)) user.lastnebang = 0
if (!isNumber(user.lastngocok)) user.lastngocok = 0
if (!isNumber(user.lastngojek)) user.lastngojek = 0
if (!isNumber(user.lastopen)) user.lastopen = 0
if (!isNumber(user.lastpekerjaan)) user.lastpekerjaan = 0
if (!isNumber(user.lastpago)) user.lastpago = 0 
if (!isNumber(user.lastpotionclaim)) user.lastpotionclaim = 0
if (!isNumber(user.lastrampok)) user.lastrampok = 0
if (!isNumber(user.lastramuanclaim)) user.lastramuanclaim = 0
if (!isNumber(user.lastrob)) user.lastrob = 0
if (!isNumber(user.lastroket)) user.lastroket = 0
if (!isNumber(user.lastsda)) user.lastsda = 0
if (!isNumber(user.lastseen)) user.lastseen = 0
if (!isNumber(user.lastSetStatus)) user.lastSetStatus = 0
if (!isNumber(user.lastsironclaim)) user.lastsironclaim = 0
if (!isNumber(user.lastsmancingclaim)) user.lastsmancingclaim = 0
if (!isNumber(user.laststringclaim)) user.laststringclaim = 0
if (!isNumber(user.lastswordclaim)) user.lastswordclaim = 0
if (!isNumber(user.lastturu)) user.lastturu = 0
if (!isNumber(user.lastwar)) user.lastwar = 0
if (!isNumber(user.lastwarpet)) user.lastwarpet = 0
if (!isNumber(user.lastweaponclaim)) user.lastweaponclaim = 0
if (!isNumber(user.lastweekly)) user.lastweekly = 0
if (!isNumber(user.lastwork)) user.lastwork = 0
if (!isNumber(user.legendary)) user.legendary = 0
if (!isNumber(user.lele)) user.lele = 0
if (!isNumber(user.leleb)) user.leleb = 0
if (!isNumber(user.lelebakar)) user.lelebakar = 0
if (!isNumber(user.leleg)) user.leleg = 0
if (!isNumber(user.level)) user.level = 0
if (!isNumber(user.limit)) user.limit = 15
if (!isNumber(user.limitjoinfree)) user.limitjoinfree = 1
if (!isNumber(user.lion)) user.lion = 0
if (!isNumber(user.lionexp)) user.lionexp = 0
if (!isNumber(user.lionlastfeed)) user.lionlastfeed = 0
if (!isNumber(user.lobster)) user.lobster = 0
if (!isNumber(user.lumba)) user.lumba = 0
if (!isNumber(user.magicwand)) user.magicwand = 0
if (!isNumber(user.magicwanddurability)) user.magicwanddurability = 0
if (!isNumber(user.makanancentaur)) user.makanancentaur = 0
if (!isNumber(user.makanangriffin)) user.makanangriffin = 0
if (!isNumber(user.makanankyubi)) user.makanankyubi = 0
if (!isNumber(user.makanannaga)) user.makanannaga = 0
if (!isNumber(user.makananpet)) user.makananpet = 0
if (!isNumber(user.makananphonix)) user.makananphonix = 0
if (!isNumber(user.spam)) user.spam = 0
if (!isNumber(user.makananserigala)) user.makananserigala = 0
if (!isNumber(user.mana)) user.mana = 0
if (!isNumber(user.mangga)) user.mangga = 0
if (!isNumber(user.money)) user.money = 150
if (!isNumber(user.monyet)) user.monyet = 0
if (!isNumber(user.mythic)) user.mythic = 0
if (!isNumber(user.naga)) user.naga = 0
if (!isNumber(user.nagalastclaim)) user.nagalastclaim = 0
if (!isNumber(user.net)) user.net = 0
if (!isNumber(user.nila)) user.nila = 0
if (!isNumber(user.nilabakar)) user.nilabakar = 0
if (!isNumber(user.note)) user.note = 0
if (!isNumber(user.ojekk)) user.ojekk = 0
if (!isNumber(user.oporayam)) user.oporayam = 0
if (!isNumber(user.orca)) user.orca = 0
if (!isNumber(user.pancing)) user.pancing = 0
if (!isNumber(user.pasangan)) user.pasangan = 0	
if (!isNumber(user.pancingan)) user.pancingan = 1
if (!isNumber(user.panda)) user.panda = 0
if (!isNumber(user.paus)) user.paus = 0
if (!isNumber(user.pausbakar)) user.pausbakar = 0
if (!isNumber(user.pc)) user.pc = 0
if (!isNumber(user.pepesikan)) user.pepesikan = 0
if (!isNumber(user.pertambangan)) user.pertambangan = 0
if (!isNumber(user.pertanian)) user.pertanian = 0
if (!isNumber(user.pet)) user.pet = 0
if (!isNumber(user.petFood)) user.petFood = 0
if (!isNumber(user.phonix)) user.phonix = 0
if (!isNumber(user.phonixexp)) user.phonixexp = 0
if (!isNumber(user.phonixlastclaim)) user.phonixlastclaim = 0
if (!isNumber(user.phonixlastfeed)) user.phonixlastfeed = 0
if (!isNumber(user.pickaxe)) user.pickaxe = 0
if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
if (!isNumber(user.pillhero)) user.pillhero= 0
if (!isNumber(user.pisang)) user.pisang = 0
if (!isNumber(user.pointxp)) user.pointxp = 0
if (!isNumber(user.potion)) user.potion = 0
if (!isNumber(user.psenjata)) user.psenjata = 0
if (!isNumber(user.psepick)) user.psepick = 0
if (!isNumber(user.ramuan)) user.ramuan = 0
if (!isNumber(user.ramuancentaurlast)) user.ramuancentaurlast = 0
if (!isNumber(user.ramuangriffinlast)) user.ramuangriffinlast = 0
if (!isNumber(user.ramuanherolast)) user.ramuanherolast = 0
if (!isNumber(user.ramuankucinglast)) user.ramuankucinglast = 0
if (!isNumber(user.ramuankudalast)) user.ramuankudalast = 0
if (!isNumber(user.ramuankyubilast)) user.ramuankyubilast = 0
if (!isNumber(user.ramuannagalast)) user.ramuannagalast = 0
if (!isNumber(user.ramuanphonixlast)) user.ramuanphonixlast = 0
if (!isNumber(user.ramuanrubahlast)) user.ramuanrubahlast = 0
if (!isNumber(user.ramuanserigalalast)) user.ramuanserigalalast = 0
if (!isNumber(user.reglast)) user.reglast = 0
if (!isNumber(user.rendang)) user.rendang = 0
if (!isNumber(user.rhinoceros)) user.rhinoceros = 0
if (!isNumber(user.rhinocerosexp)) user.rhinocerosexp = 0
if (!isNumber(user.rhinoceroslastfeed)) user.rhinoceroslastfeed = 0
if (!isNumber(user.robo)) user.robo = 0
if (!isNumber(user.roboxp)) user.roboxp = 0
if (!isNumber(user.rock)) user.rock = 0
if (!isNumber(user.roket)) user.roket = 0
if (!isNumber(user.roti)) user.roti = 0
if (!isNumber(user.rubah)) user.rubah = 0
if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0
if (!isNumber(user.rumahsakit)) user.rumahsakit = 0
if (!isNumber(user.sampah)) user.sampah = 0
if (!isNumber(user.sand)) user.sand = 0
if (!isNumber(user.sapi)) user.sapi = 0
if (!isNumber(user.sapir)) user.sapir = 0
if (!isNumber(user.seedbayam)) user.seedbayam = 0
if (!isNumber(user.seedbrokoli)) user.seedbrokoli = 0
if (!isNumber(user.seedjagung)) user.seedjagung = 0
if (!isNumber(user.seedkangkung)) user.seedkangkung = 0
if (!isNumber(user.seedkentang)) user.seedkentang = 0
if (!isNumber(user.seedkubis)) user.seedkubis = 0
if (!isNumber(user.seedlabu)) user.seedlabu = 0
if (!isNumber(user.seedtomat)) user.seedtomat = 0
if (!isNumber(user.seedwortel)) user.seedwortel = 0
if (!isNumber(user.serigala)) user.serigala = 0
if (!isNumber(user.serigalalastclaim)) user.serigalalastclaim = 0
if (!isNumber(user.shield)) user.shield = false
if (!isNumber(user.skillexp)) user.skillexp = 0
if (!isNumber(user.snlast)) user.snlast = 0
if (!isNumber(user.soda)) user.soda = 0
if (!isNumber(user.sop)) user.sop = 0
if (!isNumber(user.spammer)) user.spammer = 0
if (!isNumber(user.spinlast)) user.spinlast = 0
if (!isNumber(user.ssapi)) user.ssapi = 0
if (!isNumber(user.stamina)) user.stamina = 100
if (!isNumber(user.steak)) user.steak = 0
if (!isNumber(user.stick)) user.stick = 0
if (!isNumber(user.strength)) user.strength = 0
if (!isNumber(user.string)) user.string = 0
if (!isNumber(user.superior)) user.superior = 0
if (!isNumber(user.suplabu)) user.suplabu = 0
if (!isNumber(user.sushi)) user.sushi = 0
if (!isNumber(user.sword)) user.sword = 0
if (!isNumber(user.sworddurability)) user.sworddurability = 0
if (!isNumber(user.tigame)) user.tigame = 50
if (!isNumber(user.tiketcoin)) user.tiketcoin = 0
if (!isNumber(user.title)) user.title = 0
if (!isNumber(user.tomat)) user.tomat = 0
if (!isNumber(user.tprem)) user.tprem = 0
if (!isNumber(user.trash)) user.trash = 0
if (!isNumber(user.trofi)) user.trofi = 0
if (!isNumber(user.troopcamp)) user.troopcamp = 0
if (!isNumber(user.tumiskangkung)) user.tumiskangkung = 0
if (!isNumber(user.udang)) user.udang = 0
if (!isNumber(user.udangbakar)) user.udangbakar = 0
if (!isNumber(user.umpan)) user.umpan = 0
if (!isNumber(user.uncoommon)) user.uncoommon = 0
if (!isNumber(user.unreglast)) user.unreglast = 0
if (!isNumber(user.upgrader)) user.upgrader = 0
if (!isNumber(user.vodka)) user.vodka = 0
if (!isNumber(user.wallet)) user.wallet = 0
if (!isNumber(user.warn)) user.warn = 0
if (!isNumber(user.weapon)) user.weapon = 0
if (!isNumber(user.weapondurability)) user.weapondurability = 0
if (!isNumber(user.wolf)) user.wolf = 0
if (!isNumber(user.wolfexp)) user.wolfexp = 0
if (!isNumber(user.wolflastfeed)) user.wolflastfeed = 0
if (!isNumber(user.wood)) user.wood = 0
if (!isNumber(user.wortel)) user.wortel = 0
if (!user.lbars) user.lbars = '[▒▒▒▒▒▒▒▒▒]'
if (!user.job) user.job = 'Desempleo'
if (!user.premium) user.premium = false
if (!user.premium) user.premiumTime = 0
if (!user.rtrofi) user.rtrofi = 'Bronce'
} else
global.db.data.users[m.sender] = {
midLanguage: 0,
afk: -1,
afkReason: '',
reporte: 0,
name: m.name,
age: 0,
genero: 0,
identidad: 0,
pasatiempo: 0,
tiempo: 0,
miestado: 0,	
descripcion: 0,
premLimit: 0,
agility: 16,
juegos: 0,
messageSpam: 0,
anakanjing: 0,
anakcentaur: 0,
anakgriffin: 0,
anakkucing: 0,
anakkuda: 0,
anakkyubi: 0,
anaknaga: 0,
anakpancingan: 0,
anakphonix: 0,
anakrubah: 0,
anakserigala: 0,
anggur: 0,
anjing: 0,
anjinglastclaim: 0,
antispam: 0,
antispamlastclaim: 0,
apel: 0,
aqua: 0,
arc: 0,
arcdurability: 0,
arlok: 0,
armor: 0,
armordurability: 0,
armormonster: 0,
as: 0,
atm: 0,
//autolevelup: true,
axe: 0,
axedurability: 0,
ayam: 0,
ayamb: 0,
ayambakar: 0,
ayamg: 0,
ayamgoreng: 0,
babi: 0,
babihutan: 0,
babipanggang: 0,
bandage: 0,
bank: 0,
banned: false,
BannedReason: '',
Banneduser: false,
banteng: 0,
batu: 0,
bawal: 0,
bawalbakar: 0,
bayam: 0,
berlian: 10,
bibitanggur: 0,
bibitapel: 0,
bibitjeruk: 0,
bibitmangga: 0,
bibitpisang: 0,
botol: 0,
bow: 0,
bowdurability: 0,
boxs: 0,
brick: 0,
brokoli: 0,
buaya: 0,
buntal: 0,
cat: 0,
catlastfeed: 0,
catngexp: 0,
centaur: 0,
centaurexp: 0,
centaurlastclaim: 0,
centaurlastfeed: 0,
clay: 0,
coal: 0,
coin: 0,
common: 0,
crystal: 0,
cumi: 0,
cupon: 0,
diamond: 3,
dog: 0,
dogexp: 0,
doglastfeed: 0,
dory: 0,
dragon: 0,
dragonexp: 0,
dragonlastfeed: 0,
emas: 0,
emerald: 0,
esteh: 0,
exp: 0,
expg: 0,
exphero: 0,
expired: 0,
eleksirb: 0,
emasbatang: 0,
emasbiasa: 0,
fideos: 0,
fishingrod: 0,
fishingroddurability: 0,
fortress: 0,
fox: 0,
foxexp: 0,
foxlastfeed: 0,
fullatm: 0,
fantasy: [],
fantasy_character: 0,
fantasy_character2: 0,
fantasy_character3: 0,
fantasy_character4: 0,
fantasy_character5: 0,
gadodado: 0,
gajah: 0,
gamemines: false,
ganja: 0,
gardenboxs: 0,
gems: 0,
glass: 0,
gold: 0,
griffin: 0,
griffinexp: 0,
griffinlastclaim: 0,
griffinlastfeed: 0,
gulai: 0,
gurita: 0,
halloween: 0,
harimau: 0,
haus: 100,
healt: 100,
health: 100,
healtmonster: 100,
hero: 1,
herolastclaim: 0,
hiu: 0,
horse: 0,
horseexp: 0,
horselastfeed: 0,
ikan: 0,
ikanbakar: 0,
intelligence: 10,
iron: 0,
jagung: 0,
jagungbakar: 0,
jeruk: 0,
job: 'Pengangguran',
joincount: 1,
joinlimit: 1,
judilast: 0,
kaleng: 0,
kambing: 0,
kangkung: 0,
kapak: 0,
kardus: 0,
katana: 0,
katanadurability: 0,
kayu: 0,
kentang: 0,
kentanggoreng: 0,
kepiting: 0,
kepitingbakar: 0,
kerbau: 0,
kerjadelapan: 0,
kerjadelapanbelas: 0,
kerjadua: 0,
kerjaduabelas: 0,
kerjaduadelapan: 0,
kerjaduadua: 0,
kerjaduaempat: 0,
kerjaduaenam: 0,
kerjadualima: 0,
kerjaduapuluh: 0,
kerjaduasatu: 0,
kerjaduasembilan: 0,
kerjaduatiga: 0,
kerjaduatujuh: 0,
kerjaempat: 0,
kerjaempatbelas: 0,
kerjaenam: 0,
kerjaenambelas: 0,
kerjalima: 0,
kerjalimabelas: 0,
kerjasatu: 0,
kerjasebelas: 0,
kerjasembilan: 0,
kerjasembilanbelas: 0,
kerjasepuluh: 0,
kerjatiga: 0,
kerjatigabelas: 0,
kerjatigapuluh: 0,
kerjatujuh: 0,
kerjatujuhbelas: 0,
korbanngocok: 0,
kubis: 0,
kucing: 0,
kucinglastclaim: 0,
kuda: 0,
kudalastclaim: 0,
kumba: 0,
kyubi: 0,
kyubilastclaim: 0,
labu: 0,
laper: 100,
lastadventure: 0,
lastberbru: 0,
lastberkebon: 0,
lastbunga: 0,
lastbunuhi: 0,
lastcoins: 0,
lastclaim: 0,
lastcode: 0,
lastcofre: 0,
lastcrusade: 0,
lastdaang: 0,
lastdagang: 0,
lastdiamantes: 0,
lastduel: 0,
lastdungeon: 0,
lasteasy: 0,
lastfight: 0,
lastfishing: 0,
lastgojek: 0,
lastgrab: 0,
lasthourly: 0,
lasthunt: 0,
lastjb: 0,
lastkill: 0,
lastlink: 0,
lastlumber: 0,
lastmancingeasy: 0,
lastmancingextreme: 0,
lastmancinghard: 0,
lastmancingnormal: 0,
lastmining: 0,
lastmisi: 0,
lastmonthly: 0,
lastmulung: 0,
lastnambang: 0,
lastnebang: 0,
lastngocok: 0,
lastngojek: 0,
lastopen: 0,
lastpekerjaan: 0,
lastpago: 0,
lastpotionclaim: 0,
lastramuanclaim: 0,
lastrob: 0,
lastroket: 0,
lastseen: 0,
lastSetStatus: 0,
lastsironclaim: 0,
lastsmancingclaim: 0,
laststringclaim: 0,
lastswordclaim: 0,
lastturu: 0,
lastwarpet: 0,
lastweaponclaim: 0,
lastweekly: 0,
lastwork: 0,
lbars: '[▒▒▒▒▒▒▒▒▒]',
legendary: 0,
lele: 0,
leleb: 0,
lelebakar: 0,
leleg: 0,
level: 0,
limit: 15,
limitjoinfree: 1,
lion: 0,
lionexp: 0,
lionlastfeed: 0,
lobster: 0,
lumba: 0,
magicwand: 0,
magicwanddurability: 0,
makanan: 0,
makanancentaur: 0,
makanangriffin: 0,
makanankyubi: 0,
makanannaga: 0,
makananpet: 0,
makananphonix: 0,
makananserigala: 0,
mana: 0,
mangga: 0,
misi: '',
money: 100,
monyet: 0,
mythic: 0,
naga: 0,
nagalastclaim: 0,
net: 0,
nila: 0,
nilabakar: 0,
note: 0,
ojekk: 0,
oporayam: 0,
orca: 0,
pancingan: 1,
panda: 0,
pasangan: '',
paus: 0,
pausbakar: 0,
pc: 0,
pepesikan: 0,
pet: 0,
phonix: 0,
phonixexp: 0,
phonixlastclaim: 0,
phonixlastfeed: 0,
pickaxe: 0,
pickaxedurability: 0,
pillhero: 0,
pisang: 0,
pointxp: 0,
potion: 10,
muto: false,
premium: false,
premiumTime: 0,
ramuan: 0,
ramuancentaurlast: 0,
ramuangriffinlast: 0,
ramuanherolast: 0,
ramuankucinglast: 0,
ramuankudalast: 0,
ramuankyubilast: 0,
ramuannagalast: 0,
ramuanphonixlast: 0,
ramuanrubahlast: 0,
ramuanserigalalast: 0,
registered: false,
registroR: false,
registroC: false,
reglast: 0,
regTime: -1,
rendang: 0,
rhinoceros: 0,
rhinocerosexp: 0,
rhinoceroslastfeed: 0,
rock: 0,
roket: 0,
role: 'Novato',
roti: 0,
rtrofi: 'bronce',
rubah: 0,
rubahlastclaim: 0,
rumahsakit: 0,
sampah: 0,
sand: 0,
sapi: 0,
sapir: 0,
seedbayam: 0,
seedbrokoli: 0,
seedjagung: 0,
seedkangkung: 0,
seedkentang: 0,
seedkubis: 0,
seedlabu: 0,
seedtomat: 0,
seedwortel: 0,
semangka: 0,
serigala: 0,
serigalalastclaim: 0,
sewa: false,
shield: 0,
skill: '',
skillexp: 0,
snlast: 0,
soda: 0,
sop: 0,
spammer: 0,
spinlast: 0,
ssapi: 0,
stamina: 100,
steak: 0,
stick: 0,
strength: 30,
string: 0,
stroberi: 0,
superior: 0,
suplabu: 0,
sushi: 0,
sword: 0,
sworddurability: 0,
tigame: 50,
tiketcoin: 0,
title: '',
tomat: 0,
tprem: 0,
trash: 0,
trofi: 0,
troopcamp: 0,
tumiskangkung: 0,
udang: 0,
udangbakar: 0,
umpan: 0,
uncoommon: 0,
unreglast: 0,
upgrader: 0,
vodka: 0,
wallet: 0,
warn: 0,
weapon: 0,
weapondurability: 0,
wolf: 0,
wolfexp: 0,
wolflastfeed: 0,
wood: 0,
wortel: 0,	
}
let akinator = global.db.data.users[m.sender].akinator
if (typeof akinator !== 'object')
global.db.data.users[m.sender].akinator = {}
if (akinator) {
if (!('sesi' in akinator)) akinator.sesi = false
if (!('server' in akinator)) akinator.server = null
if (!('frontaddr' in akinator)) akinator.frontaddr = null
if (!('session' in akinator)) akinator.session = null
if (!('signature' in akinator)) akinator.signature = null
if (!('question' in akinator)) akinator.question = null
if (!('progression' in akinator)) akinator.progression = null
if (!('step' in akinator)) akinator.step = null
if (!('soal' in akinator)) akinator.soal = null
} else
global.db.data.users[m.sender].akinator = {
sesi: false,
server: null,
frontaddr: null,
session: null,
signature: null,
question: null,
progression: null,
step: null, 
soal: null
}   		
let chat = global.db.data.chats[m.chat]
if (typeof chat !== 'object')
global.db.data.chats[m.chat] = {}
		
if (chat) {
if (!('isBanned' in chat)) chat.isBanned = false         
if (!('welcome' in chat)) chat.welcome = true           
if (!('detect' in chat)) chat.detect = false               
if (!('sWelcome' in chat)) chat.sWelcome = ''          
if (!('sBye' in chat)) chat.sBye = ''                    
if (!('sPromote' in chat)) chat.sPromote = ''             
if (!('sDemote' in chat)) chat.sDemote = '' 
if (!('sCondition' in chat)) chat.sCondition = JSON.stringify([{ grupo: { usuario: [], condicion: [], admin: '' }, prefijos: []}])
if (!('delete' in chat)) chat.delete = false                   
if (!('modohorny' in chat)) chat.modohorny = false       
if (!('stickers' in chat)) chat.stickers = false            
if (!('autosticker' in chat)) chat.autosticker = false      
if (!('audios' in chat)) chat.audios = false               
if (!('antiver' in chat)) chat.antiver = true 
if (!('antiPorn' in chat)) chat.antiPorn = false     
if (!('antiLink' in chat)) chat.antiLink = false     
if (!('antiLink2' in chat)) chat.antiLink2 = false
if (!('antiTiktok' in chat)) chat.antiTiktok = false
if (!('antiYoutube' in chat)) chat.antiYoutube = false
if (!('antiTelegram' in chat)) chat.antiTelegram = false
if (!('antiFacebook' in chat)) chat.antiFacebook = false
if (!('antiInstagram' in chat)) chat.antiInstagram = false
if (!('antiTwitter' in chat)) chat.antiTwitter = false
if (!('antiDiscord' in chat)) chat.antiDiscord = false
if (!('antiThreads' in chat)) chat.antiThreads = false
if (!('antiTwitch' in chat)) chat.antiTwitch = false
if (!('antifake' in chat)) chat.antifake = false
if (!('reaction' in chat)) chat.reaction = true    
if (!('viewonce' in chat)) chat.viewonce = true       
if (!('modoadmin' in chat)) chat.modoadmin = true    
if (!('antitoxic' in chat)) chat.antitoxic = false
if (!('game' in chat)) chat.game = true
if (!('game2' in chat)) chat.game2 = true
if (!('simi' in chat)) chat.simi = false
if (!('antiTraba' in chat)) chat.antiTraba = true
if (!('autolevelup' in chat))  chat.autolevelup = false
if (!isNumber(chat.expired)) chat.expired = 0
} else
global.db.data.chats[m.chat] = {
isBanned: false,
welcome: true,
detect: true,
sWelcome: '',
sBye: '',
sPromote: '',
sDemote: '', 
sCondition: JSON.stringify([{ grupo: { usuario: [], condicion: [], admin: '' }, prefijos: []}]), 
delete: false,
modohorny: false,
stickers: false,
autosticker: false,
audios: false,
antiver: true,
antiPorn: false,
antiLink: false,
antiLink2: false,
antiTiktok: false,
antiYoutube: false,
antiTelegram: false,
antiFacebook: false,
antiInstagram: false,
antiTwitter: false,
antiDiscord: false,
antiThreads: false,
antiTwitch: false,
antifake: false,
reaction: true,
viewonce: true,
modoadmin: true,
antitoxic: false,
game: true, 
game2: true, 
simi: false,
antiTraba: true,
autolevelup: false,
expired: 0,
}
let settings = global.db.data.settings[this.user.jid]
if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
if (settings) {
if (!('self' in settings)) settings.self = false
if (!('autoread' in settings)) settings.autoread = false
if (!('autoread2' in settings)) settings.autoread2 = false
if (!('restrict' in settings)) settings.restrict = true
if (!('temporal' in settings)) settings.temporal = false
if (!('antiPrivate' in settings)) settings.antiPrivate = true
if (!('antiCall' in settings)) settings.antiCall = true
if (!('antiSpam' in settings)) settings.antiSpam = true 
if (!('modoia' in settings)) settings.modoia = false
if (!('jadibotmd' in settings)) settings.jadibotmd = true 
} else global.db.data.settings[this.user.jid] = {
self: false,
autoread: false,
autoread2: false,
restrict: true,
temporal: false,
antiPrivate: true,
antiCall: true,
antiSpam: true,
modoia: false, 
jadibotmd: true,
}} catch (e) {
console.error(e)
}

// Verifica si el remitente del mensaje es el propietario del bot
const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)]
    .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
    .includes(m.sender);

// Verifica si el remitente es el propietario real o si el mensaje proviene del propio bot
const isOwner = isROwner || m.fromMe;

// Verifica si el remitente es un moderador (mods) o el propietario
const isMods = isOwner || global.mods
    .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
    .includes(m.sender);

// Verifica si el remitente es un usuario premium o el propietario
// Nota: El código comentado anteriormente verificaba la lista de prems (usuarios premium) de forma diferente
//const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);

// Nueva verificación de usuarios premium usando el tiempo premium almacenado en la base de datos
const isPrems = isROwner || global.db.data.users[m.sender].premiumTime > 0;

// Si la opción 'queque' está habilitada y el mensaje tiene texto, pero el remitente no es ni moderador ni premium
if (opts['queque'] && m.text && !(isMods || isPrems)) {
    
    // Obtiene la cola de mensajes y establece un tiempo de espera de 5 segundos
    let queque = this.msgqueque, time = 1000 * 5;
    
    // Obtiene el ID del mensaje previo en la cola
    const previousID = queque[queque.length - 1];
    
    // Añade el ID del mensaje actual a la cola
    queque.push(m.id || m.key.id);
    
    // Inicia un intervalo para revisar la cola cada 5 segundos
    setInterval(async function () {
        // Si el mensaje previo ha sido procesado, se detiene el intervalo
        if (queque.indexOf(previousID) === -1) clearInterval(this);
        
        // Introduce un retraso en la ejecución
        await delay(time);
    }, time);
}

// Si la opción 'nyimak' está activada en 'opts', se detiene la ejecución del código.
if (opts['nyimak']) return

// Si el usuario no es el propietario del bot y la opción 'self' está activada, se detiene la ejecución del código.
if (!isROwner && opts['self']) return 

// Si la opción 'pconly' está activada y el chat es un grupo (termina con 'g.us'), se detiene la ejecución del código.
if (opts['pconly'] && m.chat.endsWith('g.us')) return

// Si la opción 'gconly' está activada y el chat no es un grupo (no termina con 'g.us'), se detiene la ejecución del código.
if (opts['gconly'] && !m.chat.endsWith('g.us')) return

// Si la opción 'swonly' está activada y el chat no es una transmisión de estado, se detiene la ejecución del código.
if (opts['swonly'] && m.chat !== 'status@broadcast') return

// Si el texto del mensaje no es una cadena de caracteres, se inicializa como una cadena vacía.
if (typeof m.text !== 'string')
m.text = ''

// Si el mensaje es de Baileys, detiene la ejecución del código.
// Esto puede ser útil para evitar procesar mensajes que provienen de bots o mensajes internos del sistema.
if (m.isBaileys) return

// Incrementa el valor de 'm.exp' con un número aleatorio entre 1 y 10.
// Esto podría usarse para dar una pequeña cantidad de experiencia a los usuarios en función de alguna acción.
m.exp += Math.ceil(Math.random() * 10)

// Declara una variable 'usedPrefix' sin inicializar.
// Esta variable puede ser utilizada más adelante en el código para almacenar algún prefijo de comando o similar.
let usedPrefix

// Obtiene el objeto de datos del usuario desde la base de datos global, si existe.
// La variable '_user' contendrá los datos del usuario que envió el mensaje, o 'undefined' si no hay datos disponibles.
// 'm.sender' representa el identificador del usuario que envió el mensaje.
let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

// Obtiene los metadatos del grupo si el mensaje es de un grupo.
// Primero verifica si los metadatos están disponibles en 'conn.chats'.
// Si no están disponibles, intenta obtenerlos mediante 'this.groupMetadata(m.chat)' y captura cualquier error.
const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}

// Obtiene la lista de participantes del grupo si el mensaje es de un grupo.
// Si no es un grupo, se establece como una lista vacía.
const participants = (m.isGroup ? groupMetadata.participants : []) || []

// Encuentra el objeto del usuario que envió el mensaje en la lista de participantes del grupo, si el mensaje es de un grupo.
// 'conn.decodeJid(u.id)' decodifica el ID del usuario y lo compara con el ID del remitente del mensaje.
// Si no es un grupo, se establece como un objeto vacío.
const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // Datos del Usuario

// Encuentra el objeto del bot en la lista de participantes del grupo, si el mensaje es de un grupo.
// 'conn.decodeJid(u.id)' decodifica el ID del usuario y lo compara con el ID del bot.
// Si no es un grupo, se establece como un objeto vacío.
const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {}

// Determina si el usuario que envió el mensaje es un superadministrador.
// Verifica si 'user.admin' es igual a 'superadmin', y si no, se establece como 'false'.
const isRAdmin = user?.admin == 'superadmin' || false

// Determina si el usuario que envió el mensaje es un administrador.
// Verifica si el usuario es un superadministrador o si 'user.admin' es igual a 'admin'.
// Si ninguna de las condiciones es verdadera, se establece como 'false'.
const isAdmin = isRAdmin || user?.admin == 'admin' || false // ¿El usuario es administrador?

// Determina si el bot es un administrador en el grupo.
// Verifica si 'bot.admin' existe y si es verdadero. Si no, se establece como 'false'.
const isBotAdmin = bot?.admin || false // Detecta si el bot es administrador

// Obtiene la ruta del directorio 'plugins' a partir del archivo actual.
// 'fileURLToPath(import.meta.url)' convierte la URL del módulo en una ruta de archivo.
// 'path.dirname' obtiene el directorio del archivo actual.
// 'path.join' une el directorio con el subdirectorio 'plugins'.
const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')

// Itera sobre todos los plugins en 'global.plugins'.
for (let name in global.plugins) {
    let plugin = global.plugins[name]
    
    // Si el plugin no existe, continúa con el siguiente en la lista.
    if (!plugin)
        continue
    
    // Si el plugin está deshabilitado, continúa con el siguiente en la lista.
    if (plugin.disabled)
        continue
    
    // Obtiene la ruta completa del archivo del plugin.
    const __filename = join(___dirname, name)
    
    // Si el plugin tiene una función 'all', intenta ejecutarla.
    if (typeof plugin.all === 'function') {
        try {
            // Llama a la función 'all' del plugin con el contexto adecuado y los parámetros necesarios.
            await plugin.all.call(this, m, {
                chatUpdate,
                __dirname: ___dirname,
                __filename
            })
        } catch (e) {
            // Captura y muestra cualquier error que ocurra durante la ejecución de la función 'all'.
            console.error(e)
            
            // Notifica a los propietarios del bot si ocurre un error.
            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                let data = (await conn.onWhatsApp(jid))[0] || {}
                
                // Si el número de WhatsApp existe, envía un mensaje con detalles del error.
                if (data.exists)
                    m.reply(`${lenguajeGB['smsCont1']()}\n\n${lenguajeGB['smsCont2']()}\n*_${name}_*\n\n${lenguajeGB['smsCont3']()}\n*_${m.sender}_*\n\n${lenguajeGB['smsCont4']()}\n*_${m.text}_*\n\n${lenguajeGB['smsCont5']()}\n\`\`\`${format(e)}\`\`\`\n\n${lenguajeGB['smsCont6']()}`.trim(), data.jid)
            }
        }
    }
    
    // Si la opción 'restrict' no está activada y el plugin tiene la etiqueta 'admin', continúa con el siguiente plugin.
    if (!opts['restrict'])
        if (plugin.tags && plugin.tags.includes('admin')) {
            // Se omite la llamada a 'global.dfail' que podría usarse para manejar restricciones.
            // global.dfail('restrict', m, this)
            continue
        }
}
// Función para escapar caracteres especiales en una cadena para usar en una expresión regular.
// Esto asegura que caracteres como |, \, {, }, (, ), [, ], ^, $, +, *, ?, . sean tratados como literales.
const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

// Determina el prefijo a usar para el plugin.
// Si el plugin tiene un prefijo personalizado, se usa ese prefijo.
// Si no, se usa el prefijo del objeto 'conn' (que puede ser el prefijo del bot configurado).
// Si ninguno de los anteriores está definido, se usa el prefijo global.
let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix

// Determina si el prefijo es una expresión regular, un array, o una cadena y realiza una búsqueda en el texto del mensaje (m.text).
// Si es una expresión regular, se ejecuta directamente.
// Si es un array, se ejecuta cada expresión regular o cadena convertida a expresión regular.
// Si es una cadena, se convierte a expresión regular.
let match = (_prefix instanceof RegExp ? // Modo Expresión Regular?
    [[_prefix.exec(m.text), _prefix]] :
    Array.isArray(_prefix) ? // ¿Es un Array?
        _prefix.map(p => {
            let re = p instanceof RegExp ? // ¿Es una Expresión Regular en el Array?
                p :
                new RegExp(str2Regex(p)) // Convierte la cadena a expresión regular.
            return [re.exec(m.text), re]
        }) :
        typeof _prefix === 'string' ? // ¿Es una Cadena?
            [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
            [[[], new RegExp]]
).find(p => p[1]) // Encuentra la primera coincidencia que tenga una expresión regular válida.

// Si el plugin tiene una función 'before', la ejecuta antes de procesar el comando.
// 'plugin.before' debe ser una función que se llama con el contexto adecuado y parámetros relevantes.
if (typeof plugin.before === 'function') {
    if (await plugin.before.call(this, m, {
        match,                  // Coincidencias encontradas.
        conn: this,             // Objeto de conexión del bot.
        participants,           // Participantes del grupo.
        groupMetadata,          // Metadatos del grupo.
        user,                   // Datos del usuario que envió el mensaje.
        bot,                    // Datos del bot en el grupo.
        isROwner,               // Verifica si el usuario es el propietario real.
        isOwner,                // Verifica si el usuario es el propietario del bot.
        isRAdmin,               // Verifica si el usuario es un superadministrador.
        isAdmin,                // Verifica si el usuario es administrador.
        isBotAdmin,             // Verifica si el bot es administrador.
        isPrems,                // Verifica si el usuario tiene permisos especiales.
        chatUpdate,             // Información de actualización del chat.
        __dirname: ___dirname,  // Directorio del plugin.
        __filename              // Archivo del plugin.
    }))
        continue
}
// Verifica si 'plugin' no es una función y continúa con la siguiente iteración del bucle si es así.
// Esto asegura que solo se procesen los elementos en 'global.plugins' que son funciones.
if (typeof plugin !== 'function')
    continue

// Asigna el primer carácter del prefijo utilizado (si existe) a 'usedPrefix'.
if ((usedPrefix = (match[0] || '')[0])) {
    // Elimina el prefijo del texto del mensaje para obtener el comando y los argumentos.
    let noPrefix = m.text.replace(usedPrefix, '')
    
    // Divide el texto sin prefijo en partes, asigna el primer elemento a 'command' y el resto a 'args'.
    // 'filter(v => v)' elimina elementos vacíos.
    let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
    
    // Asegura que 'args' no sea null o undefined.
    args = args || []
    
    // Obtiene los argumentos del comando y los une en una cadena 'text'.
    let _args = noPrefix.trim().split` `.slice(1)
    let text = _args.join` `
    
    // Convierte el comando a minúsculas para asegurar la comparación sin distinción entre mayúsculas y minúsculas.
    command = (command || '').toLowerCase()
    
    // Obtiene la función de manejo de fallos del plugin o usa la función global 'dfail' si no está definida.
    let fail = plugin.fail || global.dfail // En caso de fallo
    
    // Determina si el comando es aceptable según el tipo de 'plugin.command'.
    // Verifica si 'plugin.command' es una expresión regular, un array de expresiones regulares o cadenas, o una cadena simple.
    let isAccept = plugin.command instanceof RegExp ? // ¿Modo Expresión Regular?
        plugin.command.test(command) :
        Array.isArray(plugin.command) ? // ¿Es un Array?
            plugin.command.some(cmd => cmd instanceof RegExp ? // ¿Expresión Regular en el Array?
                cmd.test(command) :
                cmd === command
            ) :
            typeof plugin.command === 'string' ? // ¿Es una Cadena?
                plugin.command === command :
                false
}

// Si el comando no es aceptado, continúa con la siguiente iteración del bucle.
// Esto evita que se procese el mensaje si el comando no cumple con los criterios de aceptación.
if (!isAccept)
    continue

// Asigna el nombre del plugin que se está procesando a la propiedad 'm.plugin'.
m.plugin = name

// Verifica si el chat o el remitente están en la base de datos.
if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
    // Obtiene la información del chat y del usuario desde la base de datos.
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]

    // Si el plugin no es uno de los excluidos y el chat está baneado y el usuario no es el propietario,
    // entonces no se permite el uso del plugin para ese chat.
    if (!['owner-unbanchat.js'].includes(name) && chat && chat.isBanned && !isROwner) return // Excepto esto

    // Si el nombre del plugin no está en la lista de excepciones y el chat está baneado y el usuario no es el propietario,
    // entonces no se permite el uso del plugin para ese chat.
    if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned && !isROwner) return 
    
    // Si el mensaje tiene texto y el usuario está baneado y no es el propietario,
    // realiza las siguientes acciones.
    if (m.text && user.banned && !isROwner) {
        // Si el contador de antispam del usuario es mayor que 2, no se permite el uso del comando.
        if (user.antispam > 2) return
        
        // Envía un mensaje al usuario indicando que está baneado y no puede usar los comandos.
        // Proporciona el motivo del baneo y un enlace para exponer su caso si cree que es un error.
        m.reply(`🚫 *¡OH NO! ESTÁS EN EL BANLISTA* 🚫\n\n😂 *PARECE QUE TE HAN BANEADO* 😂\n*¿MOTIVO?* 🤔 *${user.messageSpam === 0 ? 'NO ESPECIFICADO, PERO SEGURAMENTE HICISTE ALGO DIVERTIDO' : user.messageSpam}*\n\n🤯 *¡CUANDO TE BANEARON, EL BOT TAMBIÉN SE RÍÓ!* 🤯\n\n👉 *SI CREES QUE ESTO ES UN ERROR* 👉\n👉 *¿Tienes pruebas? Puedes exponer tu caso en:* 👉\n*${ig}*\n*Y si eso no funciona, siempre está ${asistencia} para escuchar tus quejas* 🤷‍♂️\n\n🛑 *No intentes evadir el baneo o tendrás que enfrentar al * *BOT RÍE* 🤣*`)
        
        // Incrementa el contador de antispam del usuario.
        user.antispam++    
        
        // Termina la ejecución del código para el usuario baneado.
        return
    }
}

// Antispam 2
// Si el usuario tiene activado el antispam2 y es el propietario (ROwner), se omite el control de spam.
if (user.antispam2 && isROwner) return

// Calcula el nuevo tiempo permitiendo el envío de mensajes.
// Se agrega 3000 milisegundos (3 segundos) al último tiempo registrado.
let time = global.db.data.users[m.sender].spam + 3000

// Verifica si el tiempo transcurrido desde el último mensaje es menor a 3000 milisegundos (3 segundos).
// Si es así, considera el mensaje como spam y muestra un mensaje en la consola.
if (new Date - global.db.data.users[m.sender].spam < 3000) return console.log(`[ SPAM ]`)

// Actualiza el tiempo del último mensaje para el usuario con la fecha actual en milisegundos.
global.db.data.users[m.sender].spam = new Date * 1
}

// Define el prefijo a utilizar para identificar comandos.
let hl = _prefix 

// Obtiene el modo de administración del grupo desde la base de datos.
let adminMode = global.db.data.chats[m.chat].modoadmin

// Define una variable 'gata' que verifica si alguno de los plugins está activo o si el comando coincide con el prefijo.
let gata = `${plugins.botAdmin || plugins.admin || plugins.group || plugins || noPrefix || hl ||  m.text.slice(0, 1) == hl || plugins.command}`

// Si el modo de administración está activado, el usuario no es el propietario del bot (isOwner), 
// no es el propietario del bot (isROwner), está en un grupo (m.isGroup), 
// no es un administrador del grupo (isAdmin), y 'gata' tiene un valor,
// entonces se detiene la ejecución del código.
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && gata) return   

// Si el plugin tiene un propietario ('rowner') y un propietario definido ('owner'), 
// y el usuario que envió el mensaje no es ni el propietario del bot ni el propietario del bot,
// se llama a la función 'fail' con el mensaje 'owner' y se continúa con la siguiente iteración.
if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // número bot owner
    fail('owner', m, this) // Llama a la función 'fail' con el tipo 'owner'.
    continue // Continua con la siguiente iteración del bucle.
}
// Verifica si el usuario es el propietario del bot y si no es un ROwner (propietario de alto nivel).
if (plugin.rowner && !isROwner) { // Propietario de bot de alto nivel
    fail('rowner', m, this) // Llama a la función 'fail' con el tipo 'rowner'.
    continue // Continúa con la siguiente iteración del bucle.
}

// Verifica si el usuario es el propietario del bot y si no es un Owner (propietario).
if (plugin.owner && !isOwner) { // Propietario del bot
    fail('owner', m, this) // Llama a la función 'fail' con el tipo 'owner'.
    continue // Continúa con la siguiente iteración del bucle.
}

// Verifica si el usuario tiene el rol de moderador y si no es un Mods (moderador).
if (plugin.mods && !isMods) { // Moderador
    fail('mods', m, this) // Llama a la función 'fail' con el tipo 'mods'.
    continue // Continúa con la siguiente iteración del bucle.
}

// Verifica si el usuario tiene una suscripción premium y si no es Premium.
if (plugin.premium && !isPrems) { // Premium
    fail('premium', m, this) // Llama a la función 'fail' con el tipo 'premium'.
    continue // Continúa con la siguiente iteración del bucle.
}
// Verifica si el comando está restringido a grupos y si el mensaje no está en un grupo.
if (plugin.group && !m.isGroup) { // Solo en grupo
    fail('group', m, this) // Llama a la función 'fail' con el tipo 'group'.
    continue // Continúa con la siguiente iteración del bucle.
} else if (plugin.botAdmin && !isBotAdmin) { // Detecta si el bot es administrador y si no lo es.
    fail('botAdmin', m, this) // Llama a la función 'fail' con el tipo 'botAdmin'.
    continue // Continúa con la siguiente iteración del bucle.
} else if (plugin.admin && !isAdmin) { // Detecta si el usuario es administrador y si no lo es.
    fail('admin', m, this) // Llama a la función 'fail' con el tipo 'admin'.
    continue // Continúa con la siguiente iteración del bucle.
}

// Verifica si el comando está restringido a chats privados y si el mensaje está en un grupo.
if (plugin.private && m.isGroup) { // Solo en chat privado
    fail('private', m, this) // Llama a la función 'fail' con el tipo 'private'.
    continue // Continúa con la siguiente iteración del bucle.
}

// Verifica si el comando requiere que el usuario esté registrado y si el usuario no está registrado.
if (plugin.register == true && _user.registered == false) { // Usuario registrado
    fail('unreg', m, this) // Llama a la función 'fail' con el tipo 'unreg'.
    continue // Continúa con la siguiente iteración del bucle.
}

m.isCommand = true // Marca el mensaje como un comando

// Define la cantidad de XP ganada por comando, por defecto 10
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10

// Verifica si la cantidad de XP es mayor que 2000
if (xp > 2000)
    m.reply('Exp limit') // Responde con un mensaje de límite de XP
else               
// Verifica si el usuario no es premium y necesita cierta cantidad de dinero para ejecutar el comando
if (!isPrems && plugin.money && global.db.data.users[m.sender].money < plugin.money * 1) {
// Envia un mensaje al usuario indicando que no tiene suficiente dinero (JoanCoins)
    this.sendMessage(m.chat, {text: `💸💔 ¡Uy, parece que tus 🪙 *𝑱𝒐𝒂𝒏𝑪𝒐𝒊𝒏𝒔* se han ido de vacaciones! 😹🌴\n\n🔍 ¡Checa tu saldo y vuelve cuando tengas más monedas para jugar! 😜👋\n\nMientras tanto, si quieres ser el *rey de las 𝑱𝒐𝒂𝒏𝑪𝒐𝒊𝒏𝒔*, prueba *superar el desafío* en nuestra tienda: ${gt}! 🎉👑\n\n🔗 *[Ver tienda]*(${accountsgb})`,  contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 💻 𝑨𝒅𝒎𝒊𝒏-𝑻𝑲 - 𝑾𝒉𝒂𝒕𝒔𝒂𝒑𝒑 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}}, { quoted: m })         
    continue // Continúa con la siguiente iteración del bucle
}

// Añade la experiencia (xp) al valor actual de m.exp
m.exp += xp

// Verifica si el usuario no es un premium y si el límite de usuario es menor que el límite requerido por el plugin
if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
    // Envía un mensaje indicando que el usuario necesita comprar más límites
    this.sendMessage(m.chat, {
        text: `${lenguajeGB['smsCont7']()} *${usedPrefix}buy*`,
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                description: null,
                title: gt,
                body: ' 💻 𝑨𝒅𝒎𝒊𝒏-𝑻𝑲 - 𝑾𝒉𝒂𝒕𝒔𝒂𝒑𝒑 ',
                previewType: 0,
                thumbnail: gataImg,
                sourceUrl: accountsgb
            }
        }
    }, { quoted: m })
    // Continúa con la siguiente iteración sin aplicar el comando
    continue // Sin límite
}

// Verifica si el nivel del plugin es mayor que el nivel del usuario
if (plugin.level > _user.level) {
    // Envía un mensaje indicando la diferencia de niveles
    this.sendMessage(m.chat, {
        text: `${lenguajeGB['smsCont9']()} *${plugin.level}* ${lenguajeGB['smsCont10']()} *${_user.level}* ${lenguajeGB['smsCont11']()} *${usedPrefix}nivel*`,
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                description: null,
                title: gt,
                body: ' 💻 𝑨𝒅𝒎𝒊𝒏-𝑻𝑲 - 𝑾𝒉𝒂𝒕𝒔𝒂𝒑𝒑 ',
                previewType: 0,
                thumbnail: gataImg,
                sourceUrl: accountsgb
            }
        }
    }, { quoted: m })
    // Continúa con la siguiente iteración si el nivel no se ha alcanzado
    continue // Si no se ha alcanzado el nivel
}
let extra = {
    // Coincidencia encontrada por el comando o patrón
    match,

    // Prefijo usado para invocar el comando
    usedPrefix,

    // Prefijo no usado (posiblemente usado para comandos sin prefijo)
    noPrefix,

    // Argumentos originales del comando
    _args,

    // Argumentos procesados del comando
    args,

    // Nombre del comando que se está ejecutando
    command,

    // Texto completo del mensaje o comando
    text,

    // Referencia al objeto de conexión o contexto
    conn: this,

    // Lista de participantes en el grupo
    participants,

    // Metadatos del grupo (información sobre el grupo)
    groupMetadata,

    // Información del usuario que envía el mensaje
    user,

    // Información del bot que está ejecutando el comando
    bot,

    // Indica si el usuario es el propietario del bot
    isROwner,

    // Indica si el usuario es el propietario del grupo
    isOwner,

    // Indica si el usuario es un administrador de rango
    isRAdmin,

    // Indica si el usuario es un administrador
    isAdmin,

    // Indica si el bot es un administrador
    isBotAdmin,

    // Indica si el usuario tiene un estatus de premium
    isPrems,

    // Actualización del estado del chat (como cambios en los participantes)
    chatUpdate,

    // Nombre del directorio actual
    __dirname: ___dirname,

    // Nombre del archivo actual
    __filename
}
try {
    // Intenta llamar al plugin con los parámetros dados
    await plugin.call(this, m, extra);

    // Si el usuario no tiene permisos (no es un admin o similar)
    if (!isPrems) {
        // Configura los límites y el dinero de 'm' con valores del plugin o false si no están definidos
        m.limit = m.limit || plugin.limit || false;
        m.money = m.money || plugin.money || false;
    }
} catch (e) {
    // Si ocurre un error, se ejecuta esta sección
    m.error = e; // Guarda el error en el objeto 'm'
    console.error(e); // Muestra el error en la consola

    if (e) {
        // Si hay un error, se procesa el texto del error
        let text = format(e);

        // Reemplaza las claves de la API con '#HIDDEN#' en el texto del error
        for (let key of Object.values(global.APIKeys)) {
            text = text.replace(new RegExp(key, 'g'), '#HIDDEN#');
        }

        // Si el error tiene un nombre, se notifica a los desarrolladores
        if (e.name) {
            // Recorre los IDs de los desarrolladores
            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                // Obtiene la información del número de WhatsApp
                let data = (await conn.onWhatsApp(jid))[0] || {};

                if (data.exists) {
                    // Envía un mensaje al desarrollador con detalles del error
                    m.reply(`${lenguajeGB['smsCont1']()}\n\n${lenguajeGB['smsCont2']()}\n*_${name}_*\n\n${lenguajeGB['smsCont3']()}\n*_${m.sender}_*\n\n${lenguajeGB['smsCont4']()}\n*_${m.text}_*\n\n${lenguajeGB['smsCont5']()}\n\`\`\`${format(e)}\`\`\`\n\n${lenguajeGB['smsCont6']()}`.trim(), data.jid);
                }
            }
        }
    }
}
try {
    // Envía el texto al chat
    m.reply(text);
} finally {
    // Bloque 'finally' se ejecuta siempre, haya habido un error o no

    // Verifica si existe una función 'after' en el plugin y la ejecuta
    if (typeof plugin.after === 'function') {
        try {
            // Llama a la función 'after' del plugin con el contexto y parámetros dados
            await plugin.after.call(this, m, extra);
        } catch (e) {
            // Si ocurre un error al ejecutar la función 'after', lo muestra en la consola
            console.error(e);
        }
    }

    // Si 'm.limit' está definido, envía un mensaje con el límite y un texto de lenguaje
    if (m.limit) {
        m.reply(+m.limit + lenguajeGB.smsCont8());
    }

    // Si 'm.money' está definido, envía un mensaje con el dinero y un texto específico
    if (m.money) {
        m.reply(+m.money + ' 𝑱𝒐𝒂𝒏𝑪𝒐𝒊𝒏𝒔 💻 𝒖𝒔𝒂𝒅𝒐(𝒔)');
    }

    // Sale del bloque de control
    break;
} catch (e) {
    // Si ocurre un error en cualquier parte del bloque 'try', lo muestra en la consola
    console.error(e);
} finally {
    // Otro bloque 'finally' que se ejecuta siempre, haya habido un error o no

    // Verifica si la opción 'queque' está activada y si 'm.text' tiene un valor
    if (opts['queque'] && m.text) {
        // Busca el índice del mensaje en la cola de mensajes
        const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id);
        // Si el mensaje está en la cola, lo elimina
        if (quequeIndex !== -1) {
            this.msgqueque.splice(quequeIndex, 1);
        }
    }
}
// Imprime los datos del usuario en la consola (comentado)
// console.log(global.db.data.users[m.sender])

// Declara variables para el usuario y las estadísticas
let user, stats = global.db.data.stats;

// Verifica si el objeto 'm' existe
if (m) {
    // Obtiene los datos del usuario desde la base de datos usando el identificador del remitente
    let utente = global.db.data.users[m.sender];
    
    // Verifica si el usuario está en estado de silencio (muto)
    if (utente.muto == true) {
        // Obtiene el ID del mensaje y el participante asociado
        let bang = m.key.id;
        let cancellazzione = m.key.participant;
        
        // Envía un mensaje para eliminar el mensaje específico del chat
        await conn.sendMessage(m.chat, {
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: bang, 
                participant: cancellazzione 
            }
        });
    }

    // Verifica si el remitente existe en la base de datos
    if (m.sender && (user = global.db.data.users[m.sender])) {
        // Incrementa la experiencia del usuario con el valor de 'm.exp'
        user.exp += m.exp;
        
        // Decrementa el límite del usuario usando el valor de 'm.limit'
        user.limit -= m.limit * 1;
        
        // Decrementa el dinero del usuario usando el valor de 'm.money'
        user.money -= m.money * 1;
    }
}

// Declara una variable para almacenar las estadísticas del plugin
let stat;

// Verifica si 'm.plugin' está definido
if (m.plugin) {
    // Obtiene la fecha y hora actual en milisegundos
    let now = +new Date();

    // Verifica si el plugin ya existe en las estadísticas
    if (m.plugin in stats) {
        // Obtiene las estadísticas del plugin existente
        stat = stats[m.plugin];

        // Asegura que 'stat.total' sea un número, inicializa en 1 si no lo es
        if (!isNumber(stat.total)) {
            stat.total = 1;
        }

        // Asegura que 'stat.success' sea un número, inicializa en 0 si hay un error, o 1 si no lo hay
        if (!isNumber(stat.success)) {
            stat.success = m.error != null ? 0 : 1;
        }

        // Asegura que 'stat.last' sea un número, inicializa en la hora actual si no lo es
        if (!isNumber(stat.last)) {
            stat.last = now;
        }

        // Asegura que 'stat.lastSuccess' sea un número, inicializa en 0 si hay un error, o en la hora actual si no lo hay
        if (!isNumber(stat.lastSuccess)) {
            stat.lastSuccess = m.error != null ? 0 : now;
        }
    } else {
        // Si el plugin no existe en las estadísticas, lo crea e inicializa con valores predeterminados
        stat = stats[m.plugin] = {
            total: 1,
            success: m.error != null ? 0 : 1,
            last: now,
            lastSuccess: m.error != null ? 0 : now
        };
    }

    // Incrementa el total de estadísticas
    stat.total += 1;

    // Actualiza la última hora registrada
    stat.last = now;

    // Si no hubo un error, incrementa el conteo de éxitos y actualiza la última hora de éxito
    if (m.error == null) {
        stat.success += 1;
        stat.lastSuccess = now;
    }
}

try {
    // Intenta importar e imprimir el mensaje si la opción 'noprint' no está activada
    if (!opts['noprint']) {
        await (await import('./lib/print.js')).default(m, this);
    }
} catch (e) {
    // Si ocurre un error durante la importación, imprímelo en la consola
    console.log(m, m.quoted, e);
}

// Obtiene la configuración de ajustes para el usuario actual
let settingsREAD = global.db.data.settings[this.user.jid] || {};  

// Lee el mensaje si la opción 'autoread' está activada
if (opts['autoread']) {
    await this.readMessages([m.key]);
}

// Lee el mensaje si la configuración 'autoread2' está activada
if (settingsREAD.autoread2) {
    await this.readMessages([m.key]);
}

// La línea comentada abajo es una alternativa para la configuración 'autoread2'
// if (settingsREAD.autoread2 == 'true') await this.readMessages([m.key]);   
	    
// Verifica si la reacción está habilitada para el chat y si el mensaje contiene ciertos patrones
if (db.data.chats[m.chat].reaction && m.text.match(/(ción|dad|aje|oso|izar|mente|pero|tion|age|ous|ate|and|but|ify)/gi)) {

    // Selecciona un emoji al azar de una lista de emojis relacionados con sentimientos
    let emot = pickRandom([
        // Emojis felices y alegres
        "😀", "😃", "😄", "😁", "😆", "🥹", "😅", "😂", "🤣", "🥲", "☺️", "😊", "😇", "🙂", "🙃", "😉", 
        "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤩", "🥳", "😏", "😒", 

        // Emojis tristes y preocupados
        "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", 
        "🤬", "🤯", "😳", "🥵", "🥶", "😶‍🌫️", "😱", "😨", "😰", "😥", "😓", "😶", "😐", "😑", "😬", "🙄", 
        "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😮‍💨", "😵", "😵‍💫", "🤐", "🥴", "🤢", 
        "🤮", "🤧", "😷", "🤒", "🤕", 

        // Emojis sorprendidos y en shock
        "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤯", "🤬", 

        // Emojis emocionados y confundidos
        "🤗", "🤔", "🫣", "🤭", "🫢", "🫡", "🤫", "🫠", "🤥", "🫥", "🫤", "🫨", "😬", "🙄", "😯", "😦", 
        "😧", "😮", "😲", "😵", "🤯", "😲", 

        // Emojis variados
        "💩", "👻", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🫶", "👍", "✌️", "🙏", "🫵", 
        "🤏", "🤌", "☝️", "🖕", "🫵", "🫂", "🐱", "🤹‍♀️", "🤹‍♂️", "🗿", "✨", "⚡", "🔥", "🌈", "🩷", 
        "❤️", "🧡", "💛", "💚", "🩵", "💙", "💜", "🖤", "🩶", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", 
        "💕", "💞", "💓", "💗", "💖", "💘", "💝", "🏳️‍🌈", "👊", "👀", "💋", "🫰", "💅", "👑", "🐣", 
        "🐤", "🐈"
    ]);

    // Si el mensaje no proviene del bot, envía una reacción con el emoji seleccionado
    if (!m.fromMe) {
        return this.sendMessage(m.chat, { react: { text: emot, key: m.key } });
    }
}

// Función para seleccionar un elemento aleatorio de una lista
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

/**
 * Maneja las actualizaciones de los participantes en grupos.
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
    // Si el bot está configurado para no responder a sí mismo, salimos de la función
    if (opts['self']) return;
    
    // Si el bot ya ha sido inicializado, salimos de la función
    if (this.isInit) return;
    
    // Cargamos la base de datos si es necesario
    if (global.db.data == null) await loadDatabase();
    
    // Obtenemos los datos del chat del grupo
    let chat = global.db.data.chats[id] || {};
    
    // Variable para el texto del mensaje de bienvenida o despedida
    let text = '';
    
    // Evaluamos la acción (añadir o eliminar participantes)
    switch (action) {
        case 'add':
        case 'remove':
            // Si hay un mensaje de bienvenida configurado, lo utilizamos
            if (chat.welcome) {
                // Obtenemos los metadatos del grupo
                let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata;
                
                // Iteramos sobre los participantes afectados
                for (let user of participants) {
                    let pp = global.gataImg;
                    try {
                        // Intentamos obtener la foto de perfil del usuario
                        pp = await this.profilePictureUrl(user, 'image');
                    } catch (e) {
                        // Si ocurre un error, utilizamos la imagen predeterminada
                    } finally {
                        // Obtenemos el archivo de la foto de perfil
                        let apii = await this.getFile(pp);
                        
                        // Verificamos si el bot es administrador en el grupo
                        const botTt2 = groupMetadata.participants.find(u => this.decodeJid(u.id) == this.user.jid) || {};
                        const isBotAdminNn = botTt2?.admin === "admin" || false;
                        
                        // Determinamos el mensaje a enviar basado en la acción
                        text = (action === 'add' 
                            ? (chat.sWelcome || this.welcome || conn.welcome || '¡Bienvenido, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || '💻 𝑨𝒅𝒎𝒊𝒏-𝑻𝑲 💻') 
                            : (chat.sBye || this.bye || conn.bye || '¡Adiós, @user!')).replace('@user', '@' + user.split('@')[0]);
                        
                        // Aquí se podría enviar el mensaje de bienvenida o despedida
                    }
                }
            }
            break;
    }
}
			    
// Verifica si el sistema de protección antifalsificación está habilitado,
// si el bot es administrador en el grupo y si la acción es 'add' (añadir usuario)
if (chat.antifake && isBotAdminNn && action === 'add') {
    
    // Define una lista actualizada de prefijos predeterminados que se usan para identificar números sospechosos
    const prefijosPredeterminados = [
        7, 20, 27, 30, 31, 32, 33, 39, 40, 44, 46, 47, 48, 49, 61, 62, 63, 64, 65, 66, 
        81, 82, 84, 86, 91, 92, 94, 98, 212, 213, 216, 218, 221, 222, 225, 233, 234, 
        237, 249, 254, 255, 256, 351, 380, 675, 676, 679, 685, 880, 961, 962, 964, 
        965, 966, 967, 968, 971, 972, 973, 974
    ]; // Puedes editar esta lista según sea necesario
    const rutaArchivo = './prefijos.json'; // Ruta del archivo JSON que contiene prefijos personalizados
    
    let prefijos = []; // Inicializa el array de prefijos
    
    // Verifica si el archivo de prefijos existe
    const existeArchivo = fs.existsSync(rutaArchivo);
    if (existeArchivo) {
        try {
            // Lee el contenido del archivo y lo convierte en un array de prefijos
            const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
            prefijos = JSON.parse(contenido);
        } catch (error) {
            // Maneja errores en caso de que haya un problema al leer el archivo
            console.log('Error al leer "prefijos.json": ', error);
            return; // Sale de la función si ocurre un error
        }
    } else {
        // Si el archivo no existe, usa los prefijos predeterminados
        prefijos = prefijosPredeterminados;
    }
    
    // Verifica si el número de usuario comienza con alguno de los prefijos
    const comienzaConPrefijo = prefijos.some(prefijo => user.startsWith(prefijo.toString()));
    if (comienzaConPrefijo) {
        // Crea el texto de advertencia y el mensaje que se enviará al grupo
        let texto = mid.mAdvertencia + mid.mFake2(user);
        
        // Envía el mensaje de advertencia al grupo mencionando al usuario
        await conn.sendMessage(id, { text: texto, mentions: [user] });
        
        // Intenta eliminar al usuario del grupo
        let responseb = await conn.groupParticipantsUpdate(id, [user], 'remove');
        if (responseb[0].status === "404") {
            // Si la eliminación falla (por ejemplo, si el usuario no está en el grupo), sale de la función
            return;
        }
    }
}
	
// Crea un objeto de contacto para enviar un mensaje de vCard
let fkontak2 = {
    "key": {
        "participants": "0@s.whatsapp.net",  // Participante que recibe el mensaje
        "remoteJid": "status@broadcast",     // ID del grupo o del canal de difusión
        "fromMe": false,                     // Indica si el mensaje es enviado por el bot mismo
        "id": "Halo"                         // ID del mensaje
    },
    "message": {
        "contactMessage": {
            "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${user.split('@')[0]}:${user.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            // vCard con información de contacto, incluye el número de WhatsApp del usuario
        }
    },
    "participant": "0@s.whatsapp.net"  // Participante que recibe el mensaje
};

// Envía un mensaje al grupo con el contenido especificado
this.sendMessage(
    id,  // ID del grupo o chat al que se envía el mensaje
    {
        text: text,  // Texto del mensaje
        contextInfo: {
            forwardingScore: 9999999,  // Puntuación de reenvío para indicar que el mensaje es reenviado
            isForwarded: true,        // Marca el mensaje como reenviado
            mentionedJid: [user],     // Menciona al usuario en el mensaje
            "externalAdReply": {
                "showAdAttribution": true,          // Muestra atribución del anuncio
                "renderLargerThumbnail": true,      // Renderiza una miniatura más grande
                "thumbnail": apii.data,              // Imagen miniatura del mensaje
                "title": [wm, '💻 𝑺𝒖𝒑𝒆𝒓 ' + gt + ' 💻', '🌟 joanbottk.gmail.com'].getRandom(),  // Título del anuncio
                "containsAutoReply": true,          // Indica que el mensaje contiene una respuesta automática
                "mediaType": 1,                     // Tipo de medio (1 para imagen)
                "sourceUrl": accountsgb ? accountsgb : 'https://github.com/JJoan02/Admin-TK'  // URL de la fuente del anuncio
            }
        }
    },
    {
        quoted: fkontak2  // Incluye el objeto de contacto como cita en el mensaje
    }
);

// Limpia los datos de la imagen para evitar el uso de memoria innecesario
apii.data = '';

// La siguiente línea está comentada, pero se puede usar para enviar un archivo
// this.sendFile(id, apii.data, 'pp.jpg', text, null, false, { mentions: [user] }, { quoted: fkontak2 })
			    
// Maneja la actualización de roles en el grupo (promoción y democión de usuarios)
break
case 'promote':       // Caso para promover un usuario a administrador
case 'daradmin':      // Alias para el comando de promoción
case 'darpoder':      // Otro alias para el comando de promoción
    // Establece el texto de confirmación para la promoción
    text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```');
    break  // Salta al final del switch-case

case 'demote':        // Caso para despromover un usuario de administrador
case 'quitarpoder':   // Alias para el comando de despromoción
case 'quitaradmin':   // Otro alias para el comando de despromoción
    // Si no se ha definido un texto de confirmación, utiliza el texto predeterminado
    if (!text)
        text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```');
    // Reemplaza el marcador @user con el nombre de usuario del primer participante
    text = text.replace('@user', '@' + participants[0].split('@')[0]);
    // Si la detección está habilitada, envía el mensaje
    if (chat.detect)
        // this.sendMessage(id, { text, mentions: this.parseMention(text) });
        // La línea anterior está comentada pero sería utilizada para enviar un mensaje al grupo
    break  // Salta al final del switch-case
    }
}
// Fin del código para manejo de roles


/**
 * Maneja las actualizaciones de grupos
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
    // Verifica si el bot es autoejecutable y si el usuario no es propietario ni administrador de lectura
    if (opts['self'] && !isOwner && !isROwner)
        return

    // Recorre cada actualización de grupo
    for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        // Si no hay ID de grupo, continúa con la siguiente actualización
        if (!id) continue

        // Obtiene la configuración del grupo desde la base de datos
        let chats = global.db.data?.chats?.[id], text = ''

        // Verifica si la detección de cambios está habilitada para el grupo
        if (!chats?.detect) continue

        // Comenta las líneas de código para manejar cambios en la descripción, asunto e ícono del grupo
        // if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
        // if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
        // if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)

        // Maneja el caso en que se revoca el enlace del grupo
        if (groupUpdate.revoke) {
            text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke')
                .replace('@revoke', groupUpdate.revoke)
        }

        // Si no se ha definido texto, continúa con la siguiente actualización
        if (!text) continue

        // Envía el mensaje con la actualización del grupo
        await this.sendMessage(id, { text, mentions: this.parseMention(text) })
    }
}

/**
 * Maneja las actualizaciones de llamadas y la apertura de canales de voz.
 * @param {Array} callUpdate - La actualización de llamadas recibida.
 */
export async function callUpdate(callUpdate) {
    // Verifica si la función antiCall está habilitada en la configuración del bot
    let isAnticall = global.db.data.settings[this.user.jid].antiCall  
    if (!isAnticall) return // Si antiCall no está habilitado, salir de la función

    // Itera sobre cada actualización de llamada
    for (let nk of callUpdate) {
        // Verifica si la llamada es de un grupo
        if (nk.isGroup) {
            // En caso de que la llamada sea en un grupo, se eliminará al usuario del grupo
            // Verifica si el estado de la llamada es "offer" (oferta) o el usuario está iniciando un canal de voz
            if (nk.status == "offer" || nk.isVideo) {
                // Elimina al usuario del grupo
                try {
                    await this.groupParticipantsUpdate(nk.chat, [nk.from], 'remove');
                } catch (error) {
                    console.error('Error al eliminar al usuario del grupo:', error);
                }
            }
        } else {
            // Maneja las llamadas fuera de grupos
            if (nk.status == "offer") {
                // Envía un mensaje de respuesta al usuario que está llamando
                let callmsg = await this.reply(
                    nk.from, // Número del remitente
                    `${lenguajeGB['smsCont15']()} *@${nk.from.split('@')[0]}*, ${nk.isVideo ? lenguajeGB.smsCont16() : lenguajeGB.smsCont17()} ${lenguajeGB['smsCont18']()}`, // Mensaje de respuesta
                    false, // No se debe citar el mensaje
                    { mentions: [nk.from] } // Menciona al usuario que está llamando
                )
                
                // Opcional: Puede enviar el contacto del bot al usuario que está llamando
                // let data = global.owner.filter(([id, isCreator]) => id && isCreator)
                // await this.sendContact(nk.from, data.map(([id, name]) => [id, name]), false, { quoted: callmsg })
                
                // Bloquea al usuario que está llamando
                await this.updateBlockStatus(nk.from, 'block')
            }
        }
    }
}

/**
 * Maneja la actualización de mensajes eliminados.
 * @param {Object} message - El mensaje que ha sido actualizado (eliminado).
 */
export async function deleteUpdate(message) {
    try {
        // Desestructura el mensaje para obtener propiedades útiles.
        const { fromMe, id, participant } = message;

        // Si el mensaje fue enviado por el bot, no hacer nada.
        if (fromMe) return;

        // Carga y serializa el mensaje eliminado.
        let msg = this.serializeM(this.loadMessage(id));

        // Obtiene la configuración del chat desde la base de datos global.
        let chat = global.db.data.chats[msg?.chat] || {};

        // Verifica si el chat está configurado para manejar mensajes eliminados.
        if (!chat?.delete) return;

        // Verifica que el mensaje existe y está en un grupo.
        if (!msg || !msg?.isGroup) return;

        // Crea un mensaje de advertencia para notificar que un mensaje fue eliminado.
        const antideleteMessage = `*╭━━⬣ ${lenguajeGB['smsCont19']()} ⬣━━ 𓃠*
${lenguajeGB['smsCont20']()} @${participant.split`@`[0]}
${lenguajeGB['smsCont21']()}
*╰━━━⬣ ${lenguajeGB['smsCont19']()} ⬣━━╯*`.trim();

        // Envía el mensaje de advertencia al chat.
        await this.sendMessage(msg.chat, { text: antideleteMessage, mentions: [participant] }, { quoted: msg });

        // Reenvía el mensaje eliminado al chat.
        this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg));
    } catch (e) {
        // Captura y muestra cualquier error que ocurra.
        console.error(e);
    }
}

// Función global para manejar respuestas de fallos
global.dfail = (type, m, conn) => {
    // Define un objeto con mensajes para diferentes tipos de fallos
    let msg = {
        rowner: lenguajeGB['smsRowner'](),   // Mensaje para el propietario del bot
        owner: lenguajeGB['smsOwner'](),     // Mensaje para el propietario del grupo
        mods: lenguajeGB['smsMods'](),       // Mensaje para los moderadores del grupo
        premium: lenguajeGB['smsPremium'](), // Mensaje para usuarios premium
        group: lenguajeGB['smsGroup'](),     // Mensaje para el grupo
        private: lenguajeGB['smsPrivate'](), // Mensaje para conversaciones privadas
        admin: lenguajeGB['smsAdmin'](),     // Mensaje para administradores
        botAdmin: lenguajeGB['smsBotAdmin'](), // Mensaje para administradores del bot
        unreg: lenguajeGB['smsUnreg'](),     // Mensaje para usuarios no registrados
        restrict: lenguajeGB['smsRestrict']() // Mensaje para usuarios restringidos
    }[type]; // Selecciona el mensaje correspondiente al tipo

    // Si el mensaje existe, envíalo como respuesta
    //if (msg) return m.reply(msg);
}
	
// Prepara el objeto para el mensaje
let tg = {
  quoted: m,
  userJid: conn.user.jid
};

// Define el contenido del mensaje de WhatsApp
let messageContent = {
  extendedTextMessage: {
    text: msg,
    contextInfo: {
      externalAdReply: {
        title: lenguajeGB.smsAvisoAG().slice(0, -2),
        body: [
          wm,
          '💻 𝑺𝒖𝒑𝒆𝒓 ' + gt + ' 💻',
          '🌟 joanbottk.gmail.com'
        ].getRandom(), // Cuerpo del mensaje
        thumbnail: gataImg,
        sourceUrl: accountsgb
      }
    }
  }
};

// Genera el mensaje de WhatsApp
let prep = generateWAMessageFromContent(m.chat, messageContent, tg);

// Envía el mensaje si 'msg' está definido
if (msg) {
  return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id });
}

const file = global.__filename(import.meta.url, true);
watchFile(file, async () => {
unwatchFile(file)
console.log(chalk.redBright('Update \'handler.js\''));
//if (global.reloadHandler) console.log(await global.reloadHandler());
  
if (global.conns && global.conns.length > 0 ) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
for (const userr of users) {
userr.subreloadHandler(false)
}}});
