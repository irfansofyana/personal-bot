const line = require('@line/bot-sdk');
const express = require('express');

const config = require('./config');
const src = require('./src');

const cfg = {
    channelAccessToken: config.CHANNEL_ACCESS_TOKEN,
    channelSecret: config.CHANNEL_SECRET
};

const app = express();

app.post('/bot/callback', line.middleware(cfg), (req, res) => {
    Promise
        .all(req.body.events.map(src.handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

app.get('/bot', (req, res) => {
    res.send('The server works!');
});

app.get('/bot/test', (req, res) => {
    res.send('The server works!');
});

app.listen(config.PORT, () => {
    console.log(`Listening to port: ${config.PORT}`);
});
