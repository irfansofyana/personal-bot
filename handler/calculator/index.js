const services = require('../../services');
const replyMessage = require('../../static');

const handler = (args) => {
    const result = services.calculator(args).toString();
    const answer = replyMessage.calc(args, result);

    message = {
      "type": "flex",
      "altText": "calculator",
      "contents": answer
    };

    return message
}

module.exports = {
  handler
};