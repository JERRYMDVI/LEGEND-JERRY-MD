
const { default: makeWASocket, getAggregateVotesInPollMessage, useMultiFileAuthState, DisconnectReason, getDevice, fetchLatestBaileysVersion, jidNormalizedUser, getContentType, Browsers, delay, makeInMemoryStore, makeCacheableSignalKeyStore, downloadContentFromMessage, generateForwardMessageContent, generateWAMessageFromContent, prepareWAMessageMedia, proto } = require('@whiskeysockets/baileys')
const fs = require('fs')
const FileType = require('file-type')
const {cmd , commands} = require('../command')

cmd({ pattern: "vv3", react: "✅", desc: "read vv", category: "download", filename: __filename }, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    const viewOnceData = mek.msg.contextInfo?.quotedMessage?.viewOnceMessageV2;
    if (viewOnceData) {
      if (viewOnceData.message.imageMessage) {
        console.log("Quoting an image");
        let caption = viewOnceData.message.imageMessage.caption || '';
        let savedPath = await conn.downloadAndSaveMediaMessage(viewOnceData.message.imageMessage);
        return conn.sendMessage(sender, { image: { url: savedPath }, caption: `${caption}\n\nPOWERD BY MR-JERRY` });
      } else if (viewOnceData.message.videoMessage) {
        let caption = viewOnceData.message.videoMessage.caption || '';
        let savedPath = await conn.downloadAndSaveMediaMessage(viewOnceData.message.videoMessage);
        return conn.sendMessage(sender, { video: { url: savedPath }, caption: `${caption}\n\nPOWERD BY MR JERRY` });
      } else if (viewOnceData.message.audioMessage) {
        let savedPath = await conn.downloadAndSaveMediaMessage(viewOnceData.message.audioMessage);
        return conn.sendMessage(sender, { audio: { url: savedPath }, mimetype: "audio/ogg; codecs=opus" });
      }
    } else if (quoted) {
      if (quoted.mtype === "viewOnceMessage") {
        console.log("Processing a ViewOnce message");
        if (quoted.message.imageMessage) {
          let caption = quoted.message.imageMessage.caption || '';
          let savedPath = await conn.downloadAndSaveMediaMessage(quoted.message.imageMessage);
          return conn.sendMessage(sender, { image: { url: savedPath }, caption: `${caption}\n\nPOWERD BY MR-JERRY` });
        } else if (quoted.message.videoMessage) {
          let caption = quoted.message.videoMessage.caption || '';
          let savedPath = await conn.downloadAndSaveMediaMessage(quoted.message.videoMessage);
          return conn.sendMessage(sender, { video: { url: savedPath }, caption: `${caption}\n\nPOWERD BY MR_JERRY` });
        } else if (quoted.message.audioMessage) {
          let savedPath = await conn.downloadAndSaveMediaMessage(quoted.message.audioMessage);
          return conn.sendMessage(sender, { audio: { url: savedPath }, mimetype: "audio/ogg; codecs=opus" });
        }
      } else if (quoted.message && quoted.message.audioMessage && quoted.message.audioMessage.viewOnce) {
        console.log("ᴅᴇᴄᴛᴇᴅ ᴏɴᴇ ᴠɪᴇᴡ ᴀᴜᴅɪᴏ");
        let mediaPath = await conn.downloadAndSaveMediaMessage(quoted.message.audioMessage);
        const mediaObject = { url: mediaPath };
        const response = { audio: mediaObject, mimetype: "audio/ogg; codecs=opus" };
        return conn.sendMessage(sender, response);
      } else {
        return reply("This is not a ViewOnce message");
      }
    } else {
      return reply("Please reply to a ViewOnce message");
    }
  } catch (error) {
    console.log("Error processing viewOnce message:", error);
  }
});
