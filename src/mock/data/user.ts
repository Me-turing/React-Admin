import { faker } from '@faker-js/faker';

// 用户角色
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}

// 用户状态
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LOCKED = 'locked',
}

// 用户信息接口
export interface IUser {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  createTime: string;
  lastLoginTime?: string;
}

// 用户权限接口
export interface IUserPermission {
  id: string;
  userId: string;
  permissions: string[];
  roles: string[];
}

// 生成模拟用户数据
export const generateMockUser = (role: UserRole = UserRole.USER): IUser => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    role,
    status: UserStatus.ACTIVE,
    department: faker.company.name(),
    createTime: faker.date.past().toISOString(),
    lastLoginTime: faker.date.recent().toISOString(),
  };
};

// 生成模拟用户权限数据
export const generateMockUserPermission = (userId: string): IUserPermission => {
  return {
    id: faker.string.uuid(),
    userId,
    permissions: [
      'system:user:view',
      'system:user:edit',
      'system:role:view',
      'system:menu:view',
    ],
    roles: ['admin', 'manager'],
  };
};

// 模拟用户数据
export const mockUsers: IUser[] = [
  {
    id: '1',
    username: 'admin',
    name: '系统管理员',
    email: 'admin@example.com',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    department: '技术部',
    createTime: '2024-01-01T00:00:00.000Z',
    lastLoginTime: '2024-03-20T10:00:00.000Z',
  },
  {
    id: '2',
    username: 'manager',
    name: '部门经理',
    email: 'manager@example.com',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    role: UserRole.MANAGER,
    status: UserStatus.ACTIVE,
    department: '业务部',
    createTime: '2024-01-02T00:00:00.000Z',
    lastLoginTime: '2024-03-20T09:00:00.000Z',
  },
  {
    id: '3',
    username: 'user',
    name: '普通用户',
    email: 'user@example.com',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    department: '市场部',
    createTime: '2024-01-03T00:00:00.000Z',
    lastLoginTime: '2024-03-20T08:00:00.000Z',
  },
];

// 模拟用户权限数据
export const mockUserPermissions: IUserPermission[] = [
  {
    id: '1',
    userId: '1',
    permissions: [
      'system:user:view',
      'system:user:edit',
      'system:user:delete',
      'system:role:view',
      'system:role:edit',
      'system:role:delete',
      'system:menu:view',
      'system:menu:edit',
      'system:menu:delete',
    ],
    roles: ['admin'],
  },
  {
    id: '2',
    userId: '2',
    permissions: [
      'system:user:view',
      'system:user:edit',
      'system:role:view',
      'system:menu:view',
    ],
    roles: ['manager'],
  },
  {
    id: '3',
    userId: '3',
    permissions: [
      'system:user:view',
      'system:menu:view',
    ],
    roles: ['user'],
  },
]; 