const axios = require('axios');
const config = require('../../config');

const getHeadlines = async (opt) =>{
    try {
        const url = config.NEWS_API_BASE_URL.concat('v2/top-headlines');
        const response = await axios.get(url, {
            headers: {
                'x-api-key': config.NEWS_API_KEY
            },
            params: opt
        });
        
        let ret = [];
        for (let i = 0; i < Math.min(response.data.totalResults, config.MAX_AMOUNT_NEWS); i++){
            const {title, url, ...rest} = response.data.articles[i];
            ret.push({title, url});
        }

        return ret;
    }catch (err){
        console.error(err);
    }
};

module.exports = getHeadlines;