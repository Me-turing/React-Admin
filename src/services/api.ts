import axios from 'axios';

// 创建Axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 从本地存储获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      
      // 处理401未授权错误
      if (status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      // 处理其他错误
      console.error(`请求错误: ${status}`, error.response.data);
    } else {
      console.error('网络错误', error);
    }
    
    return Promise.reject(error);
  }
);

export default api; 