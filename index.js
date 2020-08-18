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

  const firstCommand = event.message.text.substring(0, event.message.text.indexOf(' '));
  const restCommand = event.message.text.substring(event.message.text.indexOf(' '));

  let message = {};
  if (firstCommand === '/news'){
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
  } else if (firstCommand=== '/commands') {
    message = {
      type: 'text',
      text: replyMessage.commands()
    };
  } else if (firstCommand=== '/whoareyou') {
    message = {
      type: 'text',
      text: replyMessage.aboutMe()
    };
  } else if (firstCommand === '/fact'){
    let fact = '';
    if (restCommand === 'today') {
      fact = await services.randomFacts.todayFact();

      message = {
        type: 'text',
        text: 'Here is one fact in the world today for you: ' + fact
      };
    } else if (restCommand === 'random') {
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
  } else if (firstCommand === '/calc') {
    const result = services.calculator(restCommand).toString();
    const answer = replyMessage.calc(restCommand, result);

    message = {
      "type": "flex",
      "altText": "calculator",
      "contents": answer
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