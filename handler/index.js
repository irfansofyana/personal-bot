const services = require('./services');
const replyMessage = require('./static');
const generator = require('./generator');

const textHandler = (client, token, command, args) => {
  let message = {};
  if (firstCommand === '/news'){
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
  } else if (firstCommand=== '/commands') {
    message = {
      type: 'text',
      text: replyMessage.commands()
    };
  } else if (firstCommand=== '/whoareyou') {
    message = {
      type: 'text',
      text: replyMessage.aboutMe()
    };
  } else if (firstCommand === '/fact'){
    let fact = '';
    if (restCommand === 'today') {
      fact = await services.randomFacts.todayFact();

      message = {
        type: 'text',
        text: 'Here is one fact in the world today for you: ' + fact
      };
    } else if (restCommand === 'random') {
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
  } else if (firstCommand === '/calc') {
    const result = services.calculator(restCommand).toString();
    const answer = replyMessage.calc(restCommand, result);

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