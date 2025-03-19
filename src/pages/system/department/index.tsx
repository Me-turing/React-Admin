import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const DepartmentManagement: React.FC = () => {
  return (
    <Card>
      <Title level={2}>部门管理</Title>
      <Paragraph>部门管理页面 - 系统管理模块</Paragraph>
    </Card>
  );
};

export default DepartmentManagement; 