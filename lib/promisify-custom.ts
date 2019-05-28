import { promisify } from 'util';
import { getMsgAfterWait, getRandomIntBetweenMinAndMax } from '../helpers';

/** to get TS to play nice with promisify.custom */
declare module 'util' {
  function promisify<T>(
    func: (param: T, cb: (data: T) => void,
  ) => void): (param: T) => Promise<T>;
}
type NoErrorCallback = (param: any) => void;
type MyFuncAsync = (str: string) => Promise<string>;
interface MyFuncWithCallback {
    (str: string, callback: NoErrorCallback): void;
    [promisify.custom]?: MyFuncAsync;
}

const myFuncWithCallback: MyFuncWithCallback = (str: string, callback: NoErrorCallback): void => {
  const waitTime = getRandomIntBetweenMinAndMax(1, 4);
  setTimeout(() => {
    callback(getMsgAfterWait(waitTime, str));
  }, waitTime);
};

myFuncWithCallback[promisify.custom] = (str: string): Promise<string> => (
  new Promise<string>((resolve) => {
    const waitTime = getRandomIntBetweenMinAndMax(1, 4);
    setTimeout(() => {
      const msg: string = getMsgAfterWait(waitTime, str);
      resolve(msg);
    }, waitTime);
  })
);

export {
  myFuncWithCallback,
  MyFuncWithCallback,
  MyFuncAsync,
  NoErrorCallback,
};
