const services = require('../../services');
const replyMessage = require('../../static');
const generator = require('../../generator');

const handler = async () => {
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

  return message;
}

module.exports = {
  handler
};