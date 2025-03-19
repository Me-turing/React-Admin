import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  return (
    <Card>
      <Title level={2}>仪表盘</Title>
      <Paragraph>欢迎使用大额资金管理系统仪表盘页面</Paragraph>
    </Card>
  );
};

export default Dashboard; 