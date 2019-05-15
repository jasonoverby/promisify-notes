const chalk = require('chalk');

const notANumber = num => typeof num !== 'number' || Number.isNaN(num);
const getWaitedSecsMsg = num => `waited for ${num} seconds`;
const getNotANumberMsg = (...strings) => (
  strings.length === 1
    ? `"${strings[0]}" is not a number`
    : `"One or more of these arguments is not a number: ${strings.join(', ')}`
);
const getImprovedErrorMsg = err => (
  chalk.red(err.stack.toString().split('\n').slice(0, 2).join('\n'))
);

const getRandomIntBetweenMinAndMax = (num1, num2) => {
  // ensures non-negative integers
  const [abs1, abs2] = [num1, num2].map(Math.abs).map(Math.floor);
  const [min, max] = [Math.min(abs1, abs2), Math.max(abs1, abs2)];
  return Math.floor((Math.random() * (max - min)) + min);
};

module.exports = {
  getImprovedErrorMsg,
  getNotANumberMsg,
  getRandomIntBetweenMinAndMax,
  getWaitedSecsMsg,
  notANumber,
};
