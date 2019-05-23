import { promisify } from 'util';

describe('promisified setTimeout', () => {
  it('waits the specified number of ms', async () => {
    const wait = promisify(setTimeout);
    const before = Date.now();
    await wait(2000);
    const after = Date.now();
    const timeWaited = after - before;
    expect(timeWaited).toBeGreaterThanOrEqual(2000);
    expect(timeWaited).toBeLessThan(3000);
    expect.assertions(2);
  });
});
