import { get } from 'https';
// const { promisify } = require('util');
import { getHttps } from './get-https';

// const {
//   getImprovedErrorMsg,
// } = require('../helpers/helpers');

// const callback = (response) => {
//   response.setEncoding('utf8');
//   response.on('data', (data) => {
//     console.log(JSON.parse(data));
//   });
// };

const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
// const todoId = 2;
// get(`${todosUrl}/${todoId}`, callback);

// const getAsyncThatWillNotWork = promisify(get);
// try {
//   await getAsyncThatWillNotWork(`${todosUrl}/${todoId}`);
// } catch (err) {
//   console.log('An error has occurred');
// }

const getTodos = getHttps.bind(null, todosUrl);
const getTodo = (id: number) => (
  getHttps(`${todosUrl}/${id}`)
);
(async () => {
  try {
    const todos = await getTodos();
    const todo = await getTodo(1);
    console.log(JSON.stringify(todos[0]) === JSON.stringify(todo));
    console.log(todo);
    // await getHttps('f');
  } catch (err) {
    console.log(err);
  }
})();

module.exports = {
  getTodo,
  getTodos,
};
