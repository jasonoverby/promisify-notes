import { promisify } from 'util';

const getSomethingErr = (something: string) => new TypeError(`"${something}" is not something`);
export type ErrorLastCallback = (str?: string, err?: Error) => void;

const myFuncWithCallback = (something: string, callback?: ErrorLastCallback): void => {
  if (something !== 'something') {
    callback(null, getSomethingErr(something));
  } else {
    callback(something, null);
  }
};

type AsyncFuncType = (url: string, cb?: (res: string) => void) => Promise<string>;
const myFuncAsyncThatWillNotRun: AsyncFuncType = promisify(myFuncWithCallback);

myFuncWithCallback[promisify.custom] = (something: string): Promise<string> => (
  new Promise((res, rej) => {
    if (something !== 'something') {
      rej(getSomethingErr(something));
    } else {
      res(`${something} async`);
    }
  })
);

const myFuncAsync: AsyncFuncType = promisify(myFuncWithCallback);

export {
  myFuncWithCallback,
  myFuncAsyncThatWillNotRun,
  myFuncAsync,
};
