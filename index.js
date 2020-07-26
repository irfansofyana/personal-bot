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
    
    let newsContent = [];
    res.forEach((news, i) => {
      let content = {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": news.title,
            "wrap": true
          },
          {
            "type": "separator"
          },
          {
            "type": "button",
            "style": "link",
            "action": {
              "type": "uri",
              "label": "Visit Link",
              "uri": news.url
            }
          }
        ]
      };
      newsContent.push(content);
      if (i != res.length - 1) {
        newsContent.push({
          "type": "separator"
        });
      }
    });

    const answer = {
      "type": "bubble",
      "styles": {
        "header": {
          "backgroundColor": "#fa1616"
        }
      },
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "Indonesia Headline News",
            "align": "center",
            "color": "#ffffff"
          },
          {
            "type": "separator"
          }
        ]
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "md",
        "contents": newsContent
      }
    };

    const message = {
      "type": "flex",
      "altText": "this is test",
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