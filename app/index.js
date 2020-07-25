const line = require('@line/bot-sdk');
const express = require('express');
const config = require('../config');

const cfg = {
    channelAccessToken: config.CHANNEL_ACCESS_TOKEN,
    channelSecret: config.CHANNEL_SECRET
};

const client = new line.Client(cfg);
const app = express();

app.post('/callback', line.middleware(cfg), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

app.get('/test', (req, res) => {
    res.send('The server works!');
})

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
    }
  
    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };
  
    // use reply API
    return client.replyMessage(event.replyToken, echo);
}

app.listen(config.PORT, () => {
    console.log(`listening on ${config.PORT}`);
});