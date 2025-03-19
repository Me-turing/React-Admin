import React, { useState } from 'react';
import { Card, Typography, Tree, Input, Button, Space, Divider, Row, Col, Form, Select, Switch, Tooltip, Table, Tag } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ReloadOutlined,
  MenuOutlined,
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  KeyOutlined,
  LinkOutlined,
  BarsOutlined,
  SearchOutlined
} from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

const { Title, Text } = Typography;
const { Search } = Input;
const { DirectoryTree } = Tree;
const { Option } = Select;

// 定义菜单项接口
interface MenuItem {
  id: number;
  name: string;
  icon: React.ReactNode | null;
  path: string;
  component: string;
  sort: number;
  visible: boolean;
  type: string;
  parentId: number;
  permission: string;
  children: MenuItem[];
  parentName?: string; // 用于扁平化数据
}

// 定义树节点接口
interface TreeMenuItem {
  title: string;
  key: number;
  icon?: React.ReactNode;
  children?: TreeMenuItem[];
}

// 模拟菜单数据
const mockMenus: MenuItem[] = [
  {
    id: 1,
    name: '首页',
    icon: <HomeOutlined />,
    path: '/dashboard',
    component: 'Dashboard',
    sort: 1,
    visible: true,
    type: 'menu',
    parentId: 0,
    permission: '',
    children: [],
  },
  {
    id: 2,
    name: '系统管理',
    icon: <SettingOutlined />,
    path: '/system',
    component: 'Layout',
    sort: 2,
    visible: true,
    type: 'directory',
    parentId: 0,
    permission: 'system',
    children: [
      {
        id: 3,
        name: '用户管理',
        icon: <UserOutlined />,
        path: '/system/user',
        component: 'system/user/index',
        sort: 1,
        visible: true,
        type: 'menu',
        parentId: 2,
        permission: 'system:user:list',
        children: [
          {
            id: 7,
            name: '用户查询',
            icon: null,
            path: '',
            component: '',
            sort: 1,
            visible: true,
            type: 'button',
            parentId: 3,
            permission: 'system:user:query',
            children: [],
          },
          {
            id: 8,
            name: '用户新增',
            icon: null,
            path: '',
            component: '',
            sort: 2,
            visible: true,
            type: 'button',
            parentId: 3,
            permission: 'system:user:add',
            children: [],
          },
          {
            id: 9,
            name: '用户修改',
            icon: null,
            path: '',
            component: '',
            sort: 3,
            visible: true,
            type: 'button',
            parentId: 3,
            permission: 'system:user:edit',
            children: [],
          },
          {
            id: 10,
            name: '用户删除',
            icon: null,
            path: '',
            component: '',
            sort: 4,
            visible: true,
            type: 'button',
            parentId: 3,
            permission: 'system:user:remove',
            children: [],
          },
        ],
      },
      {
        id: 4,
        name: '角色管理',
        icon: <TeamOutlined />,
        path: '/system/role',
        component: 'system/role/index',
        sort: 2,
        visible: true,
        type: 'menu',
        parentId: 2,
        permission: 'system:role:list',
        children: [],
      },
      {
        id: 5,
        name: '菜单管理',
        icon: <MenuOutlined />,
        path: '/system/menu',
        component: 'system/menu/index',
        sort: 3,
        visible: true,
        type: 'menu',
        parentId: 2,
        permission: 'system:menu:list',
        children: [],
      },
    ],
  },
  {
    id: 6,
    name: '系统监控',
    icon: <AppstoreOutlined />,
    path: '/monitor',
    component: 'Layout',
    sort: 3,
    visible: true,
    type: 'directory',
    parentId: 0,
    permission: 'monitor',
    children: [],
  },
];

// 将树形结构转为平铺结构
const flattenMenus = (menus: MenuItem[]): MenuItem[] => {
  const flatMenus: MenuItem[] = [];
  
  const flatten = (items: MenuItem[], parent: MenuItem | null = null) => {
    items.forEach(item => {
      const flatItem = { ...item } as MenuItem;
      if (parent) {
        flatItem.parentName = parent.name;
      }
      const { children } = flatItem;
      flatMenus.push(flatItem);
      if (children && children.length > 0) {
        flatten(children, flatItem);
      }
    });
  };
  
  flatten(menus);
  return flatMenus;
};

// 生成树形数据
const generateTreeData = (data: MenuItem[]): TreeMenuItem[] => {
  return data.map(item => {
    const { id, name, icon, children } = item;
    return {
      title: name,
      key: id,
      icon,
      children: children && children.length > 0 ? generateTreeData(children) : undefined
    };
  });
};

const MenuManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [menuForm] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([2]);
  const [menuType, setMenuType] = useState<string>('menu');
  const [viewMode, setViewMode] = useState<'tree' | 'table'>('tree');
  
  // 获取扁平化的菜单数据
  const flatMenus = flattenMenus(mockMenus);
  
  // 获取树形菜单数据
  const treeData = generateTreeData(mockMenus);
  
  // 获取表格数据（筛选后的）
  const getTableData = () => {
    if (!searchText) return flatMenus;
    
    return flatMenus.filter(
      menu => menu.name.toLowerCase().includes(searchText.toLowerCase()) ||
              (menu.permission && menu.permission.toLowerCase().includes(searchText.toLowerCase())) ||
              (menu.path && menu.path.toLowerCase().includes(searchText.toLowerCase()))
    );
  };
  
  // 表格列配置
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (text: string, record: (typeof flatMenus)[0]) => (
        <Space>
          {record.icon}
          <span>{text}</span>
          {record.type === 'directory' && <Tag color="blue">目录</Tag>}
          {record.type === 'menu' && <Tag color="green">菜单</Tag>}
          {record.type === 'button' && <Tag color="orange">按钮</Tag>}
        </Space>
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 80,
    },
    {
      title: '权限标识',
      dataIndex: 'permission',
      key: 'permission',
      ellipsis: true,
      render: (text: string) => text ? <Tag color="purple">{text}</Tag> : '-',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      ellipsis: true,
      render: (text: string) => text || '-',
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
      ellipsis: true,
      render: (text: string) => text || '-',
    },
    {
      title: '可见',
      dataIndex: 'visible',
      key: 'visible',
      width: 80,
      render: (visible: boolean) => <Switch size="small" checked={visible} disabled />,
    },
    {
      title: '上级菜单',
      dataIndex: 'parentName',
      key: 'parentName',
      ellipsis: true,
      render: (text: string) => text || '根菜单',
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: unknown, record: MenuItem) => (
        <Space size="middle">
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small" 
              onClick={() => handleEditMenu(record.id)}
            />
          </Tooltip>
          <Tooltip title="添加子菜单">
            <Button 
              type="text" 
              icon={<PlusOutlined />} 
              size="small"
              disabled={record.type === 'button'}
              onClick={() => handleAddSubMenu(record.id)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small" 
              danger 
              disabled={record.children && record.children.length > 0}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchText(value);
    
    if (!value) {
      return;
    }
    
    // 匹配菜单并展开父节点
    const expandKeys: React.Key[] = [];
    
    flatMenus.forEach(menu => {
      if (
        menu.name.toLowerCase().includes(value.toLowerCase()) ||
        (menu.permission && menu.permission.toLowerCase().includes(value.toLowerCase())) ||
        (menu.path && menu.path.toLowerCase().includes(value.toLowerCase()))
      ) {
        // 查找父节点并添加到展开列表
        let currentParent = menu.parentId;
        while (currentParent && currentParent !== 0) {
          expandKeys.push(currentParent);
          const parent = flatMenus.find(m => m.id === currentParent);
          currentParent = parent ? parent.parentId : 0;
        }
      }
    });
    
    setExpandedKeys([...new Set([...expandedKeys, ...expandKeys])]);
  };
  
  // 刷新菜单数据
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearchText('');
    }, 500);
  };
  
  // 编辑菜单
  const handleEditMenu = (menuId: number) => {
    setSelectedMenuId(menuId);
    const menu = flatMenus.find(m => m.id === menuId);
    
    if (menu) {
      setMenuType(menu.type);
      menuForm.setFieldsValue({
        name: menu.name,
        icon: menu.icon ? 'SettingOutlined' : undefined,
        path: menu.path,
        component: menu.component,
        permission: menu.permission,
        parentId: menu.parentId === 0 ? undefined : menu.parentId,
        sort: menu.sort,
        visible: menu.visible,
        type: menu.type,
      });
    }
  };
  
  // 添加子菜单
  const handleAddSubMenu = (parentId: number) => {
    setSelectedMenuId(null);
    menuForm.resetFields();
    menuForm.setFieldsValue({
      parentId,
      sort: 1,
      visible: true,
      type: 'menu',
    });
    setMenuType('menu');
  };
  
  // 添加根菜单
  const handleAddRootMenu = () => {
    setSelectedMenuId(null);
    menuForm.resetFields();
    menuForm.setFieldsValue({
      parentId: undefined,
      sort: 99,
      visible: true,
      type: 'directory',
    });
    setMenuType('directory');
  };
  
  // 菜单类型变更
  const handleMenuTypeChange = (value: string) => {
    setMenuType(value);
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
              <Title level={4} style={{ margin: 0 }}>菜单管理</Title>
              <Text type="secondary">管理系统菜单配置，设置菜单显示和路由跳转</Text>
            </Col>
            <Col>
              <Space>
                <Button 
                  icon={viewMode === 'tree' ? <BarsOutlined /> : <AppstoreOutlined />} 
                  onClick={() => setViewMode(viewMode === 'tree' ? 'table' : 'tree')}
                >
                  {viewMode === 'tree' ? '表格视图' : '树形视图'}
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRootMenu}>
                  新增菜单
                </Button>
              </Space>
            </Col>
          </Row>
        </Space>
      </Card>

      <Row gutter={24}>
        <Col span={selectedMenuId || menuForm.getFieldValue('parentId') ? 16 : 24}>
          {/* 搜索卡片 */}
          <Card 
            bordered={false}
            style={{ marginBottom: '24px' }}
            bodyStyle={{ padding: '24px' }}
          >
            <Row gutter={[16, 16]} align="middle">
              <Col flex="1">
                <Search
                  placeholder="搜索菜单名称、权限标识、路径..."
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

          {/* 菜单数据展示 */}
          <Card 
            bordered={false}
            bodyStyle={viewMode === 'tree' ? { padding: '24px' } : { padding: 0 }}
          >
            {viewMode === 'tree' ? (
              <DirectoryTree
                treeData={treeData as unknown as DataNode[]}
                defaultExpandAll
                expandedKeys={expandedKeys}
                onExpand={setExpandedKeys}
                selectedKeys={selectedMenuId ? [selectedMenuId] : []}
                onSelect={(keys) => {
                  if (keys.length > 0) {
                    handleEditMenu(keys[0] as number);
                  }
                }}
              />
            ) : (
              <Table
                columns={columns}
                dataSource={getTableData()}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `共 ${total} 条菜单`,
                }}
                loading={loading}
                expandable={{
                  defaultExpandedRowKeys: [2],
                }}
              />
            )}
          </Card>
        </Col>

        {/* 菜单表单 */}
        {(selectedMenuId || menuForm.getFieldValue('parentId')) && (
          <Col span={8}>
            <Card
              title={
                <Space>
                  {selectedMenuId ? <EditOutlined /> : <PlusOutlined />}
                  <span>{selectedMenuId ? '编辑菜单' : '新增菜单'}</span>
                </Space>
              }
              bordered={false}
              style={{ marginBottom: '24px' }}
            >
              <Form
                form={menuForm}
                layout="vertical"
                initialValues={{
                  visible: true,
                  sort: 1,
                  type: 'menu',
                }}
              >
                <Form.Item
                  name="type"
                  label="菜单类型"
                  rules={[{ required: true, message: '请选择菜单类型' }]}
                >
                  <Select onChange={handleMenuTypeChange}>
                    <Option value="directory">目录</Option>
                    <Option value="menu">菜单</Option>
                    <Option value="button">按钮</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="name"
                  label="菜单名称"
                  rules={[{ required: true, message: '请输入菜单名称' }]}
                >
                  <Input placeholder="请输入菜单名称" />
                </Form.Item>

                {menuType !== 'button' && (
                  <Form.Item
                    name="icon"
                    label="菜单图标"
                  >
                    <Select placeholder="请选择图标">
                      <Option value="HomeOutlined">
                        <Space>
                          <HomeOutlined />
                          <span>首页</span>
                        </Space>
                      </Option>
                      <Option value="SettingOutlined">
                        <Space>
                          <SettingOutlined />
                          <span>设置</span>
                        </Space>
                      </Option>
                      <Option value="UserOutlined">
                        <Space>
                          <UserOutlined />
                          <span>用户</span>
                        </Space>
                      </Option>
                      <Option value="TeamOutlined">
                        <Space>
                          <TeamOutlined />
                          <span>团队</span>
                        </Space>
                      </Option>
                      <Option value="MenuOutlined">
                        <Space>
                          <MenuOutlined />
                          <span>菜单</span>
                        </Space>
                      </Option>
                      <Option value="KeyOutlined">
                        <Space>
                          <KeyOutlined />
                          <span>权限</span>
                        </Space>
                      </Option>
                    </Select>
                  </Form.Item>
                )}

                <Form.Item
                  name="parentId"
                  label="上级菜单"
                >
                  <Select placeholder="请选择上级菜单" allowClear>
                    <Option value={undefined}>顶级菜单</Option>
                    {flatMenus
                      .filter(menu => menu.type !== 'button')
                      .map(menu => (
                        <Option key={menu.id} value={menu.id} disabled={menu.id === selectedMenuId}>
                          {menu.name}
                        </Option>
                      ))
                    }
                  </Select>
                </Form.Item>

                {(menuType === 'menu' || menuType === 'directory') && (
                  <Form.Item
                    name="path"
                    label="路由地址"
                    rules={[{ required: true, message: '请输入路由地址' }]}
                  >
                    <Input placeholder="请输入路由地址" prefix={<LinkOutlined />} />
                  </Form.Item>
                )}

                {menuType === 'menu' && (
                  <Form.Item
                    name="component"
                    label="组件路径"
                    rules={[{ required: true, message: '请输入组件路径' }]}
                  >
                    <Input placeholder="请输入组件路径" prefix={<FileOutlined />} />
                  </Form.Item>
                )}

                <Form.Item
                  name="permission"
                  label="权限标识"
                  tooltip="权限标识应该唯一，如：system:user:list"
                >
                  <Input placeholder="请输入权限标识" />
                </Form.Item>

                <Form.Item
                  name="sort"
                  label="显示排序"
                  rules={[{ required: true, message: '请输入显示排序' }]}
                >
                  <Input type="number" placeholder="请输入显示排序" />
                </Form.Item>

                <Form.Item
                  name="visible"
                  label="显示状态"
                  valuePropName="checked"
                >
                  <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
                </Form.Item>

                <Divider />

                <Form.Item>
                  <Space>
                    <Button 
                      type="primary"
                    >
                      保存
                    </Button>
                    <Button 
                      onClick={() => {
                        setSelectedMenuId(null);
                        menuForm.resetFields();
                      }}
                    >
                      取消
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default MenuManagement; 