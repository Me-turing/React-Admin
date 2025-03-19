import React from 'react';
import { RouteObject } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import UserManagement from '../pages/system/user';
import MenuManagement from '../pages/system/menu';
import RoleManagement from '../pages/system/role';
import DepartmentManagement from '../pages/system/department';
import ApiManagement from '../pages/system/api';
import LoginPage from '../pages/login';

// 定义路由配置
const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'system',
        children: [
          {
            path: 'user',
            element: <UserManagement />,
          },
          {
            path: 'menu',
            element: <MenuManagement />,
          },
          {
            path: 'role',
            element: <RoleManagement />,
          },
          {
            path: 'department',
            element: <DepartmentManagement />,
          },
          {
            path: 'api',
            element: <ApiManagement />,
          },
        ],
      },
    ],
  },
];

export default routes; 