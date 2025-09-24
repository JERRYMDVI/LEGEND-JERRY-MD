const { sendVideo } = require('../lib/msg');

const romanticQuotes = [
  "محبت ایک خوبصورت احساس ہے، جو دل کو چھو لیتا ہے ❤️",
  "تم ہو تو ہر لمحہ حسین ہے 💖",
  "تیری مسکراہٹ دل کو بہا لے جاتی ہے 💘",
  "محبت وہ نہیں جو لفظوں میں ظاہر ہو، محبت وہ ہے جو خاموشی میں نظر آئے 💞",
  "جب تم ساتھ ہوتے ہو، دنیا اور بھی خوبصورت لگتی ہے 🌹",
  "میری دنیا تم سے شروع اور تم پر ختم ہوتی ہے 🥰",
  "تم ہو، تب ہی تو میں ہوں 💓",
  "تیرا نام لبوں پر آتے ہی دل مسکرا اٹھتا ہے 😍"
];

const romanticVideos = [
  "https://cdn.pixabay.com/vimeo/837827123-romantic1.mp4?width=640&hash=abc111",
  "https://cdn.pixabay.com/vimeo/837827124-romantic2.mp4?width=640&hash=abc112",
  "https://cdn.pixabay.com/vimeo/837827125-romantic3.mp4?width=640&hash=abc113",
  "https://cdn.pixabay.com/vimeo/837827126-romantic4.mp4?width=640&hash=abc114",
  "https://cdn.pixabay.com/vimeo/837827127-romantic5.mp4?width=640&hash=abc115"
];

module.exports = {
  name: ["kumaran", "love", "shayari", "couple"],
  description: "Send a romantic video with a lovely quote",
  category: "romantic",
  async execute(m, { conn }) {
    const quote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
    const videoUrl = romanticVideos[Math.floor(Math.random() * romanticVideos.length)];
    await sendVideo(conn, m, videoUrl, quote);
  }
};
