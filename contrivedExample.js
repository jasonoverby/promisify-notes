const { promisify } = require('util');
const chalk = require('chalk');

const notANumber = num => typeof num !== 'number' || Number.isNaN(num);
const getWaitedSecsMsg = num => `waited for ${num} seconds`;
const getNotANumberMsg = (num1, num2) => `"One or both of these arguments is not a number: ${num1}, ${num2}`;
const getImprovedErrorMsg = err => (
  chalk.red(err.stack.toString().split('\n').slice(0, 2).join('\n'))
);

const getRandomIntBetweenMinAndMax = (num1, num2) => {
  // ensures non-negative integers
  const [abs1, abs2] = [num1, num2].map(Math.abs).map(Math.floor);
  const [min, max] = [Math.min(abs1, abs2), Math.max(abs1, abs2)];
  return Math.floor((Math.random() * (max - min)) + min);
};

const getMsgAfterRandomSecs = (num1, num2, callback) => {
  // will be NaN if either num1 or num2 is not a number
  const randomInt = getRandomIntBetweenMinAndMax(num1, num2);
  const randomWaitFrom1ToNumSecs = notANumber(randomInt) ? 0 : randomInt * 1000;
  // simulate async operation
  setTimeout(() => {
    if (notANumber(randomInt)) {
      callback(TypeError(getNotANumberMsg(num1, num2)), null);
    } else {
      callback(null, getWaitedSecsMsg(randomInt));
    }
  }, randomWaitFrom1ToNumSecs);
};

const getMsgAfterRandomSecsAsync = async (num1, num2) => {
  const funcWithoutCallback = promisify(getMsgAfterRandomSecs);
  return funcWithoutCallback(num1, num2)
    .catch(err => getImprovedErrorMsg(err));
};

module.exports = {
  getMsgAfterRandomSecs,
  getMsgAfterRandomSecsAsync,
};
