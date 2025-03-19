import React, { useState } from 'react'
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
  SafetyOutlined
} from '@ant-design/icons'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import routes from './routes'
import './App.css'

const { Header, Sider, Content } = Layout

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const element = useRoutes(routes)

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
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
          defaultSelectedKeys={[location.pathname === '/' ? '/dashboard' : location.pathname]}
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
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>仪表盘</Breadcrumb.Item>
              <Breadcrumb.Item>概览</Breadcrumb.Item>
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
            defaultActiveKey="1" 
            type="editable-card"
            hideAdd
            className="custom-tabs"
            items={[
              {
                key: '1',
                label: (
                  <span>
                    <DashboardOutlined />
                    仪表盘
                  </span>
                ),
                closable: false
              },
              {
                key: '2',
                label: (
                  <span>
                    <UserOutlined />
                    用户管理
                  </span>
                ),
                closable: true
              }
            ]}
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
