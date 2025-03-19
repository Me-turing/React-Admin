import React, { useState, useEffect } from 'react'
import { Layout, Menu, Button, Breadcrumb, Badge, Avatar, Space, Tabs } from 'antd'
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  DashboardOutlined, 
  UserOutlined, 
  SettingOutlined,
  SearchOutlined,
  BellOutlined,
  ExpandOutlined,
  DownOutlined,
  TeamOutlined,
  ApartmentOutlined,
  ApiOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  SafetyOutlined,
  HomeOutlined,
  FileOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import routes from './routes'
import './App.css'
import { saveTabsToStorage, getTabsFromStorage } from './utils/storage'

const { Header, Sider, Content } = Layout

// 标签页接口
interface TabItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  closable?: boolean;
}

// 面包屑项接口
interface BreadcrumbItem {
  path: string;
  title: string;
  icon?: React.ReactNode;
}

// 简化版标签页数据结构，用于本地存储
interface SavedTabItem {
  key: string;
  title: string;
  closable: boolean;
}

// 菜单映射表 - 用于快速查找菜单项信息
const menuPathMap: Record<string, { icon: React.ReactNode; label: string }> = {
  '/dashboard': { icon: <DashboardOutlined />, label: '仪表盘' },
  '/system/user': { icon: <UserOutlined />, label: '用户管理' },
  '/system/menu': { icon: <AppstoreOutlined />, label: '菜单管理' },
  '/system/role': { icon: <TeamOutlined />, label: '角色管理' },
  '/system/department': { icon: <ApartmentOutlined />, label: '部门管理' },
  '/system/api': { icon: <ApiOutlined />, label: 'API管理' },
};

// 路径映射到面包屑路径
const routeToBreadcrumbMap: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [
    { path: '/', title: '首页', icon: <HomeOutlined /> },
    { path: '/dashboard', title: '仪表盘', icon: <DashboardOutlined /> }
  ],
  '/system/user': [
    { path: '/', title: '首页', icon: <HomeOutlined /> },
    { path: '/system', title: '系统管理', icon: <SettingOutlined /> },
    { path: '/system/resource', title: '资源管理', icon: <DatabaseOutlined /> },
    { path: '/system/user', title: '用户管理', icon: <UserOutlined /> }
  ],
  '/system/department': [
    { path: '/', title: '首页', icon: <HomeOutlined /> },
    { path: '/system', title: '系统管理', icon: <SettingOutlined /> },
    { path: '/system/resource', title: '资源管理', icon: <DatabaseOutlined /> },
    { path: '/system/department', title: '部门管理', icon: <ApartmentOutlined /> }
  ],
  '/system/role': [
    { path: '/', title: '首页', icon: <HomeOutlined /> },
    { path: '/system', title: '系统管理', icon: <SettingOutlined /> },
    { path: '/system/permission', title: '权限管理', icon: <SafetyOutlined /> },
    { path: '/system/role', title: '角色管理', icon: <TeamOutlined /> }
  ],
  '/system/menu': [
    { path: '/', title: '首页', icon: <HomeOutlined /> },
    { path: '/system', title: '系统管理', icon: <SettingOutlined /> },
    { path: '/system/permission', title: '权限管理', icon: <SafetyOutlined /> },
    { path: '/system/menu', title: '菜单管理', icon: <AppstoreOutlined /> }
  ],
  '/system/api': [
    { path: '/', title: '首页', icon: <HomeOutlined /> },
    { path: '/system', title: '系统管理', icon: <SettingOutlined /> },
    { path: '/system/api', title: 'API管理', icon: <ApiOutlined /> }
  ]
};

// 创建标签页
const createTabItem = (path: string, isDefaultTab: boolean = false): TabItem => {
  // 默认标签（仪表盘）
  if (isDefaultTab || path === '/dashboard') {
    return {
      key: '/dashboard',
      label: (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <FileOutlined style={{ marginRight: 8 }} />
          仪表盘
        </span>
      ),
      closable: false // 仪表盘标签不可关闭
    };
  }
  
  // 其他标签
  if (menuPathMap[path]) {
    const { icon, label } = menuPathMap[path];
    return {
      key: path,
      label: (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {React.cloneElement(icon as React.ReactElement, { style: { marginRight: 8 } })}
          {label}
        </span>
      ),
      closable: true
    };
  }
  
  // 未找到对应菜单项，创建通用标签
  return {
    key: path,
    label: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <UnorderedListOutlined style={{ marginRight: 8 }} />
        {path.split('/').pop() || '未知页面'}
      </span>
    ),
    closable: true
  };
};

// 将TabItem转换为可存储的格式
const convertTabsForStorage = (tabs: TabItem[]): SavedTabItem[] => {
  return tabs.map(tab => {
    let title = '';
    const labelElement = tab.label as React.ReactElement;
    if (labelElement && labelElement.props && labelElement.props.children) {
      const spanElement = labelElement.props.children;
      if (typeof spanElement === 'string') {
        title = spanElement;
      } else if (spanElement.props && spanElement.props.children) {
        // 提取文本节点
        const children = Array.isArray(spanElement.props.children) 
          ? spanElement.props.children 
          : [spanElement.props.children];
          
        title = children
          .filter(child => typeof child === 'string')
          .join('');
      }
    }
    
    return {
      key: tab.key,
      title: title || tab.key.split('/').pop() || '',
      closable: !!tab.closable
    };
  });
};

// 从存储格式恢复TabItem
const restoreTabsFromStorage = (savedTabs: SavedTabItem[]): TabItem[] => {
  if (!savedTabs || !Array.isArray(savedTabs) || savedTabs.length === 0) {
    return [createTabItem('/dashboard', true)];
  }
  
  return savedTabs.map(tab => {
    if (tab.key === '/dashboard') {
      return createTabItem('/dashboard', true);
    }
    return createTabItem(tab.key);
  });
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const element = useRoutes(routes)
  
  // 获取当前路径
  const getCurrentPath = () => {
    return location.pathname === '/' ? '/dashboard' : location.pathname;
  };
  
  // 标签页状态
  const [activeTab, setActiveTab] = useState(getCurrentPath)
  const [tabs, setTabs] = useState<TabItem[]>(() => {
    // 从本地存储中恢复标签页
    const savedTabs = getTabsFromStorage<SavedTabItem>();
    if (savedTabs && savedTabs.length > 0) {
      // 恢复已保存的标签页
      const restoredTabs = restoreTabsFromStorage(savedTabs);
      
      // 确保当前路径的标签页存在
      const currentPath = getCurrentPath();
      if (!savedTabs.some(tab => tab.key === currentPath) && currentPath !== '/dashboard') {
        // 当前路径不在已保存的标签页中，添加它
        return [...restoredTabs, createTabItem(currentPath)];
      }
      
      return restoredTabs;
    }
    
    // 没有已保存的标签页，创建初始标签页
    const currentPath = getCurrentPath();
    if (currentPath === '/dashboard') {
      return [createTabItem('/dashboard', true)];
    } else {
      return [
        createTabItem('/dashboard', true),
        createTabItem(currentPath)
      ];
    }
  });
  
  // 面包屑状态
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>(
    () => routeToBreadcrumbMap[getCurrentPath()] || routeToBreadcrumbMap['/dashboard']
  );

  // 根据当前路径更新标签页和面包屑
  useEffect(() => {
    const currentPath = getCurrentPath();
    
    // 更新面包屑
    setBreadcrumbItems(routeToBreadcrumbMap[currentPath] || routeToBreadcrumbMap['/dashboard']);
    
    // 更新当前活动标签
    setActiveTab(currentPath);
    
    // 检查标签页是否已存在，如果不存在则添加
    if (!tabs.some(tab => tab.key === currentPath)) {
      const newTabs = [...tabs, createTabItem(currentPath)];
      setTabs(newTabs);
      
      // 保存到本地存储
      saveTabsToStorage(convertTabsForStorage(newTabs));
    }
  }, [location.pathname]); // 只依赖location.pathname，不依赖tabs

  // 每当tabs变化时，保存到localStorage
  useEffect(() => {
    saveTabsToStorage(convertTabsForStorage(tabs));
  }, [tabs]);

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // 处理标签页切换
  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey);
    navigate(activeKey);
  };

  // 处理关闭标签页
  const handleTabEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      const targetIndex = tabs.findIndex(tab => tab.key === targetKey);
      const newTabs = tabs.filter(tab => tab.key !== targetKey);
      
      // 如果关闭的是当前激活的标签页，则需要激活其他标签页
      if (targetKey === activeTab) {
        const newActiveKey = newTabs[targetIndex === 0 ? 0 : targetIndex - 1].key;
        setActiveTab(newActiveKey);
        navigate(newActiveKey);
      }
      
      setTabs(newTabs);
      // 在handleTabEdit中不需要保存到本地存储，因为tabs变化时useEffect会处理
    }
  };

  return (
    <Layout className="app-container">
      {/* 侧边栏 */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        width={220}
        className="fixed-sider"
      >
        {/* Logo区域 */}
        <div className="logo-area">
          <span>{collapsed ? 'LES' : '大额资金管理系统'}</span>
        </div>
        
        {/* 侧边菜单 */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getCurrentPath()]}
          defaultOpenKeys={['system', 'system-resource', 'system-permission']}
          onClick={handleMenuClick}
          items={[
            {
              key: '/dashboard',
              icon: <DashboardOutlined />,
              label: '仪表盘',
            },
            {
              key: 'system',
              icon: <SettingOutlined />,
              label: '系统管理',
              children: [
                {
                  key: 'system-resource',
                  icon: <DatabaseOutlined />,
                  label: '资源管理',
                  children: [
                    {
                      key: '/system/user',
                      icon: <UserOutlined />,
                      label: '用户管理',
                    },
                    {
                      key: '/system/department',
                      icon: <ApartmentOutlined />,
                      label: '部门管理',
                    }
                  ]
                },
                {
                  key: 'system-permission',
                  icon: <SafetyOutlined />,
                  label: '权限管理',
                  children: [
                    {
                      key: '/system/role',
                      icon: <TeamOutlined />,
                      label: '角色管理',
                    },
                    {
                      key: '/system/menu',
                      icon: <AppstoreOutlined />,
                      label: '菜单管理',
                    }
                  ]
                },
                {
                  key: '/system/api',
                  icon: <ApiOutlined />,
                  label: 'API管理',
                }
              ]
            }
          ]}
        />
      </Sider>
      
      <Layout className="site-layout">
        {/* 顶部导航 */}
        <Header className="fixed-header">
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 54,
                height: 64,
              }}
            />
            
            {/* 面包屑导航 */}
            <Breadcrumb className="breadcrumb">
              {breadcrumbItems.map((item) => (
                <Breadcrumb.Item key={item.path}>
                  <span>
                    {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                    {item.title}
                  </span>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>
          
          {/* 顶部右侧功能区 */}
          <div className="top-right">
            <Space size="middle">
              <Button type="text" icon={<SearchOutlined />} className="top-icon" />
              <Badge count={3}>
                <Button type="text" icon={<BellOutlined />} className="top-icon" />
              </Badge>
              <Button type="text" icon={<ExpandOutlined />} className="top-icon" />
              
              {/* 用户信息 */}
              <div className="user-info">
                <Avatar icon={<UserOutlined />} className="user-avatar" />
                <span style={{ marginLeft: 8 }}>管理员</span>
                <DownOutlined style={{ fontSize: 12, marginLeft: 8 }} />
              </div>
            </Space>
          </div>
        </Header>
        
        {/* Tab导航 */}
        <div className="tab-nav-container">
          <Tabs 
            activeKey={activeTab}
            type="editable-card"
            hideAdd
            onChange={handleTabChange}
            onEdit={handleTabEdit}
            className="custom-tabs"
            items={tabs}
          />
        </div>
        
        {/* 主内容区 - 路由渲染区域 */}
        <Content className="main-content">
          <div className="content-card">
            {element}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
