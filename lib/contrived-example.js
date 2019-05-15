const { promisify } = require('util');
const {
  getImprovedErrorMsg,
  getNotANumberMsg,
  getRandomIntBetweenMinAndMax,
  getWaitedSecsMsg,
  notANumber,
} = require('../helpers/helpers');

const getMsgAfterRandomSecsWithCallback = (num1, num2, callback) => {
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
  const funcWithoutCallback = promisify(getMsgAfterRandomSecsWithCallback);
  return funcWithoutCallback(num1, num2)
    .catch(err => getImprovedErrorMsg(err));
};

module.exports = {
  getMsgAfterRandomSecsAsync,
  getMsgAfterRandomSecsWithCallback,
};
