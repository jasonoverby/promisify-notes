import { IncomingMessage, ServerResponse } from 'http';
import {
  get,
  RequestOptions,
} from 'https';
import { promisify } from 'util';

type HttpsGetCb = (response: IncomingMessage) => void;
type HttpsGetType = (url: string | URL, options?: RequestOptions, callback?: HttpsGetCb) => {};
get[promisify.custom] = (url: string, options: RequestOptions = {}): Promise<{}> => (
  new Promise((resolve, reject) => {
    const callback: HttpsGetCb = (response: IncomingMessage) => {
      let str = '';
      response.on('data', (data: ServerResponse) => {
        str += data;
      });
      response.on('end', () => {
        resolve(JSON.parse(str));
      });
    };
    get(url, options, callback).on('error', reject);
  })
);

export {
  get,
  HttpsGetType,
  HttpsGetCb,
};
