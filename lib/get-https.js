const { promisify } = require('util');
const https = require('https');

https.get[promisify.custom] = url => (
  new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let str = '';
      response.setEncoding('utf8');
      response.on('data', (data) => {
        str += data;
      });
      response.on('end', () => {
        resolve(JSON.parse(str));
      });
    }).on('error', reject);
  })
);

const getHttps = promisify(https.get);

module.exports = {
  getHttps,
};
