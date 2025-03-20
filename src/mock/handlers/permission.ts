import { http, HttpResponse } from 'msw';
import { mockUserPermissions } from '../data/user';
import { mockMenus } from '../data/menu';
import { mockPermissions } from '../data/permission';
import { IPermission, IMenuItem } from '../../types/auth';

// 获取用户权限列表接口
export const getUserPermissionsHandler = http.get('/api/auth/permissions', async ({ request }) => {
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

  // 获取用户权限详情
  const permissions: IPermission[] = mockPermissions.filter(p => userPermission.permissions.includes(p.code));

  // 返回权限列表
  return HttpResponse.json({
    code: 200,
    message: '获取成功',
    data: permissions,
    success: true,
  });
});

// 获取用户菜单接口
export const getUserMenusHandler = http.get('/api/auth/menus', async ({ request }) => {
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

  // 过滤用户可访问的菜单
  const filterMenus = (menus: IMenuItem[]): IMenuItem[] => {
    return menus.filter(menu => {
      // 检查菜单权限
      if (menu.permission && !userPermission.permissions.includes(menu.permission)) {
        return false;
      }

      // 递归过滤子菜单
      if (menu.children) {
        menu.children = filterMenus(menu.children);
        // 如果子菜单为空,则不显示父菜单
        return menu.children.length > 0;
      }

      return true;
    });
  };

  const userMenus = filterMenus(mockMenus);

  // 返回菜单列表
  return HttpResponse.json({
    code: 200,
    message: '获取成功',
    data: userMenus,
    success: true,
  });
}); 