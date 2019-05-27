import { promisify } from 'util';
import { getRandomIntBetweenMinAndMax, getWaitedSecsMsg } from '../helpers';

const getMsg = (waitTime: number, str: string) => `${getWaitedSecsMsg(waitTime)} for ${str}`;
type NoErrorCallback = (param: any) => void;
const myFuncWithCallback = (str: string, callback: NoErrorCallback): void => {
  const waitTime = getRandomIntBetweenMinAndMax(1, 4);
  setTimeout(() => {
    callback(getMsg(waitTime, str));
  }, waitTime);
};

myFuncWithCallback[promisify.custom] = (str: string): Promise<string> => (
  new Promise((resolve) => {
    const waitTime = getRandomIntBetweenMinAndMax(1, 4);
    setTimeout(() => {
      resolve(getMsg(waitTime, str));
    }, waitTime);
  })
);

export {
  myFuncWithCallback,
  NoErrorCallback,
};
