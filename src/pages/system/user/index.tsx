import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const UserManagement: React.FC = () => {
  return (
    <Card>
      <Title level={2}>用户管理</Title>
      <Paragraph>用户管理页面 - 系统管理模块</Paragraph>
    </Card>
  );
};

export default UserManagement; 