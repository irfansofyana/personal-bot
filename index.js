'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const cfg = require('./config');

const config = {
  channelAccessToken: cfg.CHANNEL_ACCESS_TOKEN,
  channelSecret: cfg.CHANNEL_SECRET
};

const client = new line.Client(config);
const app = express();

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
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

app.listen(cfg.PORT, () => {
  console.log(`listening on ${cfg.PORT}`);
});