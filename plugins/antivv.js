const { default: makeWASocket, getAggregateVotesInPollMessage, useMultiFileAuthState, DisconnectReason, getDevice, fetchLatestBaileysVersion, jidNormalizedUser, getContentType, Browsers, delay, makeInMemoryStore, makeCacheableSignalKeyStore, downloadContentFromMessage, generateForwardMessageContent, generateWAMessageFromContent, prepareWAMessageMedia, proto } = require('@whiskeysockets/baileys')
const fs = require('fs')
const FileType = require('file-type')
const {cmd , commands} = require('../command')

const commandrvo = {
  pattern: "vv",
  react: "✅",
  alias: ["veiewonce", "oneview", "🔥"],
  desc: "Check one view things",
  category: "main",
  use: ".vv",
  filename: __filename
};

cmd(commandrvo, async (sock, message, msgData, { from,quoted,body,isCmd,command,args,q,isGroup,sender,senderNumber,botNumber2,botNumber,pushname,isMe,isOwner,groupMetadata,groupName,participants,groupAdmins,isBotAdmins,isAdmins, reply }) => {
  try {
    if (!isOwner) return reply("*_You're not bot owner 🚀._*");
    await reply("`ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ ᴏᴘᴇɴɪɴɢ ʏᴏᴜʀ ᴍꜱɢ 🔓`"); // "Please wait opening your message"

    const quotedMsg = msgData?.msg?.contextInfo?.quotedMessage;
    if (quotedMsg) {
      if (quotedMsg.imageMessage?.viewOnce) {
        console.log("ᴅᴇᴄᴛᴇᴅ ᴏɴᴇ ᴠɪᴇᴡ ɪᴍᴀɢᴇ");
        let caption = quotedMsg.imageMessage?.caption || '';
        let mediaPath = await sock.downloadAndSaveMediaMessage(quotedMsg.imageMessage);
        const mediaObject = { url: mediaPath };
        const response = { 
          image: mediaObject, 
          caption: `${caption}\n\n> © 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙟𝙚𝙧𝙧𝙮-𝙢𝙙❤️` 
        };
        return sock.sendMessage(sender,response);
      } else if (quotedMsg.videoMessage?.viewOnce) {
        console.log("ᴅᴇᴄᴛᴇᴅ ᴏɴᴇ ᴠɪᴇᴡ ᴠɪᴅᴇᴏ");
        let caption = quotedMsg.videoMessage?.caption || '';
        let mediaPath = await sock.downloadAndSaveMediaMessage(quotedMsg.videoMessage);
        const mediaObject = { url: mediaPath };
        const response = { 
          video: mediaObject, 
          caption: `${caption}\n\n> © P𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘫𝘦𝘳𝘳𝘺-𝘮𝘥 ❤️` 
        };
        return sock.sendMessage(sender, response);
      } else if (quotedMsg.audioMessage?.viewOnce) {
        console.log("ᴅᴇᴄᴛᴇᴅ ᴏɴᴇ ᴠɪᴇᴡ ᴀᴜᴅɪᴏ");
        let mediaPath = await sock.downloadAndSaveMediaMessage(quotedMsg.audioMessage);
        const mediaObject = { url: mediaPath };
        const response = { 
          audio: mediaObject, 
          mimetype: "audio/ogg; codecs=opus" 
        };
        return sock.sendMessage(sender, response);
      } else {
        return reply("```ᴛʜɪꜱ ɪꜱ ɴᴏᴛ ᴀ ᴏɴᴇ ᴠɪᴇᴡ ᴍᴀꜱꜱᴇɢᴇ```"); // "This is not a View Once message!"
      }
    } else {
      return reply("```ᴛʜɪꜱ ɪꜱ ɴᴏᴛ ᴀ ᴏɴᴇ ᴠɪᴇᴡ ᴍᴀꜱꜱᴇɢᴇ```"); // "Please reply to a View Once message!"
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
