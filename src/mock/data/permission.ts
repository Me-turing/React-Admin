// 权限类型
export enum PermissionType {
  MENU = 'menu',     // 菜单权限
  BUTTON = 'button', // 按钮权限
  API = 'api',       // API权限
}

// 权限接口
export interface IPermission {
  id: string;
  name: string;
  code: string;
  type: PermissionType;
  description?: string;
  parentId?: string;
  sort: number;
}

// 角色接口
export interface IRole {
  id: string;
  name: string;
  code: string;
  description?: string;
  permissions: string[];
  createTime: string;
  updateTime: string;
}

// 模拟权限数据
export const mockPermissions: IPermission[] = [
  // 仪表盘权限
  {
    id: '1',
    name: '仪表盘',
    code: 'dashboard:view',
    type: PermissionType.MENU,
    description: '查看仪表盘',
    sort: 1,
  },

  // 系统管理权限
  {
    id: '2',
    name: '系统管理',
    code: 'system:view',
    type: PermissionType.MENU,
    description: '系统管理模块',
    sort: 2,
  },
  // 用户管理权限
  {
    id: '2-1',
    name: '用户管理',
    code: 'system:user:view',
    type: PermissionType.MENU,
    description: '查看用户管理',
    parentId: '2',
    sort: 1,
  },
  {
    id: '2-1-1',
    name: '查看用户',
    code: 'system:user:view',
    type: PermissionType.BUTTON,
    description: '查看用户列表',
    parentId: '2-1',
    sort: 1,
  },
  {
    id: '2-1-2',
    name: '编辑用户',
    code: 'system:user:edit',
    type: PermissionType.BUTTON,
    description: '编辑用户信息',
    parentId: '2-1',
    sort: 2,
  },
  {
    id: '2-1-3',
    name: '删除用户',
    code: 'system:user:delete',
    type: PermissionType.BUTTON,
    description: '删除用户',
    parentId: '2-1',
    sort: 3,
  },
  // 角色管理权限
  {
    id: '2-2',
    name: '角色管理',
    code: 'system:role:view',
    type: PermissionType.MENU,
    description: '查看角色管理',
    parentId: '2',
    sort: 2,
  },
  {
    id: '2-2-1',
    name: '查看角色',
    code: 'system:role:view',
    type: PermissionType.BUTTON,
    description: '查看角色列表',
    parentId: '2-2',
    sort: 1,
  },
  {
    id: '2-2-2',
    name: '编辑角色',
    code: 'system:role:edit',
    type: PermissionType.BUTTON,
    description: '编辑角色信息',
    parentId: '2-2',
    sort: 2,
  },
  {
    id: '2-2-3',
    name: '删除角色',
    code: 'system:role:delete',
    type: PermissionType.BUTTON,
    description: '删除角色',
    parentId: '2-2',
    sort: 3,
  },
  // 菜单管理权限
  {
    id: '2-3',
    name: '菜单管理',
    code: 'system:menu:view',
    type: PermissionType.MENU,
    description: '查看菜单管理',
    parentId: '2',
    sort: 3,
  },
  {
    id: '2-3-1',
    name: '查看菜单',
    code: 'system:menu:view',
    type: PermissionType.BUTTON,
    description: '查看菜单列表',
    parentId: '2-3',
    sort: 1,
  },
  {
    id: '2-3-2',
    name: '编辑菜单',
    code: 'system:menu:edit',
    type: PermissionType.BUTTON,
    description: '编辑菜单信息',
    parentId: '2-3',
    sort: 2,
  },
  {
    id: '2-3-3',
    name: '删除菜单',
    code: 'system:menu:delete',
    type: PermissionType.BUTTON,
    description: '删除菜单',
    parentId: '2-3',
    sort: 3,
  },
  // 部门管理权限
  {
    id: '2-4',
    name: '部门管理',
    code: 'system:department:view',
    type: PermissionType.MENU,
    description: '查看部门管理',
    parentId: '2',
    sort: 4,
  },
  {
    id: '2-4-1',
    name: '查看部门',
    code: 'system:department:view',
    type: PermissionType.BUTTON,
    description: '查看部门列表',
    parentId: '2-4',
    sort: 1,
  },
  {
    id: '2-4-2',
    name: '编辑部门',
    code: 'system:department:edit',
    type: PermissionType.BUTTON,
    description: '编辑部门信息',
    parentId: '2-4',
    sort: 2,
  },
  {
    id: '2-4-3',
    name: '删除部门',
    code: 'system:department:delete',
    type: PermissionType.BUTTON,
    description: '删除部门',
    parentId: '2-4',
    sort: 3,
  },
  // API管理权限
  {
    id: '2-5',
    name: 'API管理',
    code: 'system:api:view',
    type: PermissionType.MENU,
    description: '查看API管理',
    parentId: '2',
    sort: 5,
  },
  {
    id: '2-5-1',
    name: '查看API',
    code: 'system:api:view',
    type: PermissionType.BUTTON,
    description: '查看API列表',
    parentId: '2-5',
    sort: 1,
  },
  {
    id: '2-5-2',
    name: '编辑API',
    code: 'system:api:edit',
    type: PermissionType.BUTTON,
    description: '编辑API信息',
    parentId: '2-5',
    sort: 2,
  },
  {
    id: '2-5-3',
    name: '删除API',
    code: 'system:api:delete',
    type: PermissionType.BUTTON,
    description: '删除API',
    parentId: '2-5',
    sort: 3,
  },

  // 日志管理权限
  {
    id: '3',
    name: '日志管理',
    code: 'log:view',
    type: PermissionType.MENU,
    description: '日志管理模块',
    sort: 3,
  },
  // 操作日志权限
  {
    id: '3-1',
    name: '操作日志',
    code: 'log:operation:view',
    type: PermissionType.MENU,
    description: '查看操作日志',
    parentId: '3',
    sort: 1,
  },
  // 登录日志权限
  {
    id: '3-2',
    name: '登录日志',
    code: 'log:login:view',
    type: PermissionType.MENU,
    description: '查看登录日志',
    parentId: '3',
    sort: 2,
  },
];

// 模拟角色数据
export const mockRoles: IRole[] = [
  {
    id: '1',
    name: '超级管理员',
    code: 'admin',
    description: '系统超级管理员',
    permissions: mockPermissions.map(p => p.code),
    createTime: '2024-01-01T00:00:00.000Z',
    updateTime: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: '部门经理',
    code: 'manager',
    description: '部门经理',
    permissions: [
      'dashboard:view',
      'system:view',
      'system:user:view',
      'system:user:edit',
      'system:role:view',
      'system:menu:view',
      'system:department:view',
      'system:api:view',
      'log:view',
      'log:operation:view',
      'log:login:view',
    ],
    createTime: '2024-01-02T00:00:00.000Z',
    updateTime: '2024-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    name: '普通用户',
    code: 'user',
    description: '普通用户',
    permissions: [
      'dashboard:view',
      'system:view',
      'system:user:view',
      'system:role:view',
      'system:menu:view',
      'system:department:view',
      'system:api:view',
      'log:view',
      'log:operation:view',
      'log:login:view',
    ],
    createTime: '2024-01-03T00:00:00.000Z',
    updateTime: '2024-01-03T00:00:00.000Z',
  },
]; 