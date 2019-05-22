import { getMsgAfterRandomSecsCallback } from '../lib/contrived-example-callbackify';

describe('callbackify getMsgAfterRandomSecsAsync', () => {
  const num1 = 1;
  const num2 = 4;
  const badInput = 'a';
  const patt = new RegExp(/waited for \d second\(s\)/);

  it('takes a callback that will log a message', (done) => {
    getMsgAfterRandomSecsCallback(num1, num2, (err: Error, msg: string) => {
      expect(msg).toMatch(patt);
      done();
    });

    expect.assertions(1);
  });

  it('errors if something is wrong', (done) => {
    jest.spyOn(global, 'setTimeout');
    // @ts-ignore - bad input on purpose
    getMsgAfterRandomSecsCallback(badInput, num2, (err: Error, msg: string) => {
      expect(err).toBeInstanceOf(TypeError);
      expect(err).toMatchSnapshot();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(
        expect.any(Function),
        0,
      );
      done();
    });

    expect.assertions(4);
  });
});
