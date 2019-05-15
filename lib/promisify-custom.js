const { promisify } = require('util');

const getSomethingErr = something => new TypeError(`"${something}" is not something`);

const myFuncWithCallback = (something, callback) => {
  if (something !== 'something') {
    callback(null, getSomethingErr(something));
  } else {
    callback(something, null);
  }
};

const myFuncAsyncThatWillNotRun = promisify(myFuncWithCallback);

myFuncWithCallback[promisify.custom] = something => (
  new Promise((res, rej) => {
    if (something !== 'something') {
      const err = getSomethingErr(something);
      rej(err);
    } else {
      res(`${something} async`);
    }
  })
);

const myFuncAsync = promisify(myFuncWithCallback);

module.exports = {
  myFuncWithCallback,
  myFuncAsync,
  myFuncAsyncThatWillNotRun,
};
