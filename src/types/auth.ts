// 登录请求参数
export interface ILoginRequest {
  username: string;
  password: string;
}

// 登录响应数据
export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
    avatar: string;
    role: string;
  };
}

// 用户信息
export interface IUserInfo {
  id: string;
  username: string;
  name: string;
  avatar: string;
  role: string;
  permissions: string[];
  roles: {
    id: string;
    name: string;
    code: string;
    description?: string;
  }[];
}

// 权限信息
export interface IPermission {
  id: string;
  name: string;
  code: string;
  type: 'menu' | 'button' | 'api';
  description?: string;
  parentId?: string;
  sort: number;
}

// 菜单信息
export interface IMenuItem {
  id: string;
  parentId?: string;
  name: string;
  path?: string;
  component?: string;
  icon?: string;
  type: 'directory' | 'menu' | 'button';
  permission?: string;
  sort: number;
  children?: IMenuItem[];
} 