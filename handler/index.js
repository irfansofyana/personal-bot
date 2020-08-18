const services = require('../services');
const replyMessage = require('..static');
const generator = require('../generator');

const textHandler = async (client, token, command, args) => {
  let message = {};
  if (command === '/news'){
    const res = await services.newsapi({
      'country': 'ID'
    });
    
    const newsContent = generator.newsMessage(res);
    const answer = replyMessage.news(newsContent);

    message = {
      "type": "flex",
      "altText": "Indonesia Headline News",
      "contents": answer
    };
  } else if (command === '/commands') {
    message = {
      type: 'text',
      text: replyMessage.commands()
    };
  } else if (command === '/whoareyou') {
    message = {
      type: 'text',
      text: replyMessage.aboutMe()
    };
  } else if (command === '/fact'){
    let fact = '';
    if (args === 'today') {
      fact = await services.randomFacts.todayFact();

      message = {
        type: 'text',
        text: 'Here is one fact in the world today for you: ' + fact
      };
    } else if (args === 'random') {
      fact = await services.randomFacts.randomFact();

      message = {
        type: 'text',
        text: 'One random fact in the world for you: ' + fact
      };
    } else {
      message = {
        type: 'text',
        text: replyMessage.notUnderstand()
      };
    }
  } else if (command === '/calc') {
    const result = services.calculator(args).toString();
    const answer = replyMessage.calc(args, result);

    message = {
      "type": "flex",
      "altText": "calculator",
      "contents": answer
    };
  } else {
    message = {
      type: 'text',
      text: replyMessage.notUnderstand()
    };
  }

  return client.replyMessage(token, message);
}

module.exports = {
  textHandler
};