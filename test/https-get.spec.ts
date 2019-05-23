import { IncomingMessage, ServerResponse } from 'http';
import { promisify } from 'util';
import { get, HttpsGetCb, HttpsGetType } from '../lib/https-get';

describe('https.get', () => {
  const promisifiedGet: HttpsGetType = promisify(get);
  const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  const badTodosUrl = 'htps://jsonplaceholder.typicode.com/todos';
  const todoId = 2;
  const snapshotMatcher = {
    completed: expect.any(Boolean),
    id: expect.any(Number),
    title: expect.any(String),
    userId: expect.any(Number),
  };

  describe('callback https.get', () => {
    it('succeeds when url is valid', (done) => {
      const callback: HttpsGetCb = (response: IncomingMessage) => {
        let str = '';
        response.on('data', (data: ServerResponse) => {
          str += data;
        });
        response.on('end', () => {
          const dataObj = JSON.parse(str);
          expect(dataObj).toMatchSnapshot(snapshotMatcher);
          done();
        });
      };

      get(`${todosUrl}/${todoId}`, callback);
      expect.assertions(1);
    });

    it('fails when url is invalid', () => {
      const callback = () => null;

      expect(() => {
        get(`${badTodosUrl}/${todoId}`, callback);
      }).toThrowErrorMatchingSnapshot();
      expect.assertions(1);
    });
  });

  describe('promsified https.get', () => {
    it('succeeds when url is valid', async () => {
      const todo = await promisifiedGet(`${todosUrl}/${todoId}`);
      expect(todo).toMatchSnapshot(snapshotMatcher);
      expect.assertions(1);
    });

    it('fails when url is invalid', async () => {
      await expect(promisifiedGet(`${badTodosUrl}/${todoId}`)).rejects.toThrowErrorMatchingSnapshot();
      expect.assertions(1);
    });
  });
});
