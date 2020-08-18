const services = require('../../services');
const replyMessage = require('../../static');
const generator = require('../../generator');

const handler = async (args) => {
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

  return message;
}

module.exports = {
  handler
};