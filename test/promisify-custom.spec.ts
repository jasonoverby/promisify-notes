import { getFancyString } from '../helpers';
import {
  myFuncAsync,
  myFuncAsyncThatWillNotRun,
  myFuncWithCallback,
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

      myFuncWithCallback(str, theCallback);
      expect.assertions(1);
    });
  });

  describe('standard promisify with no error callback', () => {
    it('fails', async () => {
      const str = 'something';
      try {
        await myFuncAsyncThatWillNotRun(str);
      } catch (err) {
        const fancyError = getFancyString(err);
        expect(fancyError).toMatch(patt);
      }
      expect.assertions(1);
    });
  });

  describe('custom promisify with no error callback', () => {
    it('returns matching result', async () => {
      const str = 'something';
      const result = await myFuncAsync(str);
      const fancyResult = getFancyString(result);
      expect(fancyResult).toMatch(patt);
      expect.assertions(1);
    });
  });
});
