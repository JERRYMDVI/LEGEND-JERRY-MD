// facebook.js
const { cmd } = require('../command');
const { igdl } = require('ruhend-scraper');

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "To download Facebook videos.",
  category: "downloader",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a valid Facebook URL!");

    // React while processing
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

    let result;
    try {
      result = await igdl(q); // Ruhend scraper call
    } catch (e) {
      return reply("❌ Error obtaining data.");
    }

    if (!result || result.length === 0) {
      return reply("❌ No data found.");
    }

    // Find video in HD or SD
    const video = result.find(v => v.resolution === "720p (HD)") ||
                  result.find(v => v.resolution === "360p (SD)");

    if (!video) return reply("❌ No result found.");

    // Success reaction
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    // Send the video
    await conn.sendMessage(m.chat, {
      video: { url: video.url },
      caption: "> *© Created by MR-JERRY*",
      fileName: "facebook.mp4",
      mimetype: "video/mp4"
    }, { quoted: m });

  } catch (err) {
    console.error("Facebook Error:", err);
    reply("❌ Error downloading video.");
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
});
