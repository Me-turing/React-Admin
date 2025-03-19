import React, { useState } from 'react';
import { Card, Typography, Table, Input, Button, Space, Tag, Row, Col, DatePicker, Tooltip, Avatar, Badge, Select, Divider } from 'antd';
import type { Dayjs } from 'dayjs';
import { 
  SearchOutlined, 
  ReloadOutlined,
  ExportOutlined,
  DeleteOutlined,
  UserOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  LaptopOutlined,
  CodeOutlined,
  AuditOutlined,
  FileSearchOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

// 模拟日志数据
const mockLogs = [
  {
    id: 1,
    username: '张三',
    operation: '用户登录',
    method: 'com.example.controller.LoginController.login()',
    requestParams: '{"username":"admin","password":"******","rememberMe":true}',
    time: 112,
    ip: '192.168.1.1',
    location: '中国-上海',
    browser: 'Chrome 95.0.4638.69',
    os: 'Windows 10',
    status: 'success',
    createTime: '2023-03-19 09:25:32',
  },
  {
    id: 2,
    username: '李四',
    operation: '查询用户列表',
    method: 'com.example.controller.UserController.listUsers()',
    requestParams: '{"pageNum":1,"pageSize":10,"username":""}',
    time: 45,
    ip: '192.168.1.2',
    location: '中国-北京',
    browser: 'Firefox 94.0',
    os: 'Windows 10',
    status: 'success',
    createTime: '2023-03-19 09:26:15',
  },
  {
    id: 3,
    username: '王五',
    operation: '添加用户',
    method: 'com.example.controller.UserController.addUser()',
    requestParams: '{"username":"newuser","password":"******","email":"newuser@example.com","phone":"13800138000"}',
    time: 68,
    ip: '192.168.1.3',
    location: '中国-广州',
    browser: 'Chrome 95.0.4638.69',
    os: 'macOS 12.0.1',
    status: 'success',
    createTime: '2023-03-19 09:30:45',
  },
  {
    id: 4,
    username: '张三',
    operation: '更新角色',
    method: 'com.example.controller.RoleController.updateRole()',
    requestParams: '{"id":2,"name":"editor","permissions":[1,2,3,5,6]}',
    time: 55,
    ip: '192.168.1.1',
    location: '中国-上海',
    browser: 'Chrome 95.0.4638.69',
    os: 'Windows 10',
    status: 'success',
    createTime: '2023-03-19 09:45:12',
  },
  {
    id: 5,
    username: '赵六',
    operation: '删除菜单',
    method: 'com.example.controller.MenuController.deleteMenu()',
    requestParams: '{"id":8}',
    time: 42,
    ip: '192.168.1.4',
    location: '中国-深圳',
    browser: 'Edge 95.0.1020.40',
    os: 'Windows 11',
    status: 'success',
    createTime: '2023-03-19 10:15:30',
  },
  {
    id: 6,
    username: '王五',
    operation: '导出用户数据',
    method: 'com.example.controller.UserController.exportUsers()',
    requestParams: '{"departmentId":2}',
    time: 1250,
    ip: '192.168.1.3',
    location: '中国-广州',
    browser: 'Chrome 95.0.4638.69',
    os: 'macOS 12.0.1',
    status: 'success',
    createTime: '2023-03-19 10:25:18',
  },
  {
    id: 7,
    username: '李四',
    operation: '修改密码',
    method: 'com.example.controller.UserController.updatePassword()',
    requestParams: '{"oldPassword":"******","newPassword":"******"}',
    time: 120,
    ip: '192.168.1.2',
    location: '中国-北京',
    browser: 'Firefox 94.0',
    os: 'Windows 10',
    status: 'failure',
    createTime: '2023-03-19 10:40:22',
  },
  {
    id: 8,
    username: '钱七',
    operation: '上传文件',
    method: 'com.example.controller.FileController.uploadFile()',
    requestParams: 'Multipart Request',
    time: 350,
    ip: '192.168.1.5',
    location: '中国-杭州',
    browser: 'Safari 15.1',
    os: 'macOS 12.0.1',
    status: 'success',
    createTime: '2023-03-19 11:10:05',
  },
  {
    id: 9,
    username: '张三',
    operation: '导入部门数据',
    method: 'com.example.controller.DepartmentController.importDepartments()',
    requestParams: 'Multipart Request',
    time: 680,
    ip: '192.168.1.1',
    location: '中国-上海',
    browser: 'Chrome 95.0.4638.69',
    os: 'Windows 10',
    status: 'failure',
    createTime: '2023-03-19 11:25:40',
  },
  {
    id: 10,
    username: '管理员',
    operation: '系统备份',
    method: 'com.example.controller.SystemController.backup()',
    requestParams: '{}',
    time: 5600,
    ip: '192.168.1.10',
    location: '中国-北京',
    browser: 'Chrome 95.0.4638.69',
    os: 'CentOS 7.9',
    status: 'success',
    createTime: '2023-03-19 12:00:00',
  },
];

// 操作类型选项
const operationTypes = [
  { value: '登录登出', label: '登录登出' },
  { value: '用户管理', label: '用户管理' },
  { value: '角色管理', label: '角色管理' },
  { value: '菜单管理', label: '菜单管理' },
  { value: '部门管理', label: '部门管理' },
  { value: '文件操作', label: '文件操作' },
  { value: '系统管理', label: '系统管理' },
];

const SystemLog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [filterOperation, setFilterOperation] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
  // 表格列配置
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户信息',
      dataIndex: 'username',
      key: 'username',
      width: 150,
      render: (username: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" />
          <Text>{username}</Text>
        </Space>
      ),
    },
    {
      title: '操作描述',
      dataIndex: 'operation',
      key: 'operation',
      ellipsis: true,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '执行方法',
      dataIndex: 'method',
      key: 'method',
      width: 300,
      ellipsis: true,
      render: (text: string) => (
        <Tooltip title={text}>
          <Text type="secondary" style={{ fontSize: '12px' }}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: '执行耗时',
      dataIndex: 'time',
      key: 'time',
      width: 120,
      sorter: (a: typeof mockLogs[0], b: typeof mockLogs[0]) => a.time - b.time,
      render: (time: number) => {
        let color = 'success';
        if (time > 1000) {
          color = 'warning';
        }
        if (time > 3000) {
          color = 'error';
        }
        return <Tag color={color}>{time} ms</Tag>;
      },
    },
    {
      title: '来源信息',
      key: 'source',
      width: 200,
      render: (_: unknown, record: typeof mockLogs[0]) => (
        <Space direction="vertical" size={0}>
          <Space>
            <GlobalOutlined />
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.ip} ({record.location})</Text>
          </Space>
          <Space>
            <LaptopOutlined />
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.browser} / {record.os}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        status === 'success' 
          ? <Badge status="success" text="成功" /> 
          : <Badge status="error" text="失败" />
      ),
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
      render: (time: string) => (
        <Space>
          <ClockCircleOutlined />
          <span>{time}</span>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: unknown, record: typeof mockLogs[0]) => (
        <Space>
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<FileSearchOutlined />} 
              size="small" 
              onClick={() => handleViewLogDetail(record)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small" 
              danger
              onClick={() => handleDeleteLog(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  // 批量操作
  const hasSelected = selectedRowKeys.length > 0;
  
  // 查看日志详情
  const handleViewLogDetail = (record: typeof mockLogs[0]) => {
    console.log('查看日志详情', record);
  };
  
  // 删除日志
  const handleDeleteLog = (record: typeof mockLogs[0]) => {
    console.log('删除日志', record.id);
  };
  
  // 批量删除日志
  const handleBatchDelete = () => {
    console.log('批量删除', selectedRowKeys);
    setSelectedRowKeys([]);
  };
  
  // 清空所有日志
  const handleClearAll = () => {
    console.log('清空所有日志');
  };
  
  // 导出日志
  const handleExportLogs = () => {
    console.log('导出日志');
  };
  
  // 刷新数据
  const refreshData = () => {
    setLoading(true);
    setSelectedRowKeys([]);
    setTimeout(() => {
      setLoading(false);
      setSearchText('');
      setDateRange(null);
      setFilterOperation(null);
      setFilterStatus(null);
    }, 500);
  };
  
  // 获取过滤后的日志数据
  const getFilteredLogs = () => {
    return mockLogs.filter(log => {
      // 文本搜索
      const matchesSearch = searchText
        ? log.username.includes(searchText) ||
          log.operation.includes(searchText) ||
          log.method.includes(searchText) ||
          log.ip.includes(searchText) ||
          log.location.includes(searchText)
        : true;
      
      // 操作类型过滤
      const matchesOperation = filterOperation
        ? log.operation.includes(filterOperation)
        : true;
      
      // 状态过滤
      const matchesStatus = filterStatus
        ? log.status === filterStatus
        : true;
      
      // 日期范围过滤 (简化实现，实际项目中应该使用 moment.js 等进行日期比较)
      const matchesDateRange = true; // 简化实现
      
      return matchesSearch && matchesOperation && matchesStatus && matchesDateRange;
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
              <Title level={4} style={{ margin: 0 }}>
                <Space>
                  <AuditOutlined />
                  <span>操作日志</span>
                </Space>
              </Title>
              <Text type="secondary">记录系统操作日志，跟踪用户行为，排查系统异常</Text>
            </Col>
            <Col>
              <Space>
                <Button 
                  danger 
                  disabled={!hasSelected} 
                  onClick={handleBatchDelete}
                  icon={<DeleteOutlined />}
                >
                  批量删除
                </Button>
                <Button 
                  onClick={handleClearAll} 
                  danger
                >
                  清空日志
                </Button>
                <Button 
                  icon={<ExportOutlined />} 
                  onClick={handleExportLogs}
                >
                  导出日志
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
        bodyStyle={{ padding: '24px' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6} lg={6}>
            <Search
              placeholder="搜索用户名、操作、IP..."
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <RangePicker 
              style={{ width: '100%' }} 
              placeholder={['开始日期', '结束日期']}
              value={dateRange}
              onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | null)}
            />
          </Col>
          <Col xs={24} sm={12} md={4} lg={4}>
            <Select
              placeholder="操作类型"
              allowClear
              style={{ width: '100%' }}
              onChange={(value) => setFilterOperation(value)}
              value={filterOperation}
            >
              {operationTypes.map(type => (
                <Option key={type.value} value={type.value}>{type.label}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4} lg={4}>
            <Select
              placeholder="状态"
              allowClear
              style={{ width: '100%' }}
              onChange={(value) => setFilterStatus(value)}
              value={filterStatus}
            >
              <Option value="success">成功</Option>
              <Option value="failure">失败</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} style={{ textAlign: 'right' }}>
            <Space>
              <Tooltip title="更多筛选">
                <Button icon={<FilterOutlined />} />
              </Tooltip>
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
          dataSource={getFilteredLogs()}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条日志`,
          }}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: '0 48px' }}>
                <Divider orientation="left">请求参数</Divider>
                <Paragraph style={{ marginBottom: 16 }}>
                  <Space>
                    <CodeOutlined />
                    <pre style={{ margin: 0, padding: 16, background: '#f5f5f5', borderRadius: 4, overflow: 'auto' }}>
                      {record.requestParams}
                    </pre>
                  </Space>
                </Paragraph>
              </div>
            ),
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: (newSelectedRowKeys) => {
              setSelectedRowKeys(newSelectedRowKeys);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default SystemLog; 