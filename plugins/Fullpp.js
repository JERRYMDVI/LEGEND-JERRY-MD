const config = require('../config'); 
const { cmd } = require('../command'); 
const { getBuffer } = require('../lib/functions'); 
const Jimp = require('jimp'); 

cmd({ 
  pattern: "fullpp", 
  react: "🖼️", 
  desc: "Set full image as bot's profile picture", 
  category: "tools", 
  filename: __filename 
}, async (conn, mek, m) => { 
  try { 
    const isQuotedImage = m.quoted && (m.quoted.type === 'imageMessage' || (m.quoted.type === 'viewOnceMessage' && m.quoted.msg.type === 'imageMessage')); 
    if (!isQuotedImage) { 
      return m.reply('⚠️ *please reply to an img or mention any photo..*'); 
    } 
    m.reply('⏳ *𝐘𝐎𝐔𝐑 𝐏𝐑𝐎𝐅𝐈𝐋𝐄 𝐔𝐏𝐃𝐀𝐓𝐈𝐍𝐆 𝐁𝐘 𝐉𝐄𝐑𝐑𝐘-𝐌𝐃, please wait...*'); 
    const imageBuffer = await m.quoted.download(); 
    const image = await Jimp.read(imageBuffer); 
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG); 
    await conn.updateProfilePicture(conn.user.id, buffer); 
    m.reply('✅ *your profile successfully upgraded wia JERRY-MD!*'); 
  } catch (err) { 
    console.error(err); 
    m.reply(`❌ *Error:* ${err.message}`); 
  } 
});
