import request from '@/utils/request';
import { ILoginRequest, ILoginResponse, IUserInfo, IMenuItem, IPermission } from '@/types/auth';

// 登录
export const login = (data: ILoginRequest): Promise<ILoginResponse> => {
  return request.post('/auth/login', data);
};

// 获取用户信息
export const getUserInfo = (): Promise<IUserInfo> => {
  return request.get('/auth/userInfo');
};

// 获取用户权限
export const getUserPermissions = (): Promise<IPermission[]> => {
  return request.get('/auth/permissions');
};

// 获取用户菜单
export const getUserMenus = (): Promise<IMenuItem[]> => {
  return request.get('/auth/menus');
};

// 退出登录
export const logout = (): Promise<void> => {
  return request.post('/auth/logout');
}; 