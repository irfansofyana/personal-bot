const { number } = require('mathjs');
const mathjs = require('mathjs');
const config = {};
const create = mathjs.create;
const all = mathjs.all;

const math = create(all, config);

const calc = (expression) => {
    try {
        console.log(expression, typeof expression);
        const result = math.evaluate(expression);
        if (result === undefined) return 'undefined';
        if (typeof result === object) return result.toString();

        return result;
    } catch(err) {
        console.error(err);
    }
}

module.exports = calc;