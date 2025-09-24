/*created by Silent_killer469 🕵
contact me 923130433361♻️
© Copy coder alert ⚠
*/const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js'); 

// play

cmd({ 
     pattern: "play", 
     alias: ["song", "audio"], 
     react: "🎶", 
     desc: "Download Youtube song",
     category: "main", 
     use: '.play < Yt url or Name >', 
     filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        if (!q) return await reply("❌ Please provide a YouTube URL or song name.");

        // API URL
        let apiUrl = `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(q)}`;

        let response = await fetch(apiUrl);
        let data = await response.json();

        if (data.status !== 200 || !data.result || !data.result.download?.url) {
            return reply("⚠️ Failed to fetch the audio. Please try again later.");
        }

        let meta = data.result.metadata;
        let dl = data.result.download;

        let ytmsg = `*🎧 DARK-SILENCE-MD YT MP3 DOWNLOADER 🎧*
        
╭━━❐━⪼
┇๏ *Title* - ${meta.title}
┇๏ *Duration* - ${meta.timestamp}
┇๏ *Views* - ${meta.views}
┇๏ *Author* - ${meta.author?.name || "JERRY-MD"} 
╰━━❑━⪼
> *© POWERD BY JERRY_MD♡*`;

        // Send song details
        await conn.sendMessage(from, { image: { url: meta.image || meta.thumbnail }, caption: ytmsg }, { quoted: mek });

        // Send audio file
        await conn.sendMessage(from, { audio: { url: dl.url }, mimetype: "audio/mpeg" }, { quoted: mek });

        // Send document file
        await conn.sendMessage(from, { 
            document: { url: dl.url }, 
            mimetype: "audio/mpeg", 
            fileName: dl.filename || `${meta.title}.mp3`, 
            caption: `> *© POWERD BY JERRY_MD♡*`
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("❌ An error occurred. Please try again later.");
    }
});
