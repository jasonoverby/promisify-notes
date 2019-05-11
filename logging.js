const chalk = require('chalk');

const logImprovedErrorMsg = (err) => {
  const msg = chalk.red(err.stack.toString().split('\n').slice(0, 2).join('\n'));
  console.error(msg);
};

const logInBlue = (str) => {
  console.log(chalk.blue(str));
};

const logInMagenta = (str) => {
  console.log(chalk.magenta(str));
};

module.exports = {
  logImprovedErrorMsg,
  logInBlue,
  logInMagenta,
};
