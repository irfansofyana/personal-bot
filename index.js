'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const cfg = require('./config');
const handler = require('./handler');

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

  return handler.textHandler(client, event.replyToken, firstCommand, restCommand);
}

app.listen(cfg.PORT, async () => {
  console.log(`listening on ${cfg.PORT}`);
});