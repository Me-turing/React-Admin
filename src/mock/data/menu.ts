import { IMenuItem } from '../../types/auth';

// 菜单类型
export enum MenuType {
  DIRECTORY = 'directory', // 目录
  MENU = 'menu',         // 菜单
  BUTTON = 'button',     // 按钮
}

// 模拟菜单数据
export const mockMenus: IMenuItem[] = [
  // 仪表盘
  {
    id: '1',
    name: '仪表盘',
    path: '/dashboard',
    component: 'Dashboard',
    icon: 'DashboardOutlined',
    type: 'menu',
    permission: 'dashboard:view',
    sort: 1,
  },

  // 系统管理
  {
    id: '2',
    name: '系统管理',
    path: '/system',
    icon: 'SettingOutlined',
    type: 'directory',
    permission: 'system:view',
    sort: 2,
    children: [
      // 用户管理
      {
        id: '2-1',
        parentId: '2',
        name: '用户管理',
        path: '/system/user',
        component: 'System/User',
        icon: 'UserOutlined',
        type: 'menu',
        permission: 'system:user:view',
        sort: 1,
        children: [
          {
            id: '2-1-1',
            parentId: '2-1',
            name: '查看用户',
            type: 'button',
            permission: 'system:user:view',
            sort: 1,
          },
          {
            id: '2-1-2',
            parentId: '2-1',
            name: '编辑用户',
            type: 'button',
            permission: 'system:user:edit',
            sort: 2,
          },
          {
            id: '2-1-3',
            parentId: '2-1',
            name: '删除用户',
            type: 'button',
            permission: 'system:user:delete',
            sort: 3,
          },
        ],
      },
      // 角色管理
      {
        id: '2-2',
        parentId: '2',
        name: '角色管理',
        path: '/system/role',
        component: 'System/Role',
        icon: 'TeamOutlined',
        type: 'menu',
        permission: 'system:role:view',
        sort: 2,
        children: [
          {
            id: '2-2-1',
            parentId: '2-2',
            name: '查看角色',
            type: 'button',
            permission: 'system:role:view',
            sort: 1,
          },
          {
            id: '2-2-2',
            parentId: '2-2',
            name: '编辑角色',
            type: 'button',
            permission: 'system:role:edit',
            sort: 2,
          },
          {
            id: '2-2-3',
            parentId: '2-2',
            name: '删除角色',
            type: 'button',
            permission: 'system:role:delete',
            sort: 3,
          },
        ],
      },
      // 菜单管理
      {
        id: '2-3',
        parentId: '2',
        name: '菜单管理',
        path: '/system/menu',
        component: 'System/Menu',
        icon: 'AppstoreOutlined',
        type: 'menu',
        permission: 'system:menu:view',
        sort: 3,
        children: [
          {
            id: '2-3-1',
            parentId: '2-3',
            name: '查看菜单',
            type: 'button',
            permission: 'system:menu:view',
            sort: 1,
          },
          {
            id: '2-3-2',
            parentId: '2-3',
            name: '编辑菜单',
            type: 'button',
            permission: 'system:menu:edit',
            sort: 2,
          },
          {
            id: '2-3-3',
            parentId: '2-3',
            name: '删除菜单',
            type: 'button',
            permission: 'system:menu:delete',
            sort: 3,
          },
        ],
      },
      // 部门管理
      {
        id: '2-4',
        parentId: '2',
        name: '部门管理',
        path: '/system/department',
        component: 'System/Department',
        icon: 'ApartmentOutlined',
        type: 'menu',
        permission: 'system:department:view',
        sort: 4,
        children: [
          {
            id: '2-4-1',
            parentId: '2-4',
            name: '查看部门',
            type: 'button',
            permission: 'system:department:view',
            sort: 1,
          },
          {
            id: '2-4-2',
            parentId: '2-4',
            name: '编辑部门',
            type: 'button',
            permission: 'system:department:edit',
            sort: 2,
          },
          {
            id: '2-4-3',
            parentId: '2-4',
            name: '删除部门',
            type: 'button',
            permission: 'system:department:delete',
            sort: 3,
          },
        ],
      },
      // API管理
      {
        id: '2-5',
        parentId: '2',
        name: 'API管理',
        path: '/system/api',
        component: 'System/Api',
        icon: 'ApiOutlined',
        type: 'menu',
        permission: 'system:api:view',
        sort: 5,
        children: [
          {
            id: '2-5-1',
            parentId: '2-5',
            name: '查看API',
            type: 'button',
            permission: 'system:api:view',
            sort: 1,
          },
          {
            id: '2-5-2',
            parentId: '2-5',
            name: '编辑API',
            type: 'button',
            permission: 'system:api:edit',
            sort: 2,
          },
          {
            id: '2-5-3',
            parentId: '2-5',
            name: '删除API',
            type: 'button',
            permission: 'system:api:delete',
            sort: 3,
          },
        ],
      },
    ],
  },

  // 日志管理
  {
    id: '3',
    name: '日志管理',
    path: '/log',
    icon: 'FileOutlined',
    type: 'directory',
    permission: 'log:view',
    sort: 3,
    children: [
      // 操作日志
      {
        id: '3-1',
        parentId: '3',
        name: '操作日志',
        path: '/log/operation',
        component: 'Log/Operation',
        icon: 'UnorderedListOutlined',
        type: 'menu',
        permission: 'log:operation:view',
        sort: 1,
      },
      // 登录日志
      {
        id: '3-2',
        parentId: '3',
        name: '登录日志',
        path: '/log/login',
        component: 'Log/Login',
        icon: 'SafetyOutlined',
        type: 'menu',
        permission: 'log:login:view',
        sort: 2,
      },
    ],
  },
]; 