import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ApiManagement: React.FC = () => {
  return (
    <Card>
      <Title level={2}>API管理</Title>
      <Paragraph>API管理页面 - 系统管理模块</Paragraph>
    </Card>
  );
};

export default ApiManagement; 