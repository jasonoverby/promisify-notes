import { IncomingMessage, ServerResponse } from 'http';
import {
  get,
  RequestOptions,
} from 'https';
import { promisify } from 'util';

type HttpsGetCb = (response: IncomingMessage) => void;
type GetHttpsType = (url: string, options?: RequestOptions, cb?: HttpsGetCb) => Promise<{}>;
get[promisify.custom] = (url: string): Promise<{}> => (
  new Promise((resolve, reject) => {
    get(url, (response: IncomingMessage) => {
      let str = '';
      response.on('data', (data: ServerResponse) => {
        str += data;
      });
      response.on('end', () => {
        resolve(JSON.parse(str));
      });
    }).on('error', reject);
  })
);

const getHttps: GetHttpsType = promisify(get);

export {
  getHttps,
  GetHttpsType,
  HttpsGetCb,
};
