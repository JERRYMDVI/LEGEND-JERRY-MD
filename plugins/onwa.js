const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
  pattern: "onwa",
  alias: ["onwhatsapp"],
  use: '.onwa number',
  react: "📝",
  desc: "Check numbers that are on WhatsApp.",
  category: "tools",
  filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply('*Please provide a number*')
    let number = q.replace(/[^0-9x]/g, '')
    let start = number.replace('x', '0')
    let end = number.replace('x', '9')
    start = start.replace(/[^0-9]/g, '')
    end = end.replace(/[^0-9]/g, '')
    if (!start.startsWith('92')) start = '92' + start
    if (!end.startsWith('92')) end = '92' + end
    let onWhatsApp = []
    for (let i = parseInt(start); i <= parseInt(end); i++) {
      let exists = await conn.onWhatsApp(i.toString())
      if (exists.length > 0) {
        onWhatsApp.push(i)
      }
    }
    let list = `*Numbers on WhatsApp:*\n${onWhatsApp.join('\n')}`
    reply(list)
  } catch (e) {
    l(e)
    reply('*Error !!*')
  }
})

cmd({
  pattern: "nowa",
  alias: ["nowhatsapp"],
  use: '.nowa number',
  react: "📝",
  desc: "Check numbers that are not on WhatsApp.",
  category: "tools",
  filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply('*Please provide a number*')
    let number = q.replace(/[^0-9x]/g, '')
    let start = number.replace('x', '0')
    let end = number.replace('x', '9')
    start = start.replace(/[^0-9]/g, '')
    end = end.replace(/[^0-9]/g, '')
    if (!start.startsWith('92')) start = '92' + start
    if (!end.startsWith('92')) end = '92' + end
    let notOnWhatsApp = []
    for (let i = parseInt(start); i <= parseInt(end); i++) {
      let exists = await conn.onWhatsApp(i.toString())
      if (exists.length === 0) {
        notOnWhatsApp.push(i)
      }
    }
    let list = `*Numbers not on WhatsApp:*\n${notOnWhatsApp.join('\n')}`
    reply(list)
  } catch (e) {
    l(e)
    reply('*Error !!*')
  }
})
