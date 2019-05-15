const { get } = require('https');
// const { promisify } = require('util');
const { getHttps } = require('./get-https');

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
const getTodo = id => (
  getHttps(`${todosUrl}/${id}`)
);
// try {
//   const todos = await getTodos();
//   const todo = await getTodo(1);
//   console.log(JSON.stringify(todos[0]) === JSON.stringify(todo));
//   console.log(todo);
//   await getHttps('f');
// } catch (err) {
//   console.log(getImprovedErrorMsg(err));
// }

module.exports = {
  getTodo,
  getTodos,
};
