const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const util = require("util");
const { getBuffer } = require('../lib/functions'); 
const Jimp = require('jimp'); 
const { getAnti, setAnti, initializeAntiDeleteSettings } = require('../my_data/index');

initializeAntiDeleteSettings();

cmd({
    pattern: "antidelete",
    alias: ['antidel'],
    fromMe: true,
    desc: "Sets up the Antidelete",
    category: "misc",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner) return reply('This command is only for the bot owner.');
        const command = q?.toLowerCase();
        switch (command) {
            case 'off':
                await setAnti('gc', false);
                await setAnti('dm', false);
                return reply('_ANTIDELETE IS NOW OFF FOR GROUP CHATS AND DIRECT MESSAGES._');

            case 'off gc':
                await setAnti('gc', false);
                return reply('_ANTIDELETE FOR GROUP CHATS IS NOW DISABLED._');

            case 'off dm':
                await setAnti('dm', false);
                return reply('_ANTIDELETE FOR DIRECT MESSAGES IS NOW DISABLED._');

            case 'on gc':
                const gcStatus = await getAnti('gc');
                await setAnti('gc', !gcStatus);
                return reply(`_AntiDelete for Group Chats ${!gcStatus ? 'enabled' : 'disabled'}._`);

            case 'on dm':
                const dmStatus = await getAnti('dm');
                await setAnti('dm', !dmStatus);
                return reply(`_ANTIDELETE FOR DIRECT MESSAGES ${!dmStatus ? 'enabled' : 'disabled'}._`);

            case 'on':
                await setAnti('gc', true);
                await setAnti('dm', true);
                return reply('_ANTIDELETE SET FOR ALL CHATS._');

            case 'status':
                const currentDmStatus = await getAnti('dm');
                const currentGcStatus = await getAnti('gc');
                return reply(`_JERRY-MD ANTIDELETE STATUS_\n\n*DM ANTIDELETE:* ${currentDmStatus ? 'ENABLED ☑️' : 'DISABLED ❌'}\n*GROUP CHAT ANTIDELETE:* ${currentGcStatus ? 'ENABLED ☑️' : 'DISABLED ❌'}`);

            default:
                const helpMessage = `*JERRY-MD ANTIDELETE COMMAND GUIDE:*
                • .antidelete off :- Reset AntiDelete for all chats (disabled by default)
                • .antidelete off gc :- Disable AntiDelete for Group Chats
                • .antidelete off dm :- Disable AntiDelete for Direct Messages
                • .antidelete on gc :- Toggle AntiDelete for Group Chats
                • .antidelete on dm :- Toggle AntiDelete for Direct Messages
                • .antidelete on :- Enable AntiDelete for all chats
                • .antidelete status :- Check current AntiDelete status
                
©️ CREATED BY MR JERRY`;
                 
                return reply(helpMessage);
        }
    } catch (e) {
        console.error("Error in antidelete command:", e);
        return reply("An error occurred while processing your request.");
    }
});



 cmd({
  pattern: "vv2",
  alias: ['retrive', '🔥'],
  react: "👀",
  desc: "Fetch and resend a ViewOnce message content (image/video/audio).",
  category: "misc",
  use: '<query>',
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isOwner) return reply('This command is only for the bot owner.');

    const quotedMessage = m.msg.contextInfo.quotedMessage;
    if (quotedMessage && quotedMessage.viewOnceMessageV2) {
      const quot = quotedMessage.viewOnceMessageV2;

      if (quot.message.imageMessage) {
        let cap = quot.message.imageMessage.caption + '\n\nPOWERED BY MR JERRY';
        let buffer = await conn.downloadMediaMessage(quot.message.imageMessage);
        return conn.sendMessage(from, { image: buffer, caption: cap }, { quoted: mek });
      }

      if (quot.message.videoMessage) {
        let cap = quot.message.videoMessage.caption + '\n\nPOWERED BY MR JERRY';
        let buffer = await conn.downloadMediaMessage(quot.message.videoMessage);
        return conn.sendMessage(from, { video: buffer, caption: cap }, { quoted: mek });
      }

      if (quot.message.audioMessage) {
        let buffer = await conn.downloadMediaMessage(quot.message.audioMessage);
        return conn.sendMessage(from, { audio: buffer, mimetype: 'audio/mpeg' }, { quoted: mek });
      }
    }

    if (m.quoted && m.quoted.type === 'viewOnceMessage') {
      const type = Object.keys(m.quoted.message)[0];

      if (type === 'imageMessage') {
        let cap = m.quoted.message.imageMessage.caption + '\n\nPOWERED BY MR JERRY';
        let buffer = await conn.downloadMediaMessage(m.quoted.message.imageMessage);
        return conn.sendMessage(from, { image: buffer, caption: cap }, { quoted: mek });
      }

      if (type === 'videoMessage') {
        let cap = m.quoted.message.videoMessage.caption + '\n\nPOWERED BY MR JERRY';
        let buffer = await conn.downloadMediaMessage(m.quoted.message.videoMessage);
        return conn.sendMessage(from, { video: buffer, caption: cap }, { quoted: mek });
      }

      if (type === 'audioMessage') {
        let buffer = await conn.downloadMediaMessage(m.quoted.message.audioMessage);
        return conn.sendMessage(from, { audio: buffer, mimetype: 'audio/mpeg' }, { quoted: mek });
      }
    }

    if (m.quoted && m.quoted.type === 'imageMessage') {
      let cap = m.quoted.caption + '\n\nPOWERED BY MR JERRY';
      let buffer = await conn.downloadMediaMessage(m.quoted);
      return conn.sendMessage(from, { image: buffer, caption: cap }, { quoted: mek });
    }

    if (m.quoted && m.quoted.type === 'videoMessage') {
      let cap = m.quoted.caption + '\n\nPOWERED BY MR JERRY';
      let buffer = await conn.downloadMediaMessage(m.quoted);
      return conn.sendMessage(from, { video: buffer, caption: cap }, { quoted: mek });
    }

    if (m.quoted && m.quoted.type === 'audioMessage') {
      let buffer = await conn.downloadMediaMessage(m.quoted);
      return conn.sendMessage(from, { audio: buffer, mimetype: 'audio/mpeg' }, { quoted: mek });
    }

    return reply("Please reply to a ViewOnce message or image/video/audio message.");
  } catch (e) {
    console.log("Error:", e);
    reply("i can't download This media try again");
  }
});
