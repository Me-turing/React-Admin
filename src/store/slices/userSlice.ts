import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserInfo, IPermission, IMenuItem } from '@/types/auth';

interface UserState {
  userInfo: IUserInfo | null;
  permissions: IPermission[];
  menus: IMenuItem[];
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userInfo: null,
  permissions: [],
  menus: [],
  token: localStorage.getItem('token'),
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    setPermissions: (state, action: PayloadAction<IPermission[]>) => {
      state.permissions = action.payload;
    },
    setMenus: (state, action: PayloadAction<IMenuItem[]>) => {
      state.menus = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearUserState: (state) => {
      state.userInfo = null;
      state.permissions = [];
      state.menus = [];
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const {
  setUserInfo,
  setPermissions,
  setMenus,
  setToken,
  clearUserState,
} = userSlice.actions;

export default userSlice.reducer; 