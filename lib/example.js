

import { promisify } from 'util';



const funcWithCb = callbackify(asyncFunc);
const callback = (err, data) => {
  if (err) throw err;
  doSomethingWithData(data);
};
funcWithCb(arg, callback);

const asyncFunc = promisify(funcWithCb);
const main = async () => {
  const data = await asyncFunc(arg)
    .catch(err => handleError(err));
  doSomethingWithData(data);
};
main();
/** OR */
asyncFunc(arg)
  .then(data => {
    doSomethingWithData(data);
  }).catch(err => handleError(err));


(async () => {
  const result = await promisifiedFunc();
  otherFunc(result);
})();
const funcWithCallback = (param, callback) => {
  doSomethingAsynchronous()
};


get[promisify.custom] = (
  url,
  options = {},
) => (
  new Promise((resolve, reject) => {
    const callback = (response) => {
      let str = '';
      response.on('data', (data) => {
        str += data;
      });
      response.on('end', () => {
        resolve(JSON.parse(str));
      });
    };
    get(url, options, callback)
      .on('error', reject);
  })
);

import { promisify } from 'util';
import { readFile } from 'fs';

const readFileAsync = promisify(readFile);

const callback = (err, data) => {
  if (err) throw err;
  console.log(data);
};
fs.readFile('file.txt', callback);

/** callback is first param */
const hmmFunc = (callback, str) => {
  const waitTime = getNumBetween(1, 4);
  setTimeout(() => {
    /** no error given to callback */
    callback(getMsg(waitTime, str));
  }, waitTime);
};
// const hmmFuncAsync = ???


hmmFunc[promisify.custom] = (str) => (
  new Promise((resolve) => {
    const waitTime = getNumBetween(1, 4);
    setTimeout(() => {
      resolve(getMsg(waitTime, str));
    }, waitTime);
  })
);
const hmmFuncAsync = promisify(hmmFunc);
const msg = await hmmFuncAsync('hello');

export { hmmFunc };


const hmmFuncAsync = promisify(hmmFunc);
const msg = await hmmFuncAsync('Rad!');

const wait = promisify(setTimeout);
/** waits for at least 3 seconds */
await wait(3000); 
/** before moving on to the next line */
doSomethingAfterWaiting();


try {
  const data = await promisifiedFunc(something);
  const newData = doSomethingWithData(data);
  const newerData = await otherPromisifiedFunc(newData);
  const evenNewerData = doSomethingElseWithData(newerData);
  const newestData = await yetAnotherPromisifiedFunc(evenNewerData);
  doSomethingFinalWithData(newestData);
} catch (err) {
  handleError(err);
}

funcWithCallback(something, (err, data) => {
  if (err) handleError(err);
  const newData = doSomethingWithData(data);

  otherFuncWithCallback(newData, (err, data) => {
    if (err) handleError(err);

      const newData = doSomethingElseWithData(data);
      yetAnotherFuncWithCallback(newData, (err, data) => {
        if (err) handleError(err);

        doSomethingFinalWithData(newData);
      });
  });
});

const dataObj = await promisifiedHttpsGet(url)
  .catch(err => handleError(err));
doSomethingWithDataObj(dataObj);

https.get(url, (error, response) => {
  if (error) handleError(error);

  let str = '';
  response.on('data', (data) => {
    str += data;
  });
  response.on('end', () => {
    const dataObj = JSON.parse(str);
    doSomethingWithDataObj(dataObj);
    done();
  });
};

get(`${todosUrl}/${todoId}`, {}, callback);

import { promisify } from 'util';

const promisifiedFunc = promisify(funcWithCallback);


(async () => {
  const result = await promisifiedFunc();
  otherFunc(result);
})();

console.log(result);
import {
  getNotANumberMsg,
  getRandomIntBetweenMinAndMax,
  getWaitedSecsMsg,
  notANumber,
} from '../helpers';
import { Http2SecureServer } from 'http2';

type StringCallback = (err?: Error, str?: string) => void;

const getMsgAfterRandomSecsWithCallback = (
  num1: number,
  num2: number,
  callback: StringCallback,
): void => {
  const randomInt = getRandomIntBetweenMinAndMax(num1, num2);
  const randomWaitFrom1ToNumSecs = notANumber(randomInt) ?
    0 :
    randomInt * 1000;
  setTimeout(() => {
    if (notANumber(randomInt)) {
      callback(TypeError(getNotANumberMsg(num1, num2)), null);
    } else {
      callback(null, getWaitedSecsMsg(randomInt));
    }
  }, randomWaitFrom1ToNumSecs);
};

const getMsgAfterRandomSecsAsync = promisify(getMsgAfterRandomSecsWithCallback);



get[promisify.custom] = (url) => (
  new Promise((resolve, reject) => {
    get(url, (response) => {
      let str = '';
      response.on('data', (data) => {
        str += data;
      });
      response.on('end', () => {
        resolve(JSON.parse(str));
      });
    }).on('error', reject);
  })
);

export {
  getMsgAfterRandomSecsAsync,
  getMsgAfterRandomSecsWithCallback,
  StringCallback,
};
