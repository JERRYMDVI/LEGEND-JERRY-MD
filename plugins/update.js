/*const { cmd } = require("../command");
const axios = require('axios');
const fs = require('fs');
const path = require("path");
const AdmZip = require("adm-zip");
const { setCommitHash, getCommitHash } = require('../silentlover/SILENT-SOBX-MD');

cmd({
    pattern: "update",
    alias: ["upgrade", "sync"],
    react: '🆕',
    desc: "Update the bot to the latest version.",
    category: "misc",
    filename: __filename
}, async (client, message, args, { reply, isOwner }) => {
    if (!isOwner) return reply("This command is only for the bot owner.");

    try {
        await reply("*_🔍 CHECKING UPDATES FOR LEGEND-JERRY-MD..🚀_*");

        // Fetch the latest commit hash from GitHub
        const { data: commitData } = await axios.get("https://api.github.com/repos/JERRYMDV1/LEGEND JERRY-MD/commits/main");
        const latestCommitHash = commitData.sha;

        // Get the stored commit hash from the database
        const currentHash = await getCommitHash();

        if (latestCommitHash === currentHash) {
            return reply("*_✅ LEGEND-JERRY-MD IS ALREADY UP-TO-DATE...🚀_*");
        }

        await reply("*_🌐 UPDATING LEGEND-JERRY-MD PLEASE WAIT...🚀_*");

        // Download the latest code
        const zipPath = path.join(__dirname, "latest.zip");
        const { data: zipData } = await axios.get("https://github.com/JERRYMDV1/LEGEND-JERRY-MD/archive/main.zip", { responseType: "arraybuffer" });
        fs.writeFileSync(zipPath, zipData);

        // Extract ZIP file
        await reply("*_📦 EXTRACTING THE LATEST FILES...🚀_*");
        const extractPath = path.join(__dirname, 'latest');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(extractPath, true);

        // Copy updated files, preserving config.js and app.json
        await reply("*_🔄 REPLACING FILES...🚀_*");
        const sourcePath = path.join(extractPath, "LEGEND-JERRY-MDmain");
        const destinationPath = path.join(__dirname, '..');
        copyFolderSync(sourcePath, destinationPath);

        // Save the latest commit hash to the database
        await setCommitHash(latestCommitHash);

        // Cleanup
        fs.unlinkSync(zipPath);
        fs.rmSync(extractPath, { recursive: true, force: true });

        await reply("*_✅ UPDATE COMPLETE! RESTARTING YOUR BOT...🚀_*");
        process.exit(0);
    } catch (error) {
        console.error("Update error:", error);
        return reply("❌ Update failed. Please try manually.");
    }
});

// Helper function to copy directories while preserving config.js and app.json
function copyFolderSync(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    const items = fs.readdirSync(source);
    for (const item of items) {
        const srcPath = path.join(source, item);
        const destPath = path.join(target, item);

        // Skip config.js and app.json
        if (item === "config.js" || item === "app.json") {
            console.log(`Skipping ${item} to preserve custom settings.`);
            continue;
        }

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}
*/
