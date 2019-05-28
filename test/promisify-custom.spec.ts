import { promisify } from 'util';
import { fancyPatt, getFancyString } from '../helpers';
import {
  MyFuncAsync, myFuncWithCallback, NoErrorCallback,
} from '../lib/promisify-custom';

describe('promisify-custom', () => {
  describe('no error callback pattern', () => {
    it('returns string to the callback to do further processing', (done) => {
      const str = 'something';
      const theCallback: NoErrorCallback = (result: string) => {
        const fancyResult = getFancyString(result);
        expect(fancyResult).toMatch(fancyPatt);
        done();
      };

      myFuncWithCallback(str, theCallback);
      expect.assertions(1);
    });
  });

  describe('custom promisify with no error callback', () => {
    it('returns matching result', async () => {
      const myFuncAsync: MyFuncAsync = promisify<string>(myFuncWithCallback);
      const str = 'something';
      const result = await myFuncAsync(str);
      const fancyResult = getFancyString(result);
      expect(fancyResult).toMatch(fancyPatt);
      expect.assertions(1);
    });
  });
});
