import { promisify } from 'util';
import { getRandomIntBetweenMinAndMax, getWaitedSecsMsg } from '../helpers';

const getMsg = (waitTime: number, str: string) => `${getWaitedSecsMsg(waitTime)} for ${str}`;
export type NoErrorStringCallback = (str: string) => void;
const myFuncWithCallback = (str: string, callback: NoErrorStringCallback): void => {
  const waitTime = getRandomIntBetweenMinAndMax(1, 4);
  setTimeout(() => {
    callback(getMsg(waitTime, str));
  }, waitTime);
};

type AsyncFuncType = (url: string, cb?: (resolve: string) => void) => Promise<string>;
const myFuncAsyncThatWillNotRun: AsyncFuncType = promisify(myFuncWithCallback);

myFuncWithCallback[promisify.custom] = (str: string): Promise<string> => (
  new Promise((resolve) => {
    const waitTime = getRandomIntBetweenMinAndMax(1, 4);
    setTimeout(() => {
      resolve(getMsg(waitTime, str));
    }, waitTime);
  })
);

const myFuncAsync: AsyncFuncType = promisify(myFuncWithCallback);

export {
  myFuncWithCallback,
  myFuncAsyncThatWillNotRun,
  myFuncAsync,
};
