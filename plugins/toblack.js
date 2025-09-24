const config = require('../config');
const { cmd } = require('../command');
const { getRandom } = require('../lib/functions');
const child_process = require('child_process');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const videomsg = config.LANG === 'SI' ? 'GIF ස්ටිකර් එකකට mention දෙන්න!' : 'ʀᴇᴘʟʏ ᴛᴏ ᴀ ɢɪғ sᴛɪᴄᴋᴇʀ ғᴏʀ ᴠɪᴅᴇᴏ!';
const descgvideo = config.LANG === 'SI' ? 'එය ඔබගේ mention දුන් GIF ස්ටිකර් එක වීඩියෝ එකක් බවට පරිවර්තනය කරයි.' : 'ɪᴛ ᴄᴏɴᴠᴇʀᴛs ʏᴏᴜʀ ʀᴇᴘʟɪᴇᴅ ɢɪғ sᴛɪᴄᴋᴇʀ ᴛᴏ ᴠɪᴅᴇᴏ.';

cmd({
  pattern: 'tovideo',
  react: '📹',
  alias: ['togifvideo'],
  desc: descgvideo,
  category: 'convert',
  use: '.tovideo <Reply to gif sticker>',
  filename: __filename
}, async (conn, mek, m, { from, reply, isCmd, command, args, q, isGroup, pushname }) => {
  try {
    const isQuotedSticker = m.quoted && m.quoted.type === 'stickerMessage';
    if (isQuotedSticker) {
      const stickerBuffer = await m.quoted.download();
      fs.writeFileSync('sticker.webp', stickerBuffer);

      ffmpeg()
        .inputOptions('-f', 'webp')
        .input('sticker.webp')
        .outputOptions('-c:v libx264')
        .outputOptions('-pix_fmt yuv420p')
        .output('output.mp4')
        .on('end', async () => {
          await conn.sendMessage(from, { video: fs.readFileSync('output.mp4'), mimetype: 'video/mp4' }, { quoted: mek });
          fs.unlinkSync('sticker.webp');
          fs.unlinkSync('output.mp4');
        })
        .on('error', (err) => {
          console.error(err);
          reply('Error !!');
        })
        .run();
    } else {
      return await reply(videomsg);
    }
  } catch (e) {
    reply('Error !!');
    console.error(e);
  }
});


const blackmsg = config.LANG === 'SI' ? 'ශ්රව්‍ය එකකට mention දෙන්න!' : 'ʀᴇᴘʟʏ ᴛᴏ ᴀɴ ᴀᴜᴅɪᴏ ғᴏʀ ʙʟᴀᴄᴋ ᴠɪᴅᴇᴏ!';
const descgblack = config.LANG === 'SI' ? 'එය ඔබගේ mention දුන් ශ්රව්‍ය එක බ්ලැක් වීඩියෝ එකක් බවට පරිවර්තනය කරයි.' : 'ɪᴛ ᴄᴏɴᴠᴇʀᴛs ʏᴏᴜʀ ʀᴇᴘʟɪᴇᴅ ᴀᴜᴅɪᴏ ᴛᴏ ʙʟᴀᴄᴋ ᴠɪᴅᴇᴏ.';

cmd({
  pattern: 'toblack',
  react: '📹',
  alias: ['black'],
  desc: descgblack,
  category: 'convert',
  use: '.toblack <Reply to audio>',
  filename: __filename
}, async (conn, mek, m, { from, reply, isCmd, command, args, q, isGroup, pushname }) => {
  try {
    const isQuotedAudio = m.quoted && m.quoted.type === 'audioMessage';
    if (isQuotedAudio) {
      const audioBuffer = await m.quoted.download();
      fs.writeFileSync('audio.mp3', audioBuffer);

      ffmpeg()
        .input('color=c=black:s=640x480:r=30')
        .input('audio.mp3')
        .outputOptions('-map 0:v')
        .outputOptions('-map 1:a')
        .outputOptions('-c:v libx264')
        .outputOptions('-c:a aac')
        .output('output.mp4')
        .on('end', async () => {
          await conn.sendMessage(from, { video: fs.readFileSync('output.mp4'), mimetype: 'video/mp4' }, { quoted: mek });
          fs.unlinkSync('audio.mp3');
          fs.unlinkSync('output.mp4');
        })
        .on('error', (err) => {
          console.error(err);
          reply('Error !!');
        })
        .run();
    } else {
      return await reply(blackmsg);
    }
  } catch (e) {
    reply('Error !!');
    console.error(e);
  }
});
