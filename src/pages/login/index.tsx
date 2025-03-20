import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import styles from './index.module.less';

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, getUserInfo, getUserPermissions, getUserMenus, token } = useUser();
  const [form] = Form.useForm<LoginForm>();

  // 从localStorage获取保存的用户名和密码
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');

  const onFinish = async (values: LoginForm) => {
    try {
      setLoading(true);
      
      // 1. 调用登录API
      const loginResponse = await login({
        username: values.username,
        password: values.password,
      });

      // 2. 验证登录响应
      if (!loginResponse?.token) {
        throw new Error('登录失败: 未获取到token');
      }

      // 3. 获取用户信息
      const userInfo = await getUserInfo();
      if (!userInfo) {
        throw new Error('获取用户信息失败');
      }

      // 4. 获取用户权限
      const permissions = await getUserPermissions();
      if (!permissions?.length) {
        throw new Error('获取用户权限失败');
      }

      // 5. 获取用户菜单
      const menus = await getUserMenus();
      if (!menus?.length) {
        throw new Error('获取用户菜单失败');
      }

      // 6. 处理"记住我"功能
      if (values.remember) {
        localStorage.setItem('username', values.username);
        localStorage.setItem('password', values.password);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }

      // 7. 验证最终状态
      if (!token) {
        throw new Error('登录状态异常');
      }

      message.success('登录成功');
      navigate('/');
    } catch (error) {
      console.error('登录失败:', error);
      message.error(error instanceof Error ? error.message : '登录失败,请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* 左侧图片区域 */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeImage}>
          {/* TODO: 替换为实际的图片路径 */}
          <img src="/src/assets/images/login-bg.jpg" alt="Welcome" />
        </div>
      </div>

      {/* 右侧登录区域 */}
      <div className={styles.loginSection}>
        <div className={styles.loginContainer}>
          <div className={styles.loginHeader}>
            <h2>XXXX管理系统</h2>
            <p>请使用您的工号和密码登录</p>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            initialValues={{
              username: savedUsername || '',
              password: savedPassword || '',
              remember: !!savedUsername,
            }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入工号' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入工号"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <div className={styles.loginFormOptions}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住工号</Checkbox>
                </Form.Item>
                <a href="/forgot-password" className={styles.forgotPassword}>
                  忘记密码?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
                loading={loading}
                block
              >
                安全登录
              </Button>
            </Form.Item>

            <div className={styles.loginNotice}>
              <p>
                <strong>安全提示：</strong>
                本系统仅限内部授权人员访问，所有操作将被记录并审计。如遇登录问题，请联系系统管理员。
              </p>
            </div>

            <div className={styles.loginFooter}>
              Copyright © 2025 XXXX 管理系统 版权所有
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 