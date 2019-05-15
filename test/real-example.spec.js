const { get } = require('https');
const { getHttps } = require('../lib/get-https');
const {
  getTodo,
  getTodos,
} = require('../lib/real-example');

describe('real example', () => {
  describe('https.get with callback', () => {
    it('succeeds when url is valid', (done) => {

      const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
      const todoId = 2;
      const callback = (response) => {
        let str = '';
        response.setEncoding('utf8');
        response.on('data', (data) => {
          str += data;
        });
        response.on('end', () => {
          const dataObj = JSON.parse(str);
          expect(dataObj).toMatchSnapshot({
            userId: expect.any(Number),
            id: expect.any(Number),
            title: expect.any(String),
            completed: expect.any(Boolean),
          });
          done();
        });

      };

      get(`${todosUrl}/${todoId}`, callback);
      expect.assertions(1);
    });

    // it('fails when something is not "something"', (done) => {
    //   const something = '';
    //   const theCallback = (result, err) => {
    //     expect(result).toBe(null);
    //     expect(err).toBeInstanceOf(TypeError);
    //     done();
    //   };

    //   myFuncWithCallback(something, theCallback);
    //   expect.assertions(2);
    // });
  });

});
