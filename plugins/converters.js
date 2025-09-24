const config = require('../config');
const { cmd } = require('../command');
const { getRandom } = require('../lib/functions');

var voicemsg = '';
if (config.LANG === 'SI') voicemsg = 'ශ්රව්‍ය එකකට mention දෙන්න!';
else voicemsg = 'ʀᴇᴘʟʏ ᴛᴏ ᴀɴ ᴀᴜᴅɪᴏ ғᴏʀ ᴠᴏɪᴄᴇ ɴᴏᴛᴇ!';
var descgvoice = '';
if (config.LANG === 'SI') descgvoice = 'එය ඔබගේ mention දුන් ශ්රව්‍ය එක වොයිස් නෝට් එකක් බවට පරිවර්තනය කරයි.';
else descgvoice = 'ɪᴛ ᴄᴏɴᴠᴇʀᴛs ʏᴏᴜʀ ʀᴇᴘʟɪᴇᴅ ᴀᴜᴅɪᴏ ᴛᴏ ᴠᴏɪᴄᴇ ɴᴏᴛᴇ.';

cmd({
  pattern: 'tovoice',
  react: '🎤',
  alias: ['voice'],
  desc: descgvoice,
  category: 'convert',
  use: '.tovoice <Reply to audio>',
  filename: __filename
}, async (conn, mek, m, { from, reply, isCmd, command, args, q, isGroup, pushname }) => {
  try {
    const isQuotedAudio = m.quoted && m.quoted.type === 'audioMessage';
    if (isQuotedAudio) {
      const audioBuffer = await m.quoted.download();
      await conn.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: mek });
    } else {
      return await reply(voicemsg);
    }
  } catch (e) {
    reply('Error !!');
    console.error(e);
  }
});
