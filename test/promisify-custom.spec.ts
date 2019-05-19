import {
  myFuncAsync,
  myFuncAsyncThatWillNotRun,
  myFuncWithCallback,
} from '../lib/promisify-custom';

describe('promisify-custom', () => {
  describe('error-last callback pattern', () => {
    it('succeeds when something is "something"', (done) => {
      const something = 'something';
      const theCallback = (result: string) => {
        expect(result).toBe('something');
        done();
      };

      myFuncWithCallback(something, theCallback);
      expect.assertions(1);
    });

    it('fails when something is not "something"', (done) => {
      const something = '';
      const theCallback = (result: string, err: Error) => {
        expect(result).toBe(null);
        expect(err).toBeInstanceOf(TypeError);
        done();
      };

      myFuncWithCallback(something, theCallback);
      expect.assertions(2);
    });
  });

  describe('standard promisify with error-last callback', () => {
    it('fails when something is "something"', async () => {
      const something = 'something';
      try {
        await myFuncAsyncThatWillNotRun(something);
      } catch (err) {
        expect(err).toBe('something');
      }
      expect.assertions(1);
    });

    it('returns TypeError when something is not "something"', async () => {
      const something = '';
      const result = await myFuncAsyncThatWillNotRun(something);
      expect(result).toBeInstanceOf(TypeError);
      expect.assertions(1);
    });
  });

  describe('custom promisify with error-last callback', () => {
    it('returns "something" when something is not "something"', async () => {
      const something = 'something';
      const result = await myFuncAsync(something);
      expect(result).toBe('something async');
      expect.assertions(1);
    });

    it('fails when something is not "something"', async () => {
      const something = '';
      await expect(myFuncAsync(something)).rejects.toBeInstanceOf(TypeError);
      expect.assertions(1);
    });
  });
});
