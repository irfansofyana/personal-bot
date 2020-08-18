const config = require('../config');
const newsapi = require('./newsAPI');
const randomFacts = require('./randomFacts');
const calculator = require('./calculator');

module.exports = {
  newsapi,
  randomFacts,
  calculator
}