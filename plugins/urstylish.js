const stylishCMD = (text) => {
  let stylishText = '';
  for (let i = 0; i < text.length; i++) {
    stylishText += text[i] + 'ـــّْ͢ـ ';
  }
  return stylishText;
};

const stylishCMD2 = (text) => {
  let stylishText = '';
  for (let i = 0; i < text.length; i++) {
    stylishText += text[i] + '͜ـؔـ ';
  }
  return stylishText;
};

const stylishCMD3 = (text) => {
  let stylishText = '';
  for (let i = 0; i < text.length; i++) {
    stylishText += text[i] + 'ـــْـ';
  }
  return stylishText;
};

const { cmd } = require('../command');

cmd({
  pattern: "stylish",
  desc: "Create stylish text",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply("Please provide some text");

    let stylishText = stylishCMD(q);
    let stylishText2 = stylishCMD2(q);
    let stylishText3 = stylishCMD3(q);

    await conn.sendMessage(mek.chat, { text: `*Stylish Text 1:*\n${stylishText}` });
    await conn.sendMessage(mek.chat, { text: `*Stylish Text 2:*\n${stylishText2}` });
    await conn.sendMessage(mek.chat, { text: `*Stylish Text 3:*\n${stylishText3}` });

  } catch (error) {
    console.log(error);
    return reply("An error occurred while creating stylish text");
  }
});
