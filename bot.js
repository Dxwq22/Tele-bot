const { Telegraf, Markup } = require("telegraf");
const fs = require("fs");

// Token bot lu dari BotFather
const bot = new Telegraf("7755246903:AAGZV5dy1Sosm4Ty-tuK-QToQuqR3k956Uw");

// Nama custom buat "Diteruskan dari"
const verifiedName = "𝕯 𝕴 𝕶 𝖅 𝐒 𝐓 𝐎 𝐑 𝐄";

// Path video yang mau dikirim
const videoPath = "/sdcard/Tele/Shoyu_small1.mp4"; // Sesuaikan path-nya

bot.start((ctx) => ctx.reply("Halo! Bot lu udah jalan!"));
bot.help((ctx) => ctx.reply("Ketik /start buat mulai."));

bot.on("text", async (ctx) => {
    const text = ctx.message.text;

    if (text === ".menu") {
        if (fs.existsSync(videoPath)) {
            // Kirim video + caption
            await ctx.sendVideo(
                { source: videoPath },
                {
                    caption: `❐ *${verifiedName}* ❐\n\nWelcome sir, Is there anything I can help?`,
                    parse_mode: "Markdown",
                    reply_to_message_id: ctx.message.message_id, // Biar nge-reply langsung ke chat user
                }
            );

            // Kirim tombol dalam pesan terpisah
            await ctx.reply("Silakan pilih opsi:", {
                reply_markup: Markup.inlineKeyboard([
                    [Markup.button.callback("Opsi 1", "opsi_1")],
                    [Markup.button.callback("Opsi 2", "opsi_2")],
                    [Markup.button.callback("Opsi 3", "opsi_3")],
                ]),
            });
        } else {
            ctx.reply("⚠ Video *Shoyu_small1.mp4* nggak ditemukan!");
        }
    } else {
        ctx.replyWithMarkdown(`❐ *${verifiedName}* ❐\n\nLu bilang: *${text}*`, {
            reply_to_message_id: ctx.message.message_id, // Biar nge-reply langsung
        });
    }
});

// Event buat handle tombol menu
bot.action("opsi_1", (ctx) => ctx.reply("Lu pilih Opsi 1"));
bot.action("opsi_2", (ctx) => ctx.reply("Lu pilih Opsi 2"));
bot.action("opsi_3", (ctx) => ctx.reply("Lu pilih Opsi 3"));

bot.launch();
console.log("Bot Telegram udah jalan...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));