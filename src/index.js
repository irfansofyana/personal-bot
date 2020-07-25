const config = require('../config');

const cfg = {
  channelAccessToken: config.CHANNEL_ACCESS_TOKEN,
  channelSecret: config.CHANNEL_SECRET
};
const client = new line.Client(cfg);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

function tes(){
  return "Hi, this is a test!"
}

module.exports = {
  handleEvent,
  tes
}