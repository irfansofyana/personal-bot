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

  let message = {};
  if (event.message.text === '/news'){
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
  } else if (event.message.text === '/commands') {
    message = {
      type: 'text',
      text: replyMessage.commands()
    };
  } else if (event.message.text === '/whoareyou') {
    message = {
      type: 'text',
      text: replyMessage.aboutMe()
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