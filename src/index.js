const config = require('../config');
const newsapi = require('./services/newsAPI');

function tes(){
  return "Hi, this is a test!"
}

async function news(){
  const opt = {
    "country": "ID" 
  };

  const ret = await newsapi.getHeadlines(opt);

  console.log(ret);
}

news();

// module.exports = {
//   tes
// }