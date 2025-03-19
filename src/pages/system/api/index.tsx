import React, { useState } from 'react';
import { Card, Typography, Table, Input, Button, Space, Tag, Row, Col, Tooltip, Drawer, Form, Radio, Select, Divider, Badge, Switch } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ReloadOutlined,
  ApiOutlined,
  CodeOutlined,
  LinkOutlined,
  RocketOutlined,
  LockOutlined,
  UnlockOutlined,
  SafetyOutlined,
  ExportOutlined,
  ImportOutlined,
  DownOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

// 模拟API数据
const mockApis = [
  {
    id: 1,
    name: '获取用户列表',
    path: '/api/users',
    method: 'GET',
    category: 'user',
    status: 'published',
    auth: true,
    description: '分页获取系统用户列表',
    createTime: '2023-01-15 09:30:00',
    updateTime: '2023-02-10 14:20:00',
  },
  {
    id: 2,
    name: '获取用户详情',
    path: '/api/users/:id',
    method: 'GET',
    category: 'user',
    status: 'published',
    auth: true,
    description: '根据用户ID获取用户详细信息',
    createTime: '2023-01-15 10:00:00',
    updateTime: '2023-02-10 14:22:00',
  },
  {
    id: 3,
    name: '创建用户',
    path: '/api/users',
    method: 'POST',
    category: 'user',
    status: 'published',
    auth: true,
    description: '创建新用户',
    createTime: '2023-01-15 10:30:00',
    updateTime: '2023-02-10 14:25:00',
  },
  {
    id: 4,
    name: '更新用户',
    path: '/api/users/:id',
    method: 'PUT',
    category: 'user',
    status: 'published',
    auth: true,
    description: '更新用户信息',
    createTime: '2023-01-15 11:00:00',
    updateTime: '2023-02-10 14:28:00',
  },
  {
    id: 5,
    name: '删除用户',
    path: '/api/users/:id',
    method: 'DELETE',
    category: 'user',
    status: 'published',
    auth: true,
    description: '删除用户',
    createTime: '2023-01-15 11:30:00',
    updateTime: '2023-02-10 14:30:00',
  },
  {
    id: 6,
    name: '用户登录',
    path: '/api/auth/login',
    method: 'POST',
    category: 'auth',
    status: 'published',
    auth: false,
    description: '用户登录接口',
    createTime: '2023-01-16 09:00:00',
    updateTime: '2023-02-12 10:15:00',
  },
  {
    id: 7,
    name: '刷新Token',
    path: '/api/auth/refresh',
    method: 'POST',
    category: 'auth',
    status: 'published',
    auth: true,
    description: '刷新用户访问令牌',
    createTime: '2023-01-16 09:30:00',
    updateTime: '2023-02-12 10:20:00',
  },
  {
    id: 8,
    name: '获取角色列表',
    path: '/api/roles',
    method: 'GET',
    category: 'role',
    status: 'published',
    auth: true,
    description: '获取系统角色列表',
    createTime: '2023-01-17 10:00:00',
    updateTime: '2023-02-15 11:30:00',
  },
  {
    id: 9,
    name: '文件上传',
    path: '/api/files/upload',
    method: 'POST',
    category: 'file',
    status: 'draft',
    auth: true,
    description: '上传文件到服务器',
    createTime: '2023-01-18 14:00:00',
    updateTime: '2023-01-18 14:00:00',
  },
  {
    id: 10,
    name: '系统监控数据',
    path: '/api/monitor/stats',
    method: 'GET',
    category: 'monitor',
    status: 'testing',
    auth: true,
    description: '获取系统监控统计数据',
    createTime: '2023-01-20 16:00:00',
    updateTime: '2023-02-18 09:45:00',
  },
];

// 模拟API类别
const apiCategories = [
  { value: 'user', label: '用户管理' },
  { value: 'role', label: '角色管理' },
  { value: 'auth', label: '认证授权' },
  { value: 'file', label: '文件管理' },
  { value: 'monitor', label: '系统监控' },
];

// API表单接口
interface ApiFormData {
  id?: number;
  name: string;
  path: string;
  method: string;
  category: string;
  status: string;
  auth: boolean;
  description: string;
}

// 获取方法标签颜色
const getMethodColor = (method: string) => {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'blue';
    case 'POST':
      return 'green';
    case 'PUT':
      return 'orange';
    case 'DELETE':
      return 'red';
    case 'PATCH':
      return 'purple';
    default:
      return 'default';
  }
};

// 获取状态标签
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'published':
      return <Badge status="success" text="已发布" />;
    case 'testing':
      return <Badge status="processing" text="测试中" />;
    case 'draft':
      return <Badge status="default" text="草稿" />;
    case 'deprecated':
      return <Badge status="error" text="已弃用" />;
    default:
      return <Badge status="default" text={status} />;
  }
};

const ApiManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterMethod, setFilterMethod] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [form] = Form.useForm<ApiFormData>();
  const [searchCollapsed, setSearchCollapsed] = useState(true);
  
  // 表格列配置
  const columns = [
    {
      title: 'API名称',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      render: (text: string, record: typeof mockApis[0]) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.path}</Text>
        </Space>
      ),
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      key: 'method',
      width: 100,
      render: (method: string) => (
        <Tag color={getMethodColor(method)}>{method.toUpperCase()}</Tag>
      ),
    },
    {
      title: '所属分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => {
        const categoryObj = apiCategories.find(c => c.value === category);
        return categoryObj ? categoryObj.label : category;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => getStatusBadge(status),
    },
    {
      title: '鉴权',
      dataIndex: 'auth',
      key: 'auth',
      width: 80,
      render: (auth: boolean) => (
        auth ? <LockOutlined style={{ color: '#ff4d4f' }} /> : <UnlockOutlined style={{ color: '#52c41a' }} />
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: unknown, record: typeof mockApis[0]) => (
        <Space size="middle">
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small" 
              onClick={() => handleEditApi(record)}
            />
          </Tooltip>
          <Tooltip title="复制">
            <Button 
              type="text" 
              icon={<CodeOutlined />} 
              size="small" 
              onClick={() => handleCloneApi(record)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small" 
              danger
              onClick={() => handleDeleteApi(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  // 获取过滤后的API数据
  const getFilteredApis = () => {
    return mockApis.filter(api => {
      // 文本搜索
      const matchesSearch = searchText
        ? api.name.toLowerCase().includes(searchText.toLowerCase()) ||
          api.path.toLowerCase().includes(searchText.toLowerCase()) ||
          api.description.toLowerCase().includes(searchText.toLowerCase())
        : true;
      
      // 分类过滤
      const matchesCategory = filterCategory
        ? api.category === filterCategory
        : true;
      
      // 方法过滤
      const matchesMethod = filterMethod
        ? api.method.toUpperCase() === filterMethod.toUpperCase()
        : true;
      
      // 状态过滤
      const matchesStatus = filterStatus
        ? api.status === filterStatus
        : true;
        
      return matchesSearch && matchesCategory && matchesMethod && matchesStatus;
    });
  };
  
  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchText(value);
  };
  
  // 刷新数据
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearchText('');
      setFilterCategory(null);
      setFilterMethod(null);
      setFilterStatus(null);
    }, 500);
  };
  
  // 处理过滤
  const handleCategoryFilter = (value: string) => {
    setFilterCategory(value || null);
  };
  
  const handleMethodFilter = (value: string) => {
    setFilterMethod(value || null);
  };
  
  const handleStatusFilter = (value: string) => {
    setFilterStatus(value || null);
  };
  
  // 添加API
  const handleAddApi = () => {
    setFormMode('add');
    form.resetFields();
    form.setFieldsValue({
      method: 'GET',
      category: 'user',
      status: 'draft',
      auth: true,
    });
    setDrawerVisible(true);
  };
  
  // 编辑API
  const handleEditApi = (record: typeof mockApis[0]) => {
    setFormMode('edit');
    form.resetFields();
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      path: record.path,
      method: record.method,
      category: record.category,
      status: record.status,
      auth: record.auth,
      description: record.description,
    });
    setDrawerVisible(true);
  };
  
  // 克隆API
  const handleCloneApi = (record: typeof mockApis[0]) => {
    setFormMode('add');
    form.resetFields();
    form.setFieldsValue({
      name: `${record.name} (复制)`,
      path: record.path,
      method: record.method,
      category: record.category,
      status: 'draft',
      auth: record.auth,
      description: record.description,
    });
    setDrawerVisible(true);
  };
  
  // 删除API
  const handleDeleteApi = (record: typeof mockApis[0]) => {
    console.log('删除API', record.id);
    // 实际项目中这里应该调用后端接口删除API
  };
  
  // 提交表单
  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log('提交表单', values);
      // 实际项目中这里应该调用后端接口保存API
      setDrawerVisible(false);
    });
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
              <Title level={4} style={{ margin: 0 }}>API管理</Title>
              <Text type="secondary">管理系统API接口，设置请求路径和权限控制</Text>
            </Col>
            <Col>
              <Space>
                <Button icon={<ExportOutlined />}>导出API</Button>
                <Button icon={<ImportOutlined />}>导入API</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddApi}>
                  新增API
                </Button>
              </Space>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* 搜索卡片 */}
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
              label="API名称" 
              style={{ marginBottom: 0 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Search
                placeholder="搜索API名称、路径、描述..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item 
              label="API分类" 
              style={{ marginBottom: 0 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Select
                placeholder="选择API分类"
                allowClear
                style={{ width: '100%' }}
                onChange={handleCategoryFilter}
                value={filterCategory}
              >
                {apiCategories.map(category => (
                  <Option key={category.value} value={category.value}>{category.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item 
              label="请求方法" 
              style={{ marginBottom: 0 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Select
                placeholder="选择请求方法"
                allowClear
                style={{ width: '100%' }}
                onChange={handleMethodFilter}
                value={filterMethod}
              >
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
                <Option value="PUT">PUT</Option>
                <Option value="DELETE">DELETE</Option>
                <Option value="PATCH">PATCH</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item 
              label="API状态" 
              style={{ marginBottom: 0 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Select
                placeholder="选择API状态"
                allowClear
                style={{ width: '100%' }}
                onChange={handleStatusFilter}
                value={filterStatus}
              >
                <Option value="published">已发布</Option>
                <Option value="testing">测试中</Option>
                <Option value="draft">草稿</Option>
                <Option value="deprecated">已弃用</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginTop: '16px' }}>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={refreshData}>重置</Button>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => handleSearch(searchText)}>搜索</Button>
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
          dataSource={getFilteredApis()}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条API`,
          }}
          loading={loading}
        />
      </Card>

      {/* 抽屉表单 */}
      <Drawer
        title={formMode === 'add' ? '新增API' : '编辑API'}
        width={550}
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setDrawerVisible(false)}>取消</Button>
              <Button type="primary" onClick={handleSubmit}>保存</Button>
            </Space>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
        >
          {formMode === 'edit' && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}
          
          <Form.Item
            name="name"
            label="API名称"
            rules={[{ required: true, message: '请输入API名称' }]}
          >
            <Input prefix={<ApiOutlined />} placeholder="请输入API名称" />
          </Form.Item>
          
          <Form.Item
            name="path"
            label="API路径"
            rules={[{ required: true, message: '请输入API路径' }]}
          >
            <Input prefix={<LinkOutlined />} placeholder="请输入API路径，如：/api/users" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="method"
                label="请求方法"
                rules={[{ required: true, message: '请选择请求方法' }]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="GET">GET</Radio.Button>
                  <Radio.Button value="POST">POST</Radio.Button>
                  <Radio.Button value="PUT">PUT</Radio.Button>
                  <Radio.Button value="DELETE">DELETE</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="所属分类"
                rules={[{ required: true, message: '请选择所属分类' }]}
              >
                <Select placeholder="请选择所属分类">
                  {apiCategories.map(category => (
                    <Option key={category.value} value={category.value}>{category.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="API状态"
                rules={[{ required: true, message: '请选择API状态' }]}
              >
                <Select placeholder="请选择API状态">
                  <Option value="published">已发布</Option>
                  <Option value="testing">测试中</Option>
                  <Option value="draft">草稿</Option>
                  <Option value="deprecated">已弃用</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="auth"
                label="需要鉴权"
                valuePropName="checked"
              >
                <Switch 
                  checkedChildren={<SafetyOutlined />} 
                  unCheckedChildren={<UnlockOutlined />} 
                  defaultChecked 
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="description"
            label="API描述"
          >
            <TextArea rows={4} placeholder="请输入API描述" />
          </Form.Item>
          
          <Divider orientation="left">高级设置</Divider>
          
          <Paragraph type="secondary">
            <Space>
              <RocketOutlined />
              <span>高级设置部分允许您配置API的详细参数、响应格式等信息。</span>
            </Space>
          </Paragraph>
        </Form>
      </Drawer>
    </div>
  );
};

export default ApiManagement; 