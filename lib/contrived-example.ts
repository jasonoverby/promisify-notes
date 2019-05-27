import {
  getNotANumberMsg,
  getRandomIntBetweenMinAndMax,
  getWaitedSecsMsg,
  notANumber,
} from '../helpers';

type NodeStyleCallback = (err?: Error | null, param?: any) => void;

const getMsgAfterRandomSecsWithCallback = (num1: number, num2: number, callback: NodeStyleCallback): void => {
  /** will be NaN if either num1 or num2 is not a number */
  const randomInt = getRandomIntBetweenMinAndMax(num1, num2);
  const randomWaitFrom1ToNumSecs = notANumber(randomInt) ? 0 : randomInt * 1000;
  /** simulate async operation */
  setTimeout(() => {
    if (notANumber(randomInt)) {
      callback(TypeError(getNotANumberMsg(num1, num2)), null);
    } else {
      const waitedSecsMsg = getWaitedSecsMsg(randomInt);
      callback(null, waitedSecsMsg);
    }
  }, randomWaitFrom1ToNumSecs);
};

export {
  NodeStyleCallback,
  getMsgAfterRandomSecsWithCallback,
};
