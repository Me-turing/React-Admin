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
  HomeOutlined
} from '@ant-design/icons'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import routes from './routes'
import './App.css'

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

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const element = useRoutes(routes)
  
  // 标签页状态
  const [activeTab, setActiveTab] = useState('/dashboard')
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      key: '/dashboard',
      label: (
        <span>
          <DashboardOutlined />
          仪表盘
        </span>
      ),
      closable: false // 仪表盘标签不可关闭
    }
  ])
  
  // 面包屑状态
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>(routeToBreadcrumbMap['/dashboard'] || [])

  // 根据当前路径更新标签页
  useEffect(() => {
    const path = location.pathname === '/' ? '/dashboard' : location.pathname
    setActiveTab(path)
    
    // 更新面包屑
    setBreadcrumbItems(routeToBreadcrumbMap[path] || routeToBreadcrumbMap['/dashboard'])
    
    // 检查标签页是否已存在
    const exist = tabs.some(tab => tab.key === path)
    if (!exist && menuPathMap[path]) {
      // 添加新标签页
      const { icon, label } = menuPathMap[path]
      const newTab: TabItem = {
        key: path,
        label: (
          <span>
            {icon}
            {label}
          </span>
        ),
        closable: path !== '/dashboard' // 仪表盘不可关闭
      }
      setTabs(prev => [...prev, newTab])
    }
  }, [location.pathname, tabs])

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  // 处理标签页切换
  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey)
    navigate(activeKey)
  }

  // 处理关闭标签页
  const handleTabEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      const targetIndex = tabs.findIndex(tab => tab.key === targetKey)
      const newTabs = tabs.filter(tab => tab.key !== targetKey)
      
      // 如果关闭的是当前激活的标签页，则需要激活其他标签页
      if (targetKey === activeTab) {
        const newActiveKey = newTabs[targetIndex === 0 ? 0 : targetIndex - 1].key
        setActiveTab(newActiveKey)
        navigate(newActiveKey)
      }
      
      setTabs(newTabs)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed} width={220}>
        {/* Logo区域 */}
        <div className="logo-area">
          <span>{collapsed ? 'LES' : '大额资金管理系统'}</span>
        </div>
        
        {/* 侧边菜单 */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname === '/' ? '/dashboard' : location.pathname]}
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
      
      <Layout>
        {/* 顶部导航 */}
        <Header className="top-nav">
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
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
