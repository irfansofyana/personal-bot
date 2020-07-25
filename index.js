'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const cfg = require('./config');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'u/aqvuFfYG2lVu+UrEgQ9lUfi9Qk5oWJZKag+SV0xT0CVJO5lRVkLly0QydGqSuzWUK5vrZh/8J4CBgWI6RZKS//6mA22qqT+RS9FYEx6VqIqYjboZjEhsNreWuINKh6kXUiJ9P45c6C/1fgUA1qgQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '58fd12e408144c61cc6f7ef74de867e8',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  res.json('success');
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

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});