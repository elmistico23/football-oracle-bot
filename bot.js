require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN; // Legge da Render.com
const bot = new TelegramBot(token, {polling: true});

// Database semplice per le carte (puoi espanderlo)
const cards = [
  {
    id: 1,
    name: "⚽ IL BOMBER",
    text: "Oggi segnerai un gol da fuori area!",
    image: "https://i.imgur.com/9ZqQY7u.jpg",
    rules: {
      team: { "Juve": "Tira come Del Piero nel 2006!", "Milan": "Gol alla Shevchenko!" },
      mood: { "nervoso": "Respira e concentrati come Ronaldo" }
    }
  },
  {
    id: 2,
    name: "🛡️ LA VARANNA",
    text: "Attenzione ai rigori contro!",
    image: "https://i.imgur.com/5jXWvB3.jpg",
    rules: {
      team: { "Roma": "Niente rigori come contro l'Oporto!", "Inter": "VAR in tuo favore come nel derby 2022" }
    }
  }
];

// Comando /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔮 *Benvenuto nell'Oracolo del Calcio!*\nUsa /carta per pescare la tua predizione", {parse_mode: 'Markdown'});
});

// Comando /carta
bot.onText(/\/carta/, (msg) => {
  const user = msg.from;
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  
  let response = `*${randomCard.name}*\n${randomCard.text}`;
  
  // Aggiungi testo personalizzato se l'utente ha specificato una squadra
  if (msg.text.includes("Juve")) response += `\n\n${randomCard.rules.team.Juve}`;
  if (msg.text.includes("Milan")) response += `\n\n${randomCard.rules.team.Milan}`;
  
  // Invia la carta con immagine
  bot.sendPhoto(msg.chat.id, randomCard.image, { 
    caption: response,
    parse_mode: 'Markdown'
  });
});

// Keep-alive per Render (fondamentale!)
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot attivo!'));
app.listen(process.env.PORT || 3000, () => console.log("Server running"));

console.log("⚡ Bot avviato con successo!");
