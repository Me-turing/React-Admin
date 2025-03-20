import { loginHandler, getUserInfoHandler, logoutHandler } from './auth';
import { getUserPermissionsHandler, getUserMenusHandler } from './permission';

// 导出所有处理器
export const handlers = [
  // 认证相关
  loginHandler,
  getUserInfoHandler,
  logoutHandler,
  // 权限相关
  getUserPermissionsHandler,
  getUserMenusHandler,
]; 