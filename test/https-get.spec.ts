import { IncomingMessage, ServerResponse } from 'http';
import { get } from 'https';
import { promisify } from 'util';
import { getHttps, GetHttpsType, HttpsGetCb } from '../lib/get-https';

describe('https.get', () => {
  const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  const badTodosUrl = 'htps://jsonplaceholder.typicode.com/todos';
  const todoId = 2;
  const snapshotMatcher = {
    completed: expect.any(Boolean),
    id: expect.any(Number),
    title: expect.any(String),
    userId: expect.any(Number),
  };

  describe('getting a todo with a callback', () => {
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

      get(`${todosUrl}/${todoId}`, {}, callback);
      expect.assertions(1);
    });

    it('fails when url is invalid', () => {
      const callback = () => null;

      expect(() => {
        get(`${badTodosUrl}/${todoId}`, callback);
      }).toThrowErrorMatchingSnapshot();
      expect.assertions(1);
    });

    it('promisifies', async () => {
      const promisifiedGet: GetHttpsType = promisify(get);
      const todo = await promisifiedGet(`${todosUrl}/${todoId}`);
      expect(todo).toMatchSnapshot(snapshotMatcher);
    });
  });

  describe('httpsGet', () => {
    it('succeeds when url is valid', async () => {
      const todo = await getHttps(`${todosUrl}/${todoId}`);
      expect(todo).toMatchSnapshot(snapshotMatcher);
      expect.assertions(1);
    });

    it('fails when url is valid', async () => {
      await expect(getHttps(`${badTodosUrl}/${todoId}`)).rejects.toThrowErrorMatchingSnapshot();
      expect.assertions(1);
    });

    describe('getting a todo with getHttps', () => {
      const getTodo = (id: number) => getHttps(`${todosUrl}/${id}`);

      it('succeeds when the todo is found', async () => {
        const todo = await getTodo(todoId);
        expect(todo).toMatchSnapshot(snapshotMatcher);
        expect.assertions(1);
      });

      it('receives empty object when the todo is not found', async () => {
        const nonexistentTodo = await getTodo(1000);
        expect(JSON.stringify(nonexistentTodo)).toMatch('{}');
        expect(nonexistentTodo).not.toHaveProperty('id');
        expect.assertions(2);
      });
    });
  });
});
