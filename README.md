# util.promisify notes
Notes and code for a presentation on `util.promisify`

## Versions
* Node: `11.10.1`
* npm: `6.9.0`

## Examples
``` js
/** example with a standard Node-style-callback-based function */

/** import/require promisify from the util core Node module */
import { promisify } from 'util';
import { readFile } from 'fs';

/**
 * pass in a Node-style-callback-based function
 * to get back a promise-based version of the function
/*
const readFileAsync1 = promisify(fs.readFile);
```

```js
/** 
 * example with a function that does not conform
 * to the Node-style-callback-based standard
 */
const nonStandardFunc = (str, callback) => {
  const waitTime = getNumBetween(1, 4);
  setTimeout(() => {
    /** no error given to callback */
    callback(getMsg(waitTime, str));
  }, waitTime);
};

/** set the [promisify.custom] symbol for the function */
nonStandardFunc[promisify.custom] = (str) => (
  new Promise((resolve) => {
    const waitTime = getNumBetween(1, 4);
    setTimeout(() => {
      resolve(getMsg(waitTime, str));
    }, waitTime);
  })
);

/** promisify will return the custom function */
const nonStandardFuncAsync = promisify(nonStandardFunc);

/** 
 * if the orginal function is exported, promisify
 * will return the custom function wherever it is
 * called on the original function
 */
 export { nonStandardFunc };
 
```

## Links
* [util.promisify](https://nodejs.org/api/util.html#util_util_promisify_original)
* [util.promisify.custom](https://nodejs.org/api/util.html#util_custom_promisified_functions)
* [Promisify Presentation](https://docs.google.com/presentation/d/135a1coVk6d7ogGbAp8U1k01L1wZyfR25Zjg2nKsw_gY/edit?usp=sharing)
