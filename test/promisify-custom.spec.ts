import { promisify } from 'util';
import { getFancyString } from '../helpers';
import {
  myFuncWithCallback, NoErrorStringCallback,
} from '../lib/promisify-custom';

const patt = new RegExp(/waited for \d second\(s\) for something fancy/);
describe('promisify-custom', () => {
  describe('no error callback pattern', () => {
    it('returns string to the callback to do further processing', (done) => {
      const str = 'something';
      const theCallback = (result: string) => {
        const fancyResult = getFancyString(result);
        expect(fancyResult).toMatch(patt);
        done();
      };

      myFuncWithCallback(theCallback, str);
      expect.assertions(1);
    });
  });

  describe('custom promisify with no error callback', () => {
    it('returns matching result', async () => {
      const myFuncAsync = promisify(myFuncWithCallback);
      const str = 'something';
      // @ts-ignore - typescript difficulty with custom promisified funcs
      const result = await myFuncAsync(str);
      const fancyResult = getFancyString(result);
      expect(fancyResult).toMatch(patt);
      expect.assertions(1);
    });
  });
});
