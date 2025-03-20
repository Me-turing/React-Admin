import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 创建Mock服务
export const worker = setupWorker(...handlers); 