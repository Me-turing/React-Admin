import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
  };
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginForm) => {
    try {
      setLoading(true);
      // TODO: 实现登录逻辑
      await mockLogin(values);
      message.success('登录成功');
      navigate('/');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '登录失败，请重试';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 模拟登录请求
  const mockLogin = async (values: LoginForm): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.username === 'admin' && values.password === 'admin') {
          resolve({
            token: 'mock-token',
            user: {
              id: '1',
              username: 'admin',
              name: '管理员'
            }
          });
        } else {
          reject(new Error('用户名或密码错误'));
        }
      }, 1000);
    });
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
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
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

            {/* <div className={styles.securityInfo}>
              <SafetyCertificateOutlined />
              <span>系统采用多重加密技术，确保交易数据安全</span>
            </div> */}

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