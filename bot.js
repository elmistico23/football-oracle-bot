require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// 1. Controllo del token (usa SOLO 'TOKEN' come nome variabile)
const token = process.env.TOKEN;
if (!token) {
  console.error("❌ ERRORE: Token non trovato in process.env.TOKEN");
  console.log("ℹ️ Configuralo in Render.com > Environment come variabile 'TOKEN'");
  process.exit(1);
}

// 2. Avvio bot (debug sicuro)
console.log("🔑 Token rilevato (iniziale):", token.substring(0, 5) + "...");
const bot = new TelegramBot(token, { polling: true });

// 3. Comando test
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ Bot funzionante! Il tuo ID: " + msg.chat.id);
});

// 4. Keep-alive per Render
require('express')()
  .get('/', (req, res) => res.send('Bot attivo'))
  .listen(process.env.PORT || 3000);

// Database delle carte con immagini reali (URL pubblici)
const cards = [
  // 1-11: GIOCATORI ICONICI
  {
    id: 1,
    name: "⚽ IL BOMBER",
    orientations: {
      upright: {
        text: "HAT-TRICK IN ARRIVO! Oggi segnerai 3 gol come Batistuta nel '94",
        image: "https://i.imgur.com/RuBzYDq.jpg"
      },
      reversed: {
        text: "SCIMMIOTTATE IN ATTACCO! Come Vieri al Mondiale 2002: tiri ma zero gol",
        image: "https://i.imgur.com/4tR7y9k.jpg"
      }
    },
    teamRules: {
      "Juve": "Stile Trezeguet in Juve-Roma 2005",
      "Milan": "Come Inzaghi in finale Champions 2007",
      "Inter": "Mode Ronaldo vs Lazio nel '98"
    }
  },
  {
    id: 2,
    name: "🛡️ LA VARANNA",
    orientations: {
      upright: {
        text: "RIGORE REGALATO! Come per Materazzi in Italia-Germania 2006",
        image: "https://i.imgur.com/JQmQk0d.jpg"
      },
      reversed: {
        text: "ROSSO INGRiUSTO! Stile Materazzi a Zidane nel 2006",
        image: "https://i.imgur.com/MpBqX0L.jpg"
      }
    },
    teamRules: {
      "Roma": "Come l'episodio Shakhtar 2011",
      "Lazio": "Rigore annullato alla Juve nel 2018"
    }
  },
  {
    id: 3,
    name: "👟 IL DRIBBLONE",
    orientations: {
      upright: {
        text: "DRIBBLING DA URLO! Come Maradona contro l'Inghilterra '86",
        image: "https://i.imgur.com/7v2KQ3W.jpg"
      },
      reversed: {
        text: "TROPPA ESPOSIZIONE! Come Balotelli che perde palloni",
        image: "https://i.imgur.com/q1XpF9d.jpg"
      }
    },
    teamRules: {
      "Napoli": "Stile Insigne contro la Juve 2020",
      "Roma": "Come Totti al Bernabeu 2002"
    }
  },
  {
    id: 4,
    name: "🧤 IL MURO",
    orientations: {
      upright: {
        text: "PARATA DA RECORD! Come Buffon in Italia-Germania 2006",
        image: "https://i.imgur.com/Vn4zGxr.jpg"
      },
      reversed: {
        text: "PAPERA STORICA! Come Taffarel in Coppa Italia '99",
        image: "https://i.imgur.com/9Y2LZj3.jpg"
      }
    },
    teamRules: {
      "Juve": "Performance alla Buffon 2003",
      "Milan": "Come Dida in Champions 2003"
    }
  },
  {
    id: 5,
    name: "🎯 IL CECCHINO",
    orientations: {
      upright: {
        text: "RIGORE PERFETTO! Come Baggio in finale Mondiale '94",
        image: "https://i.imgur.com/5jXWvB3.jpg"
      },
      reversed: {
        text: "RIGORE SBAGLIATO! Come Baggio che sbaglia contro la Francia",
        image: "https://i.imgur.com/8Km9t0A.png"
      }
    },
    teamRules: {
      "Juve": "Stile Del Piero su punizione",
      "Roma": "Come Totti dal dischetto"
    }
  },
  {
    id: 6,
    name: "🏃 IL FULMINE",
    orientations: {
      upright: {
        text: "CONTROPiede DA URLO! Come Mbappé contro l'Argentina 2018",
        image: "https://i.imgur.com/L8n7dOy.jpg"
      },
      reversed: {
        text: "FUORIGIOCO CRUENTO! Come Inzaghi annullato nel derby 2005",
        image: "https://i.imgur.com/4kRZNfZ.jpg"
      }
    },
    teamRules: {
      "Inter": "Stile Eto'o in Champions 2010",
      "Lazio": "Mode Immobile in contropiede"
    }
  },
  // 7-11 ALTRI GIOCATORI
  {
    id: 7,
    name: "🤕 L'INFORTUNATO",
    orientations: {
      upright: {
        text: "REDENZIONE! Torni più forte come Ronaldo nel 2002",
        image: "https://i.imgur.com/9ZqQY7u.jpg"
      },
      reversed: {
        text: "INFORTUNIO IN ARRIVO! Come Van Basten ritiratosi a 28 anni",
        image: "https://i.imgur.com/5D6wKbP.jpg"
      }
    }
  },
  {
    id: 8,
    name: "👑 IL REGISTA",
    orientations: {
      upright: {
        text: "ASSIST DA LEGGENDA! Come Pirlo a Grosso nel 2006",
        image: "https://i.imgur.com/3m7VtYc.jpg"
      },
      reversed: {
        text: "GIOCO OPACO! Come Xavi in una rara giornata no",
        image: "https://i.imgur.com/Vn4zGxr.jpg"
      }
    }
  },
  {
    id: 9,
    name: "💥 IL CANNONIERE",
    orientations: {
      upright: {
        text: "TIRO DA 30 METRI! Come Adriano contro l'Inter nel 2005",
        image: "https://i.imgur.com/7v2KQ3W.jpg"
      },
      reversed: {
        text: "TIRO A FANALINO! Come Roberto Carlos che sbaglia un rigore",
        image: "https://i.imgur.com/q1XpF9d.jpg"
      }
    }
  },
  {
    id: 10,
    name: "🧠 IL TATTICO",
    orientations: {
      upright: {
        text: "POSIZIONAMENTO PERFETTO! Come Busquets che legge il gioco",
        image: "https://i.imgur.com/JQmQk0d.jpg"
      },
      reversed: {
        text: "DISPOSIZIONE SBAGLIATA! Come una difesa a 3 contro il 4-3-3",
        image: "https://i.imgur.com/MpBqX0L.jpg"
      }
    }
  },
  {
    id: 11,
    name: "😤 L'ARRAFFATO",
    orientations: {
      upright: {
        text: "TIGRE IN CAMPO! Stile Gattuso in finale Champions 2003",
        image: "https://i.imgur.com/5jXWvB3.jpg"
      },
      reversed: {
        text: "ROSSO IN ARRIVO! Come Materazzi che provoca Zidane",
        image: "https://i.imgur.com/8Km9t0A.png"
      }
    }
  },
  // 12-22: EVENTI/FATTORI ESTERNI
  {
    id: 12,
    name: "🌧️ PIOGGIA TORRENZIALE",
    orientations: {
      upright: {
        text: "VANTAGGIO! Come la Juve che vince 3-0 nel fango nel '97",
        image: "https://i.imgur.com/5D6wKbP.jpg"
      },
      reversed: {
        text: "DISASTRO! Campo impraticabile come Milan-Udinese 2001",
        image: "https://i.imgur.com/3m7VtYc.jpg"
      }
    }
  },
  {
    id: 13,
    name: "🕺 TIFOSI IN TRANCE",
    orientations: {
      upright: {
        text: "12° UOMO! Come la Fossa dei Leoni nel Milan-Inter 3-0",
        image: "https://i.imgur.com/L8n7dOy.jpg"
      },
      reversed: {
        text: "FISCHI ASSORDANTI! Come Totti che lascia la Roma nel 2017",
        image: "https://i.imgur.com/4kRZNfZ.jpg"
      }
    }
  },
  {
    id: 14,
    name: "⚡ RISCALDAMENTO SCADENTE",
    orientations: {
      upright: {
        text: "SORPRESA! Come Del Piero che segna da freddo nel '96",
        image: "https://i.imgur.com/9ZqQY7u.jpg"
      },
      reversed: {
        text: "CATASTROFE! Come Neymar che si infortuna in riscaldamento",
        image: "https://i.imgur.com/5D6wKbP.jpg"
      }
    }
  },
  {
    id: 15,
    name: "🍀 FESTA IN CITTA'",
    orientations: {
      upright: {
        text: "ENERGIA POSITIVA! Come il Napoli che vince dopo 33 anni",
        image: "https://i.imgur.com/3m7VtYc.jpg"
      },
      reversed: {
        text: "DISTRAZIONE FATALE! Come la Roma prima di 7-1 col Man Utd",
        image: "https://i.imgur.com/Vn4zGxr.jpg"
      }
    }
  },
  {
    id: 16,
    name: "👨‍⚕️ INFORTUNIO AVVERSARIO",
    orientations: {
      upright: {
        text: "SVANTAGGIO AVVERSARIO! Come senza Neymar al PSG 2021",
        image: "https://i.imgur.com/7v2KQ3W.jpg"
      },
      reversed: {
        text: "RISCHIO SOVRAccarico! Come succede spesso alla Roma",
        image: "https://i.imgur.com/q1XpF9d.jpg"
      }
    }
  },
  {
    id: 17,
    name: "🎆 NOTTE MAGICA",
    orientations: {
      upright: {
        text: "IMPresa STORICA! Come il Chelsea in Champions 2012",
        image: "https://i.imgur.com/JQmQk0d.jpg"
      },
      reversed: {
        text: "INCUBO! Come la Juve contro il Milan nel 2003 (rigori)",
        image: "https://i.imgur.com/MpBqX0L.jpg"
      }
    }
  },
  {
    id: 18,
    name: "📉 CALO FINALE",
    orientations: {
      upright: {
        text: "RIMONTA EPICA! Come Liverpool-Barcellona 4-0",
        image: "https://i.imgur.com/5jXWvB3.jpg"
      },
      reversed: {
        text: "COLLASSO! Come la Lazio contro il Bologna nel 2019",
        image: "https://i.imgur.com/8Km9t0A.png"
      }
    }
  },
  {
    id: 19,
    name: "🤬 DERBY SANGUINOSO",
    orientations: {
      upright: {
        text: "GARA DA LEGGENDA! Come Inter-Juve 3-2 del 2018",
        image: "https://i.imgur.com/L8n7dOy.jpg"
      },
      reversed: {
        text: "ROSSI A GO-GO! Come Roma-Lazio 2004 (5 espulsi)",
        image: "https://i.imgur.com/4kRZNfZ.jpg"
      }
    }
  },
  {
    id: 20,
    name: "🧨 ESPULSIONE IN DIRETTA",
    orientations: {
      upright: {
        text: "VANTAGGIO NUMERICO! Come la Juve contro l'Inter nel 2009",
        image: "https://i.imgur.com/9ZqQY7u.jpg"
      },
      reversed: {
        text: "ROSSO PER TE! Come Zidane in finale Mondiale",
        image: "https://i.imgur.com/5D6wKbP.jpg"
      }
    }
  },
  {
    id: 21,
    name: "🥅 PALO MALEDETTO",
    orientations: {
      upright: {
        text: "Fortuna ti assiste! Come il palo che salva Buffon nel 2006",
        image: "https://i.imgur.com/3m7VtYc.jpg"
      },
      reversed: {
        text: "SFORTUNA CRUEL! Come la Juve che ha 3 pali contro il Porto",
        image: "https://i.imgur.com/Vn4zGxr.jpg"
      }
    }
  },
  {
    id: 22,
    name: "🎰 COLPO DI SCENA",
    orientations: {
      upright: {
        text: "GOL ALL'ULTIMO! Come Sergio Ramos nel 2014",
        image: "https://i.imgur.com/7v2KQ3W.jpg"
      },
      reversed: {
        text: "TRAGEDIA! Come la Juve che perde 6-1 in Coppa UEFA",
        image: "https://i.imgur.com/q1XpF9d.jpg"
      }
    }
  }
];


// EMOJI ANIMATE
const loadingEmojis = ["🔮", "🌀", "✨"];

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 
    `*Benvenuto nell'Oracolo del Calcio!*\n\nScrivi:\n/carta - Pesca una predizione\n/squadra [nome] - Imposta la tua squadra\nEs: "/squadra Juve"`,
    {parse_mode: 'Markdown'}
  );
});

// PESCA CON EFFETTO DRAMMATICO
bot.onText(/\/carta/, async (msg) => {
  const chatId = msg.chat.id;
  const loadingMsg = await bot.sendMessage(chatId, "Sto mischiando le carte... " + loadingEmojis[0]);
  
  // Animazione attesa
  let i = 1;
  const loadingInterval = setInterval(async () => {
    await bot.editMessageText("Sto mischiando le carte... " + loadingEmojis[i % 3], {
      chat_id: chatId,
      message_id: loadingMsg.message_id
    });
    i++;
  }, 500);
  
  // Delay 3 secondi
  setTimeout(async () => {
    clearInterval(loadingInterval);
    
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const isReversed = Math.random() > 0.5; // 50% capovolta
    const orientation = isReversed ? "reversed" : "upright";
    
    let responseText = `*${randomCard.name}* ${isReversed ? '(⌛ Capovolta)' : '(✨ Dritta)'}\n\n`;
    responseText += `${orientation === 'uprighted' ? '🔺 ' : '🔻 '}${randomCard.orientations[orientation].text}`;
    
    // Aggiungi consiglio squadra se impostata
    if (msg.from.team) {
      responseText += `\n\n${randomCard.teamRules[msg.from.team] || ''}`;
    }
    
    // Invia l'immagine con risposta
    await bot.sendPhoto(chatId, randomCard.orientations[orientation].image, {
      caption: responseText,
      parse_mode: 'Markdown'
    });
    
    // Cancella il messaggio di caricamento
    await bot.deleteMessage(chatId, loadingMsg.message_id);
  }, 3000);
});

// IMPOSTA SQUADRA
bot.onText(/\/squadra (.+)/, (msg, match) => {
  const team = match[1];
  msg.from.team = team; // Salva nello "user state"
  bot.sendMessage(msg.chat.id, `👍 Ora terrò conto che tifi ${team} nelle predizioni!`);
});

// KEEP-ALIVE PER RENDER
const express = require('express');
const app = express();
app.listen(process.env.PORT || 3000, () => console.log("Bot attivo!"));

