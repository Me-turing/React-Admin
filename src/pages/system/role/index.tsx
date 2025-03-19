import React, { useState } from 'react';
import { Card, Typography, Table, Input, Button, Space, Tag, Row, Col, Dropdown, Menu, Tooltip, Tree, Switch, Badge, Form, Select } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  MoreOutlined,
  ReloadOutlined,
  LockOutlined,
  TeamOutlined,
  FolderOutlined,
  FileOutlined,
  DownOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { DirectoryTree } = Tree;
const { Option } = Select;

// 模拟角色数据
const mockRoles = [
  {
    id: 1,
    name: '超级管理员',
    code: 'SUPER_ADMIN',
    description: '拥有系统所有权限',
    userCount: 2,
    status: 'active',
    createTime: '2023-01-10 09:00:00',
  },
  {
    id: 2,
    name: '普通管理员',
    code: 'ADMIN',
    description: '拥有大部分系统权限',
    userCount: 5,
    status: 'active',
    createTime: '2023-01-15 10:30:00',
  },
  {
    id: 3,
    name: '运营人员',
    code: 'OPERATOR',
    description: '拥有内容管理、用户管理权限',
    userCount: 8,
    status: 'active',
    createTime: '2023-02-20 14:20:00',
  },
  {
    id: 4,
    name: '财务人员',
    code: 'FINANCE',
    description: '拥有财务模块权限',
    userCount: 4,
    status: 'active',
    createTime: '2023-03-10 11:15:00',
  },
  {
    id: 5,
    name: '普通用户',
    code: 'USER',
    description: '基础功能权限',
    userCount: 25,
    status: 'active',
    createTime: '2023-03-15 15:45:00',
  },
  {
    id: 6,
    name: '游客',
    code: 'GUEST',
    description: '只读权限',
    userCount: 0,
    status: 'inactive',
    createTime: '2023-04-01 09:30:00',
  },
];

// 模拟权限树
const permissionTreeData = [
  {
    title: '系统管理',
    key: 'system',
    icon: <FolderOutlined />,
    children: [
      {
        title: '用户管理',
        key: 'system:user',
        icon: <FileOutlined />,
        children: [
          { title: '查看用户', key: 'system:user:view', icon: <FileOutlined /> },
          { title: '创建用户', key: 'system:user:create', icon: <FileOutlined /> },
          { title: '编辑用户', key: 'system:user:edit', icon: <FileOutlined /> },
          { title: '删除用户', key: 'system:user:delete', icon: <FileOutlined /> },
        ],
      },
      {
        title: '角色管理',
        key: 'system:role',
        icon: <FileOutlined />,
        children: [
          { title: '查看角色', key: 'system:role:view', icon: <FileOutlined /> },
          { title: '创建角色', key: 'system:role:create', icon: <FileOutlined /> },
          { title: '编辑角色', key: 'system:role:edit', icon: <FileOutlined /> },
          { title: '删除角色', key: 'system:role:delete', icon: <FileOutlined /> },
        ],
      },
      {
        title: '菜单管理',
        key: 'system:menu',
        icon: <FileOutlined />,
        children: [
          { title: '查看菜单', key: 'system:menu:view', icon: <FileOutlined /> },
          { title: '创建菜单', key: 'system:menu:create', icon: <FileOutlined /> },
          { title: '编辑菜单', key: 'system:menu:edit', icon: <FileOutlined /> },
          { title: '删除菜单', key: 'system:menu:delete', icon: <FileOutlined /> },
        ],
      },
    ],
  },
  {
    title: '内容管理',
    key: 'content',
    icon: <FolderOutlined />,
    children: [
      {
        title: '文章管理',
        key: 'content:article',
        icon: <FileOutlined />,
        children: [
          { title: '查看文章', key: 'content:article:view', icon: <FileOutlined /> },
          { title: '创建文章', key: 'content:article:create', icon: <FileOutlined /> },
          { title: '编辑文章', key: 'content:article:edit', icon: <FileOutlined /> },
          { title: '删除文章', key: 'content:article:delete', icon: <FileOutlined /> },
        ],
      },
      {
        title: '评论管理',
        key: 'content:comment',
        icon: <FileOutlined />,
        children: [
          { title: '查看评论', key: 'content:comment:view', icon: <FileOutlined /> },
          { title: '回复评论', key: 'content:comment:reply', icon: <FileOutlined /> },
          { title: '删除评论', key: 'content:comment:delete', icon: <FileOutlined /> },
        ],
      },
    ],
  },
];

const RoleManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockRoles);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['system', 'system:user', 'system:role', 'content']);
  const [searchCollapsed, setSearchCollapsed] = useState(false);

  // 表格列配置
  const columns = [
    {
      title: '角色ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: typeof mockRoles[0]) => (
        <Space>
          <Text strong>{text}</Text>
          {record.id === 1 && <Tag color="gold">超级权限</Tag>}
        </Space>
      ),
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count: number) => (
        <Badge 
          count={count} 
          showZero 
          style={{ 
            backgroundColor: count > 0 ? '#1890ff' : '#d9d9d9',
            fontSize: '12px',
            padding: '0 6px',
            height: '20px',
            lineHeight: '20px',
          }} 
        />
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Switch 
          checked={status === 'active'} 
          size="small" 
          disabled={status === 'admin'} 
        />
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
      width: 150,
      render: (_: any, record: typeof mockRoles[0]) => (
        <Space size="middle">
          <Tooltip title="编辑角色">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="分配权限">
            <Button 
              type="text" 
              icon={<LockOutlined />} 
              size="small" 
              onClick={() => handleAssignPermissions(record.id)}
            />
          </Tooltip>
          <Dropdown 
            overlay={
              <Menu>
                <Menu.Item key="1" icon={<TeamOutlined />}>分配用户</Menu.Item>
                {record.id !== 1 && (
                  <Menu.Item key="2" icon={<DeleteOutlined />} danger>删除角色</Menu.Item>
                )}
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
    const filtered = mockRoles.filter(
      (role) =>
        role.name.toLowerCase().includes(value.toLowerCase()) ||
        role.code.toLowerCase().includes(value.toLowerCase()) ||
        role.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // 刷新数据
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setFilteredData(mockRoles);
      setSearchText('');
      setLoading(false);
    }, 500);
  };

  // 分配权限
  const handleAssignPermissions = (roleId: number) => {
    setSelectedRole(roleId);
    
    // 模拟不同角色的权限
    let permissionKeys: React.Key[] = [];
    if (roleId === 1) {
      // 超级管理员拥有所有权限
      permissionKeys = ['system', 'system:user', 'system:user:view', 'system:user:create', 'system:user:edit', 'system:user:delete',
      'system:role', 'system:role:view', 'system:role:create', 'system:role:edit', 'system:role:delete',
      'system:menu', 'system:menu:view', 'system:menu:create', 'system:menu:edit', 'system:menu:delete',
      'content', 'content:article', 'content:article:view', 'content:article:create', 'content:article:edit', 'content:article:delete',
      'content:comment', 'content:comment:view', 'content:comment:reply', 'content:comment:delete'];
    } else if (roleId === 2) {
      // 普通管理员
      permissionKeys = ['system', 'system:user', 'system:user:view', 'system:user:create', 'system:user:edit',
      'system:role', 'system:role:view',
      'system:menu', 'system:menu:view',
      'content', 'content:article', 'content:article:view', 'content:article:create', 'content:article:edit',
      'content:comment', 'content:comment:view', 'content:comment:reply', 'content:comment:delete'];
    } else if (roleId === 3) {
      // 运营人员
      permissionKeys = ['content', 'content:article', 'content:article:view', 'content:article:create', 'content:article:edit',
      'content:comment', 'content:comment:view', 'content:comment:reply', 'content:comment:delete'];
    } else if (roleId === 4) {
      // 财务人员
      permissionKeys = ['system:user:view'];
    } else {
      // 其他角色
      permissionKeys = ['content:article:view', 'content:comment:view'];
    }
    
    setCheckedKeys(permissionKeys);
  };

  // 权限树选择变化
  const onCheck = (checked: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] }) => {
    if (Array.isArray(checked)) {
      setCheckedKeys(checked);
    } else {
      setCheckedKeys(checked.checked);
    }
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
              label="角色名称" 
              style={{ marginBottom: 0 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Search
                placeholder="搜索角色名称..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item 
              label="角色编码" 
              style={{ marginBottom: 0 }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input 
                placeholder="搜索角色编码..." 
                allowClear
                onChange={(e) => {
                  setSearchText(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
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
                <Option value="active">启用</Option>
                <Option value="inactive">禁用</Option>
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

      <Row gutter={24}>
        <Col span={selectedRole ? 16 : 24}>
          {/* 列表内容卡片 */}
          <Card 
            bordered={false}
            title={
              <Row justify="space-between" align="middle">
                <Col>
                  <Space>
                    <TeamOutlined />
                    <Title level={4} style={{ margin: 0 }}>角色列表</Title>
                  </Space>
                </Col>
                <Col>
                  <Button type="primary" icon={<PlusOutlined />}>
                    新增角色
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
                showTotal: (total) => `共 ${total} 条角色`,
              }}
              rowClassName={(record) => record.id === selectedRole ? 'ant-table-row-selected' : ''}
              loading={loading}
            />
          </Card>
        </Col>

        {/* 权限分配面板 */}
        {selectedRole && (
          <Col span={8}>
            <Card
              title={
                <Space>
                  <LockOutlined />
                  <span>权限分配</span>
                  <Tag color="blue">
                    {mockRoles.find(role => role.id === selectedRole)?.name}
                  </Tag>
                </Space>
              }
              bordered={false}
              style={{ marginBottom: '24px' }}
              extra={
                <Space>
                  <Button size="small" onClick={() => setSelectedRole(null)}>取消</Button>
                  <Button type="primary" size="small">保存</Button>
                </Space>
              }
            >
              <Paragraph type="secondary" style={{ marginBottom: '16px' }}>
                请选择要分配给该角色的权限，父级权限选中会自动选中所有子权限
              </Paragraph>
              <DirectoryTree
                checkable
                selectable={false}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                expandedKeys={expandedKeys}
                onExpand={(keys) => setExpandedKeys(keys)}
                treeData={permissionTreeData}
                defaultExpandAll
                style={{ height: '500px', overflow: 'auto' }}
              />
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default RoleManagement; 