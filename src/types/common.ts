// API响应通用接口
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 分页请求参数
export interface PaginationParams {
  current: number;
  pageSize: number;
}

// 分页响应数据
export interface PaginationResult<T> {
  list: T[];
  total: number;
  current: number;
  pageSize: number;
}

// 用户信息接口
export interface UserInfo {
  id: string;
  username: string;
  realName: string;
  avatar?: string;
  email?: string;
  phone?: string;
  roles: string[];
  permissions: string[];
}

// 菜单项接口
export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  path?: string;
  permission?: string;
} 