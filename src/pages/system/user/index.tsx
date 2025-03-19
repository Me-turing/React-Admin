import React, { useState } from 'react';
import { Card, Typography, Table, Input, Button, Space, Tag, Avatar, Row, Col, Dropdown, Menu, Tooltip, DatePicker, Form, Select } from 'antd';
import { 
  UserOutlined, 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  MoreOutlined,
  ReloadOutlined,
  DownloadOutlined,
  DownOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

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

// 添加用户类型接口
interface User {
  id: number;
  name: string;
  username: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  status: string;
  createTime: string;
}

const UserManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<User[]>(mockUsers);
  const [searchCollapsed, setSearchCollapsed] = useState(false);

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
      render: (text: string, record: User) => (
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
      render: (_: unknown, record: User) => (
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
      render: () => (
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
      {/* 搜索卡片 - 可折叠 */}
      <Card 
        bordered={false}
        style={{ marginBottom: '24px' }}
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <Space>
                <SearchOutlined />
                <span>筛选条件</span>
              </Space>
            </Col>
            <Col>
              <Button 
                type="link" 
                icon={<DownOutlined rotate={searchCollapsed ? 180 : 0} />}
                onClick={() => setSearchCollapsed(!searchCollapsed)}
              >
                {searchCollapsed ? "展开" : "收起"}
              </Button>
            </Col>
          </Row>
        }
        bodyStyle={{ 
          padding: '24px', 
          display: searchCollapsed ? 'none' : 'block' 
        }}
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item 
              label="用户名称" 
              style={{ marginBottom: 0 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Search
                placeholder="搜索用户名、账号..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item 
              label="部门" 
              style={{ marginBottom: 0 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Select placeholder="选择部门" allowClear style={{ width: '100%' }}>
                <Option value="技术部">技术部</Option>
                <Option value="市场部">市场部</Option>
                <Option value="财务部">财务部</Option>
                <Option value="人力资源部">人力资源部</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item 
              label="状态" 
              style={{ marginBottom: 0 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Select placeholder="选择状态" allowClear style={{ width: '100%' }}>
                <Option value="active">在职</Option>
                <Option value="inactive">离职</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item 
              label="创建时间" 
              style={{ marginBottom: 0 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginTop: '16px' }}>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={refreshData}>重置</Button>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => handleSearch(searchText)}>搜索</Button>
              <Button icon={<DownloadOutlined />}>导出</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 列表内容卡片 */}
      <Card 
        bordered={false}
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <Space>
                <UserOutlined />
                <Title level={4} style={{ margin: 0 }}>用户列表</Title>
              </Space>
            </Col>
            <Col>
              <Button type="primary" icon={<PlusOutlined />}>
                新增用户
              </Button>
            </Col>
          </Row>
        }
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
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default UserManagement; 