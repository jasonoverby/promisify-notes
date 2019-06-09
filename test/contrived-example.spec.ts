import { promisify } from 'util';
import { patt } from '../helpers';
import {
  getMsgAfterRandomSecsWithCallback,
  NodeStyleCallback,
} from '../lib/contrived-example';

describe('promisifyContrivedExample', () => {
  const num1 = 1;
  const num2 = 3;
  const badInput = 'a';
  const getMsgAfterRandomSecsAsync = promisify(
    getMsgAfterRandomSecsWithCallback,
  );

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(global, 'setTimeout');
  });

  describe('callback pattern', () => {
    it('gets a message after a random number of seconds inside a callback', (done) => {
      const theCallback: NodeStyleCallback = (_: Error, fancyMsg: string) => {
        expect(fancyMsg).toMatch(patt);
        done();
      };

      getMsgAfterRandomSecsWithCallback(num1, num2, theCallback);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect.assertions(2);
    });

    it('gets an error when one of the args is not a number using a callback', (done) => {
      const theCallback: NodeStyleCallback = (err: Error) => {
        expect(err).toBeInstanceOf(TypeError);
        expect(err).toMatchSnapshot();
        done();
      };

      // @ts-ignore bad input on purpose
      getMsgAfterRandomSecsWithCallback(badInput, num2, theCallback);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
      expect.assertions(4);
    });
  });

  describe('async/await pattern', () => {
    it('gets a message after a random number of seconds using the promisified function', async () => {
      const fancyMsg = await getMsgAfterRandomSecsAsync(num1, num2);

      expect(fancyMsg).toMatch(patt);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect.assertions(2);
    });

    it('throws an error when one of the args is not a number using the promisified function', async () => {
      await expect(
        // @ts-ignore bad input on purpose
        getMsgAfterRandomSecsAsync(badInput, num2),
      ).rejects.toThrowError(TypeError);

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
      expect.assertions(3);
    });
  });
});
