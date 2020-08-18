const calculator = require('./calculator');
const newsAPI = require('./newsAPI');
const randomFacts = require('./randomFacts');

const textHandler = async (client, token, command, args) => {
  let message = {};
  if (command === '/news'){
    message = newsAPI.handler();
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
    message = randomFacts.handler();
  } else if (command === '/calc') {
    message = calculator.handler();
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