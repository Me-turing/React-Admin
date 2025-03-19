import React, { useState } from 'react';
import { Card, Typography, Table, Input, Button, Space, Tag, Row, Col, Tooltip, Modal, Form, TreeSelect, Switch, Drawer } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ReloadOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;
const { TreeNode } = TreeSelect;
const { confirm } = Modal;

// 模拟部门数据
const mockDepartments = [
  {
    id: 1,
    name: '总公司',
    code: 'HQ',
    parentId: 0,
    sort: 1,
    leader: '张三',
    phone: '13800138001',
    email: 'zhangsan@example.com',
    status: 'active',
    address: '北京市朝阳区',
    createTime: '2023-01-01 09:00:00',
    children: [
      {
        id: 3,
        name: '研发部',
        code: 'RD',
        parentId: 1,
        sort: 1,
        leader: '王五',
        phone: '13800138003',
        email: 'wangwu@example.com',
        status: 'active',
        address: '北京市海淀区',
        createTime: '2023-01-02 10:30:00',
        children: [
          {
            id: 7,
            name: '前端组',
            code: 'FE',
            parentId: 3,
            sort: 1,
            leader: '赵六',
            phone: '13800138005',
            email: 'zhaoliu@example.com',
            status: 'active',
            address: '北京市海淀区',
            createTime: '2023-01-05 11:00:00',
            children: [],
          },
          {
            id: 8,
            name: '后端组',
            code: 'BE',
            parentId: 3,
            sort: 2,
            leader: '钱七',
            phone: '13800138006',
            email: 'qianqi@example.com',
            status: 'active',
            address: '北京市海淀区',
            createTime: '2023-01-05 11:30:00',
            children: [],
          },
        ],
      },
      {
        id: 4,
        name: '市场部',
        code: 'MKT',
        parentId: 1,
        sort: 2,
        leader: '刘备',
        phone: '13800138007',
        email: 'liubei@example.com',
        status: 'active',
        address: '北京市朝阳区',
        createTime: '2023-01-03 09:15:00',
        children: [],
      },
      {
        id: 5,
        name: '销售部',
        code: 'SALES',
        parentId: 1,
        sort: 3,
        leader: '关羽',
        phone: '13800138008',
        email: 'guanyu@example.com',
        status: 'active',
        address: '上海市浦东新区',
        createTime: '2023-01-04 14:20:00',
        children: [],
      },
    ],
  },
  {
    id: 2,
    name: '分公司',
    code: 'BRANCH',
    parentId: 0,
    sort: 2,
    leader: '李四',
    phone: '13800138002',
    email: 'lisi@example.com',
    status: 'active',
    address: '上海市黄浦区',
    createTime: '2023-01-02 09:30:00',
    children: [
      {
        id: 6,
        name: '上海研发部',
        code: 'SH-RD',
        parentId: 2,
        sort: 1,
        leader: '张飞',
        phone: '13800138009',
        email: 'zhangfei@example.com',
        status: 'active',
        address: '上海市浦东新区',
        createTime: '2023-01-05 10:00:00',
        children: [],
      },
    ],
  },
];

// 部门表单接口
interface DepartmentFormData {
  id?: number;
  name: string;
  code: string;
  parentId?: number;
  sort: number;
  leader: string;
  phone: string;
  email: string;
  status: string;
  address: string;
}

const DepartmentManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([1, 2, 3]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [form] = Form.useForm<DepartmentFormData>();
  
  // 将树形结构转为平铺结构
  type FlatDepartment = Omit<typeof mockDepartments[0], 'children'>;
  
  const flattenDepartments = (departments: typeof mockDepartments) => {
    const result: FlatDepartment[] = [];
    
    const flatten = (items: typeof mockDepartments) => {
      items.forEach(item => {
        const { children, ...rest } = item;
        result.push(rest);
        if (children && children.length) {
          flatten(children);
        }
      });
    };
    
    flatten(departments);
    return result;
  };
  
  // 获取所有扁平化的部门
  const flatDepartments = flattenDepartments(mockDepartments);
  
  // 过滤部门数据
  const filterDepartmentData = (departments: typeof mockDepartments, searchText: string): typeof mockDepartments => {
    if (!searchText) {
      return departments;
    }
    
    const filtered = departments.map(dept => {
      // 检查当前部门是否符合条件
      const match = dept.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    dept.code.toLowerCase().includes(searchText.toLowerCase()) ||
                    (dept.leader && dept.leader.toLowerCase().includes(searchText.toLowerCase())) ||
                    (dept.email && dept.email.toLowerCase().includes(searchText.toLowerCase()));
                    
      // 如果有子部门，递归过滤
      const children = dept.children && dept.children.length > 0
        ? filterDepartmentData(dept.children, searchText)
        : [];
        
      // 如果当前部门匹配或者子部门有匹配项，则保留
      if (match || (children && children.length > 0)) {
        return {
          ...dept,
          children,
        };
      }
      
      return null;
    }).filter(Boolean) as typeof mockDepartments;
    
    return filtered;
  };
  
  // 获取过滤后的部门数据
  const getFilteredDepartments = () => {
    return filterDepartmentData(mockDepartments, searchText);
  };
  
  // 表格列配置
  const columns = [
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: '部门编码',
      dataIndex: 'code',
      key: 'code',
      width: 120,
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '部门负责人',
      dataIndex: 'leader',
      key: 'leader',
      width: 120,
      render: (text: string) => (
        <Space>
          <UserOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '联系方式',
      key: 'contact',
      width: 200,
      render: (_: unknown, record: FlatDepartment) => (
        <Space direction="vertical" size={0}>
          <Space>
            <PhoneOutlined />
            <Text type="secondary">{record.phone}</Text>
          </Space>
          <Space>
            <MailOutlined />
            <Text type="secondary">{record.email}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
      render: (text: string) => (
        <Space>
          <EnvironmentOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => (
        <Switch 
          checked={status === 'active'} 
          size="small" 
          disabled 
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_: unknown, record: FlatDepartment) => (
        <Space size="middle">
          <Tooltip title="新增下级">
            <Button 
              type="text" 
              icon={<PlusOutlined />} 
              size="small" 
              onClick={() => handleAddSubDepartment(record)}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small" 
              onClick={() => handleEditDepartment(record)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small" 
              danger
              onClick={() => handleDeleteConfirm(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchText(value);
    
    // 如果有搜索词，展开所有节点
    if (value) {
      const allKeys = flatDepartments.map(dept => dept.id);
      setExpandedKeys(allKeys);
    } else {
      setExpandedKeys([1, 2, 3]);
    }
  };
  
  // 刷新数据
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearchText('');
    }, 500);
  };
  
  // 添加子部门
  const handleAddSubDepartment = (record: typeof flatDepartments[0]) => {
    setFormMode('add');
    form.resetFields();
    form.setFieldsValue({
      parentId: record.id,
      sort: 1,
      status: 'active',
    });
    setDrawerVisible(true);
  };
  
  // 添加一级部门
  const handleAddRootDepartment = () => {
    setFormMode('add');
    form.resetFields();
    form.setFieldsValue({
      parentId: 0,
      sort: 99,
      status: 'active',
    });
    setDrawerVisible(true);
  };
  
  // 编辑部门
  const handleEditDepartment = (record: typeof flatDepartments[0]) => {
    setFormMode('edit');
    form.resetFields();
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      code: record.code,
      parentId: record.parentId,
      sort: record.sort,
      leader: record.leader,
      phone: record.phone,
      email: record.email,
      status: record.status,
      address: record.address,
    });
    setDrawerVisible(true);
  };
  
  // 删除确认
  const handleDeleteConfirm = (record: typeof flatDepartments[0]) => {
    confirm({
      title: `确定要删除部门 "${record.name}" 吗？`,
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复，请谨慎操作。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('删除部门', record.id);
        // 这里实际项目中应该调用后端接口删除部门
      },
    });
  };
  
  // 提交表单
  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log('提交表单', values);
      // 这里实际项目中应该调用后端接口保存部门
      setDrawerVisible(false);
    });
  };
  
  // 渲染部门树选择器
  const renderTreeNodes = (departments: typeof mockDepartments) => {
    return departments.map(dept => (
      <TreeNode key={dept.id} value={dept.id} title={dept.name}>
        {dept.children && dept.children.length > 0 ? renderTreeNodes(dept.children) : null}
      </TreeNode>
    ));
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
              <Title level={4} style={{ margin: 0 }}>部门管理</Title>
              <Text type="secondary">管理公司组织架构，设置部门信息和层级关系</Text>
            </Col>
            <Col>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRootDepartment}>
                新增部门
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
          <Col flex="1">
            <Search
              placeholder="搜索部门名称、编码、负责人..."
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col>
            <Space>
              <Tooltip title="刷新">
                <Button icon={<ReloadOutlined />} onClick={refreshData} />
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
          dataSource={getFilteredDepartments()}
          rowKey="id"
          pagination={false}
          expandable={{
            defaultExpandedRowKeys: [1, 2, 3],
            expandedRowKeys: expandedKeys as React.Key[],
            onExpandedRowsChange: (keys) => setExpandedKeys([...keys]),
          }}
          loading={loading}
        />
      </Card>

      {/* 抽屉表单 */}
      <Drawer
        title={formMode === 'add' ? '添加部门' : '编辑部门'}
        width={480}
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
            label="部门名称"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          
          <Form.Item
            name="code"
            label="部门编码"
            rules={[{ required: true, message: '请输入部门编码' }]}
          >
            <Input placeholder="请输入部门编码" />
          </Form.Item>
          
          <Form.Item
            name="parentId"
            label="上级部门"
          >
            <TreeSelect
              placeholder="请选择上级部门"
              treeDefaultExpandAll
              allowClear
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              onChange={(value) => console.log(value)}
            >
              <TreeNode key={0} value={0} title="顶级部门" />
              {renderTreeNodes(mockDepartments)}
            </TreeSelect>
          </Form.Item>
          
          <Form.Item
            name="leader"
            label="负责人"
          >
            <Input placeholder="请输入负责人姓名" prefix={<UserOutlined />} />
          </Form.Item>
          
          <Form.Item
            name="phone"
            label="联系电话"
          >
            <Input placeholder="请输入联系电话" prefix={<PhoneOutlined />} />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱地址" prefix={<MailOutlined />} />
          </Form.Item>
          
          <Form.Item
            name="address"
            label="部门地址"
          >
            <Input placeholder="请输入部门地址" prefix={<EnvironmentOutlined />} />
          </Form.Item>
          
          <Form.Item
            name="sort"
            label="显示排序"
            rules={[{ required: true, message: '请输入显示排序' }]}
          >
            <Input type="number" placeholder="请输入显示排序" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="部门状态"
            valuePropName="checked"
          >
            <Switch 
              checkedChildren="启用" 
              unCheckedChildren="禁用" 
              defaultChecked 
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default DepartmentManagement; 