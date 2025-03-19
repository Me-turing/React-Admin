import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const MenuManagement: React.FC = () => {
  return (
    <Card>
      <Title level={2}>菜单管理</Title>
      <Paragraph>菜单管理页面 - 系统管理模块</Paragraph>
    </Card>
  );
};

export default MenuManagement; 