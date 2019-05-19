import * as https from 'https';
import { promisify } from 'util';

type GetHttpsType = (url: string, options?: https.RequestOptions, cb?: (res: object) => void) => Promise<{}>;
https.get[promisify.custom] = (url: string): Promise<object> => (
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

export const getHttps: GetHttpsType = promisify(https.get);
