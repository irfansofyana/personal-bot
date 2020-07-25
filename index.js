'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const cfg = require('./config');
const services = require('./services');

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
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result));
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

  let echo = {};
  let text = event.message.text;
  let type = 'text';

  if (event.message.text == '/headlines'){
    let answer = '';
    const res = await services.newsapi({
      'country': 'ID'
    });

    res.forEach((news) => {
      answer.concat(news.title + '\n' + news.url + '\n');
    })

    console.log(text);
    text = answer;
  }

  echo = {
    type: type,
    text: text
  };

  return client.replyMessage(event.replyToken, echo);
}

app.listen(cfg.PORT, () => {
  console.log(`listening on ${cfg.PORT}`);
});