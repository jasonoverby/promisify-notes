import { readFile } from 'fs';
import { join } from 'path';
import { readFileAsync } from '../lib/read-file-async';

describe('readFile', () => {
  const text = 'I am some data';
  const filePath =  join(__dirname, '..', 'data', 'data.txt');
  const badFilePath = join(__dirname, 'nonexistent-file.txt');
  const noSuchFileOrDirErrMsg = 'ENOENT: no such file or directory';

  describe('readFile with callback', () => {
    it ('reads the file', (done) => {
      readFile(filePath, 'utf8', (err, data) => {
        expect(data).toBe(text);
        expect(err).toBe(null);
        done();
      });

      expect.assertions(2);
    });

    it('gets an error if there is no file at that file path', (done) => {
      readFile(badFilePath, 'utf8', (err, data) => {
        expect(data).toBe(undefined);
        expect(err.message).toMatch(noSuchFileOrDirErrMsg);
        done();
      });

      expect.assertions(2);
    });
  });

  describe('readFileAsync', () => {
    it ('reads the file', async () => {
      const data = await readFileAsync(filePath, 'utf8');
      expect(data).toBe(text);

      expect.assertions(1);
    });

    it('gets an error if there is no file at that file path', async () => {
      await expect(readFileAsync(badFilePath, 'utf8')).rejects.toThrowErrorMatchingSnapshot();
      expect.assertions(1);
    });
  });
});
