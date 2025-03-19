import React, { useState } from 'react';
import { Card, Typography, Table, Input, Button, Space, Tag, Avatar, Row, Col, Dropdown, Menu, Tooltip, DatePicker } from 'antd';
import { 
  UserOutlined, 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  MoreOutlined,
  ReloadOutlined,
  DownloadOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    name: '张三',
    username: 'zhangsan',
    department: '技术部',
    role: '开发工程师',
    email: 'zhangsan@example.com',
    phone: '13800138001',
    status: 'active',
    createTime: '2023-01-15 09:30:00',
  },
  {
    id: 2,
    name: '李四',
    username: 'lisi',
    department: '市场部',
    role: '市场专员',
    email: 'lisi@example.com',
    phone: '13800138002',
    status: 'active',
    createTime: '2023-02-20 14:20:00',
  },
  {
    id: 3,
    name: '王五',
    username: 'wangwu',
    department: '财务部',
    role: '财务主管',
    email: 'wangwu@example.com',
    phone: '13800138003',
    status: 'inactive',
    createTime: '2023-03-10 11:15:00',
  },
  {
    id: 4,
    name: '赵六',
    username: 'zhaoliu',
    department: '人力资源部',
    role: 'HR专员',
    email: 'zhaoliu@example.com',
    phone: '13800138004',
    status: 'active',
    createTime: '2023-04-05 16:45:00',
  },
  {
    id: 5,
    name: '钱七',
    username: 'qianqi',
    department: '技术部',
    role: '测试工程师',
    email: 'qianqi@example.com',
    phone: '13800138005',
    status: 'inactive',
    createTime: '2023-05-12 10:30:00',
  },
];

const UserManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockUsers);

  // 表格列配置
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户信息',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div>
            <div>{record.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.username}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (text: string, record: any) => (
        <div>
          <div>{record.email}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.phone}</Text>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '在职' : '离职'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (text: string, record: any) => (
        <Space size="middle">
          <Tooltip title="编辑">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="删除">
            <Button type="text" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} size="small" />
          </Tooltip>
          <Dropdown 
            overlay={
              <Menu>
                <Menu.Item key="1">查看详情</Menu.Item>
                <Menu.Item key="2">重置密码</Menu.Item>
                <Menu.Item key="3">禁用账号</Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type="text" icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.department.toLowerCase().includes(value.toLowerCase()) ||
        user.role.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // 刷新数据
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setFilteredData(mockUsers);
      setSearchText('');
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* 标题卡片 */}
      <Card 
        bordered={false}
        style={{ marginBottom: '24px' }}
      >
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={4} style={{ margin: 0 }}>用户管理</Title>
              <Text type="secondary">管理系统中的用户账号，控制用户权限，维护用户信息</Text>
            </Col>
            <Col>
              <Button type="primary" icon={<PlusOutlined />}>
                新增用户
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* 搜索卡片 */}
      <Card 
        bordered={false}
        style={{ marginBottom: '24px' }}
        bodyStyle={{ padding: '24px' }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Search
              placeholder="搜索用户名、部门、角色..."
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
          </Col>
          <Col xs={24} sm={24} md={8} lg={12} style={{ textAlign: 'right' }}>
            <Space>
              <Tooltip title="重置筛选">
                <Button icon={<ReloadOutlined />} onClick={refreshData} />
              </Tooltip>
              <Tooltip title="导出数据">
                <Button icon={<DownloadOutlined />} />
              </Tooltip>
              <Tooltip title="更多筛选">
                <Button icon={<FilterOutlined />} />
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 表格卡片 */}
      <Card 
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条数据`,
          }}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default UserManagement; 