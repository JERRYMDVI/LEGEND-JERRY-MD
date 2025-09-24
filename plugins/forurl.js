const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

cmd({
  pattern: "url9",
  desc: "Convert image to URL",
  category: "tools",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    const isQuotedImage = m.quoted && (m.quoted.type === 'imageMessage' || (m.quoted.type === 'viewOnceMessage' && m.quoted.msg.type === 'imageMessage'));

    if ((m.type === 'imageMessage') || isQuotedImage) {
      const imageBuffer = isQuotedImage ? await m.quoted.download() : await m.download();
      const imgFilePath = `./${Date.now()}.jpg`;
      fs.writeFileSync(imgFilePath, imageBuffer);

      const form = new FormData();
      form.append('file', fs.createReadStream(imgFilePath));

      axios.post('https://telegra.ph/upload', form, { headers: form.getHeaders() })
        .then(res => {
          const imageUrl = `https://telegra.ph${res.data[0].src}`;
          conn.sendMessage(mek.chat, { text: imageUrl });
          fs.unlinkSync(imgFilePath);
        })
        .catch(err => {
          console.error(err.message);
          reply("An error occurred while uploading image");
          fs.unlinkSync(imgFilePath);
        });
    } else {
      reply("Please send or reply to an image");
    }
  } catch (error) {
    console.log(error);
    return reply("An error occurred while uploading image");
  }
});
