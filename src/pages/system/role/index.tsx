import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const RoleManagement: React.FC = () => {
  return (
    <Card>
      <Title level={2}>角色管理</Title>
      <Paragraph>角色管理页面 - 系统管理模块</Paragraph>
    </Card>
  );
};

export default RoleManagement; 