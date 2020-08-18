const calculator = require('./calculator');
const newsAPI = require('./newsAPI');
const randomFacts = require('./randomFacts');
const replyMessage = require('../static');

const textHandler = async (client, token, command, args) => {
  let message = {};
  
  if (command === '/news'){
    message = await newsAPI.handler();
  } else if (command === '/fact'){
    message = await randomFacts.handler(args);
  } else if (command === '/calc') {
    message = calculator.handler(args);
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