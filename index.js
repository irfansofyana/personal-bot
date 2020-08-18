'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const cfg = require('./config');
const services = require('./services');
const replyMessage = require('./static');
const generator = require('./generator');

const config = {
  channelAccessToken: cfg.CHANNEL_ACCESS_TOKEN,
  channelSecret: cfg.CHANNEL_SECRET
};

const client = new line.Client(config);
const app = express();

app.get('/', (req, res) => {
  res.send('The server is working!');
});

app.post('/callback', line.middleware(config), (req, res) => {
  Promise.all(
    req.body.events.map(handleEvent)
  ).then(
    result => res.json(result)
  );
});

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature);
    return;
  } 
  
  if (err instanceof JSONParseError) {
    res.status(400).send(err.raw);
    return;
  }

  next(err);
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const commands = event.message.text.split(' ');

  let message = {};
  if (commands[0] === '/news'){
    const res = await services.newsapi({
      'country': 'ID'
    });
    
    const newsContent = generator.newsMessage(res);
    const answer = replyMessage.news(newsContent);

    message = {
      "type": "flex",
      "altText": "Indonesia Headline News",
      "contents": answer
    }
  } else if (commands[0]=== '/commands') {
    message = {
      type: 'text',
      text: replyMessage.commands()
    };
  } else if (commands[0]=== '/whoareyou') {
    message = {
      type: 'text',
      text: replyMessage.aboutMe()
    };
  } else if (commands[0] === '/fact'){
    let fact = '';
    if (commands[1] === '/today') {
      fact = await services.randomFacts.todayFact();
      message = {
        type: 'text',
        text: 'Here is one fact in the world today for you: ' + fact
      };
    } else if (commands[1] === '/random') {
      fact = await services.randomFacts.randomFact();
      message = {
        type: 'text',
        text: 'One random fact in the world for you: ' + fact
      };
    } else {
      message = {
        type: 'text',
        text: replyMessage.notUnderstand()
      };
    }
  } else if (commands[0] === '/calc') {
    const result = services.calculator(commands[1]);
    message = {
      type: 'text',
      text: result.toString()
    };
  } else {
    message = {
      type: 'text',
      text: replyMessage.notUnderstand()
    };
  }

  return client.replyMessage(event.replyToken, message);
}

app.listen(cfg.PORT, async () => {
  console.log(`listening on ${cfg.PORT}`);
});