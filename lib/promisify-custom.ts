import { promisify } from 'util';

const getSomethingErr = (something: string) => new TypeError(`"${something}" is not something`);
export type ErrorLastStringCallback = (str?: string, err?: Error) => void;

const myFuncWithCallback = (something: string, callback: ErrorLastStringCallback): void => {
  if (something !== 'something') {
    callback(null, getSomethingErr(something));
  } else {
    callback(something, null);
  }
};

type AsyncFuncType = (url: string, cb?: (resolve: string) => void) => Promise<string>;
const myFuncAsyncThatWillNotRun: AsyncFuncType = promisify(myFuncWithCallback);

myFuncWithCallback[promisify.custom] = (something: string): Promise<string> => (
  new Promise((resolve, reject) => {
    if (something !== 'something') {
      reject(getSomethingErr(something));
    } else {
      resolve(`${something} async`);
    }
  })
);

const myFuncAsync: AsyncFuncType = promisify(myFuncWithCallback);

export {
  myFuncWithCallback,
  myFuncAsyncThatWillNotRun,
  myFuncAsync,
};
