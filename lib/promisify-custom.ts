import { promisify } from 'util';
import { getRandomIntBetweenMinAndMax, getWaitedSecsMsg } from '../helpers';

const getMsg = (waitTime: number, str: string) => `${getWaitedSecsMsg(waitTime)} for ${str}`;
export type NoErrorStringCallback = (str: string) => void;
const myFuncWithCallback = (callback: NoErrorStringCallback, str: string): void => {
  const waitTime = getRandomIntBetweenMinAndMax(1, 4);
  setTimeout(() => {
    callback(getMsg(waitTime, str));
  }, waitTime);
};

type AsyncFuncType = (cb: (resolve: string) => void, str: string) => Promise<string>;

myFuncWithCallback[promisify.custom] = (str: string): Promise<string> => (
  new Promise((resolve) => {
    const waitTime = getRandomIntBetweenMinAndMax(1, 4);
    setTimeout(() => {
      resolve(getMsg(waitTime, str));
    }, waitTime);
  })
);

export {
  AsyncFuncType,
  myFuncWithCallback,
};
