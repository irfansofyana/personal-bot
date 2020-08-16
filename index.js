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

// event handler
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  if (event.message.text === '/news'){
    const res = await services.newsapi({
      'country': 'ID'
    });
    
    const newsContent = generator.newsMessage(res);

    const answer = replyMessage.news(newsContent);

    const message = {
      "type": "flex",
      "altText": "Indonesia Headline News",
      "contents": answer
    }

    return client.replyMessage(event.replyToken, message);
  }

  const echo = {
    type: 'text',
    text: event.message.text
  };

  return client.replyMessage(event.replyToken, echo);
}

app.listen(cfg.PORT, async () => {
  console.log(`listening on ${cfg.PORT}`);
});