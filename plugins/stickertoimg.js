const config = require('../config');
const { cmd } = require('../command');
const { getRandom } = require('../lib/functions');
var imgmsg = '';
if (config.LANG === 'SI') imgmsg = 'ස්ටිකර් එකකට mention දෙන්න!';
else imgmsg = 'ʀᴇᴘʟʏ ᴛᴏ ᴀ sᴛɪᴄᴋᴇʀ ғᴏʀ ɪᴍᴀɢᴇ!';
var descg = '';
if (config.LANG === 'SI') descg = 'එය ඔබගේ mention දුන් ස්ටිකර් එක ඡායාරූපයක් බවට පරිවර්තනය කරයි.';
else descg = 'ɪᴛ ᴄᴏɴᴠᴇʀᴛs ʏᴏᴜʀ ʀᴇᴘʟɪᴇᴅ sᴛɪᴄᴋᴇʀ ᴛᴏ ɪᴍᴀɢᴇ.';

cmd({
  pattern: 'toimg',
  react: '📸',
  alias: ['tophoto'],
  desc: descg,
  category: 'convert',
  use: '.toimg <Reply to sticker>',
  filename: __filename
}, async (conn, mek, m, { from, reply, isCmd, command, args, q, isGroup, pushname }) => {
  try {
    const isQuotedSticker = m.quoted && m.quoted.type === 'stickerMessage';
    if (isQuotedSticker) {
      const nameWebp = getRandom('.webp');
      const stickerBuffer = await m.quoted.download();
      await require('fs').promises.writeFile(nameWebp, stickerBuffer);
      await conn.sendMessage(from, { image: { url: nameWebp } }, { quoted: mek });
    } else {
      return await reply(imgmsg);
    }
  } catch (e) {
    reply('Error !!');
    console.error(e);
  }
});
