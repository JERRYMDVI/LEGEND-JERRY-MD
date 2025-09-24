const axios = require('axios');
const { cmd } = require('../command');
cmd({
    pattern: "ss",
    alias: ["ssweb"],
    react: '👽',
    desc: "Download ss of a given link.",
    category: "other",
    use: '.ss <link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get(`https://api.davidcyriltech.my.id/ssweb?url=${q}`)
let wm = `*_•||•JERRY-MD WEB SS DOWNLOADER•||•_*

> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ-ᴊᴇʀʀʏ*`
await conn.sendMessage(from, { image: { url: res.data.screenshotUrl }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
});
