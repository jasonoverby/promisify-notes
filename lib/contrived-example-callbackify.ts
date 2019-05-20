import { callbackify } from 'util';
import { getMsgAfterRandomSecsAsync } from './contrived-example-promisify';

export const getMsgAfterRandomSecsCallback = callbackify(getMsgAfterRandomSecsAsync);
