import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Row, Col, Space, Statistic, Avatar, Tag, Card, Button, Tooltip, Progress, Spin, Select } from 'antd';
import { 
  UserOutlined, 
  LineChartOutlined, 
  DollarOutlined, 
  DownloadOutlined, 
  ShoppingCartOutlined,
  ReloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// 折线图组件 - 使用固定假数据
const AreaChart: React.FC = React.memo(() => {
  // 固定假数据
  const downloadData = [1200, 1750, 2300, 1800, 2450, 3000, 2650, 3200, 2800];
  const registerData = [480, 700, 950, 820, 1100, 1350, 1200, 1400, 1250];
  const timeLabels = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  
  // 计算图表的最大值，用于垂直方向的标准化
  const maxValue = Math.max(...downloadData, ...registerData);
  
  // 将数据转换为图表坐标点
  const getDataPoints = (data: number[]): string => {
    return data
      .map((value, index) => {
        // 水平位置：按索引均匀分布，从左到右
        const x = `${index * (100 / (data.length - 1))}%`;
        // 垂直位置：根据数值相对于最大值的比例，从上到下
        // 减去10%的空间作为上边距，底部留出20px作为空白
        const y = 200 - (value / maxValue * 180 + 10);
        return `${x},${y}`;
      })
      .join(' ');
  };
  
  // 折线点数据
  const downloadPoints = getDataPoints(downloadData);
  const registerPoints = getDataPoints(registerData);
  
  return (
    <div style={{ height: '300px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Space>
          <Tag color="#1890ff">下载量</Tag>
          <Tag color="#52c41a">注册量</Tag>
        </Space>
        <Space>
          <Text type="secondary">单位: 次数</Text>
        </Space>
      </div>
      
      <div style={{ 
        height: '220px', 
        position: 'relative',
        borderRadius: '4px',
        border: '1px solid #f0f0f0',
        padding: '10px 0',
        backgroundColor: '#fff'
      }}>
        {/* Y轴网格线 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={`grid-y-${i}`}
            style={{
              position: 'absolute',
              top: `${i * 25}%`,
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: '#f0f0f0',
              zIndex: 1
            }}
          />
        ))}
        
        {/* Y轴标签 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={`label-y-${i}`}
            style={{
              position: 'absolute',
              top: `${i * 25}%`,
              left: '8px',
              transform: 'translateY(-50%)',
              fontSize: '12px',
              color: '#8c8c8c',
              zIndex: 2
            }}
          >
            {Math.round((4 - i) * maxValue / 4)}
          </div>
        ))}
        
        {/* X轴网格线 */}
        {timeLabels.map((_, i) => (
          <div
            key={`grid-x-${i}`}
            style={{
              position: 'absolute',
              left: `${i * (100 / (timeLabels.length - 1))}%`,
              top: 0,
              bottom: 0,
              width: '1px',
              backgroundColor: i === 0 ? 'transparent' : '#f0f0f0',
              zIndex: 1
            }}
          />
        ))}
        
        {/* 下载量折线 */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 3 }}
        >
          <polyline
            points={downloadPoints}
            fill="none"
            stroke="#1890ff"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* 下载量数据点 */}
          {downloadData.map((value, i) => {
            const x = `${i * (100 / (downloadData.length - 1))}%`;
            const y = 200 - (value / maxValue * 180 + 10);
            return (
              <circle
                key={`download-point-${i}`}
                cx={x}
                cy={y}
                r="3"
                fill="#ffffff"
                stroke="#1890ff"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        
        {/* 注册量折线 */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 3 }}
        >
          <polyline
            points={registerPoints}
            fill="none"
            stroke="#52c41a"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* 注册量数据点 */}
          {registerData.map((value, i) => {
            const x = `${i * (100 / (registerData.length - 1))}%`;
            const y = 200 - (value / maxValue * 180 + 10);
            return (
              <circle
                key={`register-point-${i}`}
                cx={x}
                cy={y}
                r="3"
                fill="#ffffff"
                stroke="#52c41a"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        
        {/* 交互层 - 数据点悬停提示 */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 4, pointerEvents: 'none' }}>
          {downloadData.map((value, i) => {
            const x = `${i * (100 / (downloadData.length - 1))}%`;
            const y = 200 - (value / maxValue * 180 + 10);
            const registerValue = registerData[i];
            const registerY = 200 - (registerValue / maxValue * 180 + 10);
            
            return (
              <React.Fragment key={`hover-area-${i}`}>
                {/* 下载量悬停区域 */}
                <div style={{
                  position: 'absolute',
                  left: `calc(${x} - 10px)`,
                  top: `calc(${y / 2}% - 10px)`,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  zIndex: 5,
                }} 
                onMouseEnter={() => {
                  const tooltip = document.getElementById(`tooltip-download-${i}`);
                  if (tooltip) {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                  }
                }}
                onMouseLeave={() => {
                  const tooltip = document.getElementById(`tooltip-download-${i}`);
                  if (tooltip) {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                  }
                }}
                >
                  <div 
                    id={`tooltip-download-${i}`}
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      opacity: 0,
                      visibility: 'hidden',
                      transition: 'opacity 0.3s, visibility 0.3s',
                      zIndex: 10
                    }}
                  >
                    {`下载量: ${value}`}
                  </div>
                </div>
                
                {/* 注册量悬停区域 */}
                <div style={{
                  position: 'absolute',
                  left: `calc(${x} - 10px)`,
                  top: `calc(${registerY / 2}% - 10px)`,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  zIndex: 5,
                }} 
                onMouseEnter={() => {
                  const tooltip = document.getElementById(`tooltip-register-${i}`);
                  if (tooltip) {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                  }
                }}
                onMouseLeave={() => {
                  const tooltip = document.getElementById(`tooltip-register-${i}`);
                  if (tooltip) {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                  }
                }}
                >
                  <div 
                    id={`tooltip-register-${i}`}
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      opacity: 0,
                      visibility: 'hidden',
                      transition: 'opacity 0.3s, visibility 0.3s',
                      zIndex: 10
                    }}
                  >
                    {`注册量: ${registerValue}`}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* X轴标签 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '8px', 
        paddingLeft: '32px', 
        paddingRight: '8px' 
      }}>
        {timeLabels.map((time, i) => (
          <Text key={`time-${i}`} type="secondary" style={{ fontSize: '12px' }}>{time}</Text>
        ))}
      </div>
    </div>
  );
});

// 使用React.memo优化图表组件
const PieChart: React.FC = React.memo(() => (
  <div style={{ height: '300px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ 
      width: '200px', 
      height: '200px', 
      borderRadius: '50%', 
      position: 'relative',
      background: 'conic-gradient(#5B8FF9 0% 25%, #5AD8A6 25% 50%, #5D7092 50% 75%, #F6BD16 75% 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
    >
      <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'white' }} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
      <Space>
        <Tag color="#5B8FF9">学习</Tag>
        <Tag color="#5D7092">娱乐</Tag>
        <Tag color="#F6BD16">工作</Tag>
        <Tag color="#5AD8A6">休息</Tag>
      </Space>
    </div>
  </div>
));

// 统计卡片组件
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: number;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = React.memo(({ title, value, icon, color, trend = 0, loading = false }) => {
  return (
    <div style={{ 
      backgroundColor: color,
      color: 'white',
      height: '160px',
      borderRadius: '8px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {loading ? (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 10
        }}>
          <Spin size="large" />
        </div>
      ) : null}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={5} style={{ color: 'white', margin: 0 }}>{title}</Title>
        {trend !== 0 && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: trend > 0 ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            {trend > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            <span style={{ marginLeft: '4px' }}>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      
      <Space align="center" style={{ marginTop: 'auto' }}>
        {icon}
        <Title level={2} style={{ color: 'white', margin: 0 }}>{value}</Title>
      </Space>
      
      {/* 装饰元素 */}
      <div style={{ 
        position: 'absolute', 
        right: -20, 
        bottom: -20, 
        width: '100px', 
        height: '100px', 
        borderRadius: '50%', 
        backgroundColor: 'rgba(255, 255, 255, 0.1)' 
      }} />
    </div>
  );
});

const Dashboard: React.FC = () => {
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [progressValue, setProgressValue] = useState(68);
  
  // 获取当前日期和时间
  const today = new Date();
  const hours = today.getHours();
  let greeting = '早安';
  
  if (hours >= 12 && hours < 18) {
    greeting = '下午好';
  } else if (hours >= 18) {
    greeting = '晚上好';
  }
  
  // 格式化上次更新时间
  const formatLastUpdated = (): string => {
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return '刚刚更新';
    if (diffMins < 60) return `${diffMins}分钟前更新`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}小时前更新`;
    
    return `${lastUpdated.getMonth() + 1}月${lastUpdated.getDate()}日更新`;
  };
  
  // 刷新数据
  const refreshData = useCallback(() => {
    setLoading(true);
    
    // 模拟异步数据加载
    setTimeout(() => {
      setLastUpdated(new Date());
      setProgressValue(Math.floor(Math.random() * 30) + 60);
      setLoading(false);
    }, 1500);
  }, []);
  
  // 首次加载数据
  useEffect(() => {
    refreshData();
    
    // 配置定时刷新，每5分钟刷新一次数据
    const refreshInterval = setInterval(refreshData, 300000);
    
    return () => clearInterval(refreshInterval);
  }, [refreshData]);
  
  return (
    <div style={{ padding: '24px' }}>
      {/* 顶部欢迎卡片 */}
      <Card 
        bordered={false}
        style={{ marginBottom: '24px' }}
        bodyStyle={{ padding: '24px' }}
        extra={
          <Space>
            <Text type="secondary"><CalendarOutlined /> {today.toLocaleDateString()} | {formatLastUpdated()}</Text>
            <Tooltip title="刷新数据">
              <Button 
                type="text" 
                icon={<ReloadOutlined spin={loading} />} 
                onClick={refreshData}
                loading={loading}
              />
            </Tooltip>
          </Space>
        }
      >
        <Space align="center" size={16}>
          <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {greeting}, 管理员, 今天又是充满活力的一天!
            </Title>
            <Text type="secondary">今日多云转晴, 20°C - 25°C!</Text>
          </div>
        </Space>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '24px' 
        }}>
          <div style={{ width: '70%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text>本周任务完成度</Text>
              <Text strong>{progressValue}%</Text>
            </div>
            <Progress percent={progressValue} status={progressValue >= 70 ? "success" : "active"} />
          </div>
          <Space size="large">
            <Statistic title="项目数" value={25} loading={loading} />
            <Statistic title="待办" value="4/16" loading={loading} />
            <Statistic title="消息" value={12} loading={loading} />
          </Space>
        </div>
      </Card>
      
      {/* 数据统计卡片 */}
      <Card 
        bordered={false}
        style={{ marginBottom: '24px' }}
        bodyStyle={{ padding: '24px' }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard 
              title="访问量" 
              value="9,725" 
              icon={<LineChartOutlined style={{ fontSize: '24px' }} />} 
              color="#E066FF"
              trend={12}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard 
              title="成交额" 
              value="$1,026" 
              icon={<DollarOutlined style={{ fontSize: '24px' }} />} 
              color="#7B68EE"
              trend={-5}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard 
              title="下载量" 
              value="970,925" 
              icon={<DownloadOutlined style={{ fontSize: '24px' }} />} 
              color="#40A9FF"
              trend={8}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard 
              title="成交量" 
              value="9,527" 
              icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />} 
              color="#FFA500"
              trend={0}
              loading={loading}
            />
          </Col>
        </Row>
      </Card>
      
      {/* 图表区域 */}
      <Row gutter={24}>
        <Col xs={24} lg={14}>
          <Card 
            title="下载量与注册量走势"
            bordered={false}
            style={{ marginBottom: '24px' }}
            bodyStyle={{ padding: 0 }}
            loading={loading}
            extra={
              <Select defaultValue="today" style={{ width: 120 }}>
                <Option value="today">今日</Option>
                <Option value="week">本周</Option>
                <Option value="month">本月</Option>
                <Option value="year">全年</Option>
              </Select>
            }
          >
            <AreaChart />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card 
            title="时间分配"
            bordered={false}
            style={{ marginBottom: '24px' }}
            bodyStyle={{ padding: 0 }}
            loading={loading}
          >
            <PieChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 