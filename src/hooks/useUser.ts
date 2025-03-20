import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  setUserInfo,
  setPermissions,
  setMenus,
  setToken,
  clearUserState,
} from '@/store/slices/userSlice';
import { login, getUserInfo, getUserPermissions, getUserMenus, logout } from '@/services/auth';
import { ILoginRequest } from '@/types/auth';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, permissions, menus, token, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const handleLogin = async (loginData: ILoginRequest) => {
    const response = await login(loginData);
    dispatch(setToken(response.token));
    return response;
  };

  const handleGetUserInfo = async () => {
    const userInfo = await getUserInfo();
    dispatch(setUserInfo(userInfo));
    return userInfo;
  };

  const handleGetUserPermissions = async () => {
    const permissions = await getUserPermissions();
    dispatch(setPermissions(permissions));
    return permissions;
  };

  const handleGetUserMenus = async () => {
    const menus = await getUserMenus();
    dispatch(setMenus(menus));
    return menus;
  };

  const handleLogout = async () => {
    await logout();
    dispatch(clearUserState());
  };

  return {
    userInfo,
    permissions,
    menus,
    token,
    isAuthenticated,
    login: handleLogin,
    getUserInfo: handleGetUserInfo,
    getUserPermissions: handleGetUserPermissions,
    getUserMenus: handleGetUserMenus,
    logout: handleLogout,
  };
}; 