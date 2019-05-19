import {
  getMsgAfterRandomSecsAsync,
  getMsgAfterRandomSecsWithCallback,
} from '../lib/contrived-example';

describe('promisifyContrivedExample', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(global, 'setTimeout');
  });

  describe('callback pattern', () => {
    it('gets a message after a random number of seconds inside a callback', (done) => {
      const num1 = 1;
      const num2 = 3;
      const theCallback = (_: Error, msg: string) => {
        expect(msg).toMatch(/waited for \d seconds/);
        done();
      };

      getMsgAfterRandomSecsWithCallback(num1, num2, theCallback);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect.assertions(2);
    });

    it('gets an error after 0 seconds when one of the args is not a number using a callback', (done) => {
      const num1 = 'a';
      const num2 = 3;
      const theCallback = (err: Error) => {
        expect(err).toBeInstanceOf(TypeError);
        expect(err).toMatchSnapshot();
        done();
      };

      // @ts-ignore bad input on purpose
      getMsgAfterRandomSecsWithCallback(num1, num2, theCallback);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(
        expect.any(Function),
        0,
      );
      expect.assertions(4);
    });
  });

  describe('async/await pattern', () => {
    it('gets a message after a random number of seconds using the promisified function', async () => {
      const num1 = 1;
      const num2 = 3;
      const msg = await getMsgAfterRandomSecsAsync(num1, num2);

      expect(msg).toMatch(/waited for \d seconds/);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect.assertions(2);
    });

    it('gets an error after 0 seconds when one of the args is not \
a number using the promisified function', async () => {
      const num1 = 'a';
      const num2 = 3;
      // @ts-ignore bad input on purpose
      const handledError = await getMsgAfterRandomSecsAsync(num1, num2);

      expect(handledError).toMatch('TypeError');
      expect(handledError).toMatchSnapshot();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(
        expect.any(Function),
        0,
      );
      expect.assertions(4);
    });
  });
});
