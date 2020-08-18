const { number } = require('mathjs');
const mathjs = require('mathjs');
const config = {};
const create = mathjs.create;
const all = mathjs.all;

const math = create(all, config);

const calc = (expression) => {
    try {
        let result = math.evaluate(expression);
        if (typeof result === 'object' || typeof result === 'undefined') return result.toString();

        return result;
    } catch(err) {
        console.error(err);
    }
}
module.exports = calc;