import { http, HttpResponse } from 'msw';
import { mockUsers, mockUserPermissions } from '../data/user';
import { mockRoles } from '../data/permission';
import { ILoginRequest, ILoginResponse, IUserInfo } from '../../types/auth';

// 登录接口
export const loginHandler = http.post('/api/auth/login', async ({ request }) => {
  const { username, password } = await request.json() as ILoginRequest;

  // 模拟登录验证
  const user = mockUsers.find(u => u.username === username);
  if (!user || password !== '123456') {
    return HttpResponse.json(
      {
        code: 401,
        message: '用户名或密码错误',
        success: false,
      },
      { status: 401 }
    );
  }

  // 生成token
  const token = `mock-token-${user.id}`;

  // 返回登录成功信息
  const response: ILoginResponse = {
    token,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      avatar: user.avatar || '',
      role: user.role,
    },
  };

  return HttpResponse.json({
    code: 200,
    message: '登录成功',
    data: response,
    success: true,
  });
});

// 获取用户信息接口
export const getUserInfoHandler = http.get('/api/auth/userInfo', async ({ request }) => {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return HttpResponse.json(
      {
        code: 401,
        message: '未登录或登录已过期',
        success: false,
      },
      { status: 401 }
    );
  }

  // 从token中获取用户ID
  const userId = token.replace('mock-token-', '');
  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    return HttpResponse.json(
      {
        code: 401,
        message: '用户不存在',
        success: false,
      },
      { status: 401 }
    );
  }

  // 获取用户权限
  const userPermission = mockUserPermissions.find(p => p.userId === userId);
  if (!userPermission) {
    return HttpResponse.json(
      {
        code: 500,
        message: '获取用户权限失败',
        success: false,
      },
      { status: 500 }
    );
  }

  // 获取用户角色信息
  const roles = mockRoles.filter(r => userPermission.roles.includes(r.code));

  // 返回用户信息
  const userInfo: IUserInfo = {
    id: user.id,
    username: user.username,
    name: user.name,
    avatar: user.avatar || '',
    role: user.role,
    permissions: userPermission.permissions,
    roles: roles.map(r => ({
      id: r.id,
      name: r.name,
      code: r.code,
      description: r.description,
    })),
  };

  return HttpResponse.json({
    code: 200,
    message: '获取成功',
    data: userInfo,
    success: true,
  });
});

// 退出登录接口
export const logoutHandler = http.post('/api/auth/logout', () => {
  return HttpResponse.json({
    code: 200,
    message: '退出成功',
    success: true,
  });
}); 