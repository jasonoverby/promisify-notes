import {
  getNotANumberMsg,
  getRandomIntBetweenMinAndMax,
  getWaitedSecsMsg,
  notANumber,
} from '../helpers';

type StringCallback = (err?: Error, str?: string) => void;

const getMsgAfterRandomSecsWithCallback = (num1: number, num2: number, callback: StringCallback): void => {
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

export {
  getMsgAfterRandomSecsWithCallback,
  StringCallback,
};
