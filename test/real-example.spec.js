const { get } = require('https');
const { getHttps } = require('../lib/get-https');
const {
  getTodos,
} = require('../lib/real-example');

describe('real example', () => {
  const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  const todoId = 2;
  const snapshotMatcher = {
    userId: expect.any(Number),
    id: expect.any(Number),
    title: expect.any(String),
    completed: expect.any(Boolean),
  };

  describe('getting a todo with a callback', () => {
    it('succeeds when url is valid', (done) => {
      const callback = (response) => {
        let str = '';
        response.setEncoding('utf8');
        response.on('data', (data) => {
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
      const badTodosUrl = 'htps://jsonplaceholder.typicode.com/todos';
      const callback = () => {};

      expect(() => {
        get(`${badTodosUrl}/${todoId}`, callback);
      }).toThrowErrorMatchingSnapshot();
      expect.assertions(1);
    });
  });

  describe('getting a todo with getHttps', () => {
    it('succeeds when the todo is found', async () => {
      const getTodo = getHttps.bind(null, `${todosUrl}/${todoId}`);
      const todo = await getTodo(todoId);
      expect(todo).toMatchSnapshot(snapshotMatcher);
    });
    // it('succeeds when the todo is found', async () => {
    //   const todo = await getTodo(todoId);
    // });
  });
});
