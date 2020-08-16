const axios = require('axios');
const config = require('../../config');

const todayFact = async () => {
    try {
        const url = config.RANDOM_FACT_BASE_URL.concat('today.json?language=en');
        const response = await axios.get(url);

        console.log(response, response.text);
        return response.text;
    } catch (err) {
        console.error(err);
    }
};

const randomFact = async () => {
    try {
        const url = config.RANDOM_FACT_BASE_URL.concat('random.json?language=en');
        const response = await axios.get(url);

        return response.text;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    todayFact,
    randomFact
}