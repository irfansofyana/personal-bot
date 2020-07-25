const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 30000,
    CHANNEL_ACCESS_TOKEN: process.env.CHANNEL_ACCESS_TOKEN,
    CHANNEL_SECRET: process.env.CHANNEL_SECRET,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    NEWS_API_BASE_URL: process.env.NEWS_API_BASE_URL
};