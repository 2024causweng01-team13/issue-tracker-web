import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { fetcher } from './apis';
import { PATHS, Router } from './routes/routers';

const { Header, Content, Sider } = Layout;

export const App = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({ queryKey: ['health'], queryFn: () => fetcher.get('/actuator/health')});
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const Menus: MenuProps['items'] = [{
    key: 'Login',
    label: '로그인',
    onClick: () => navigate(PATHS.LOGIN),
    icon: React.createElement(UserOutlined),
  }, {
    key: 'Projects',
    label: '프로젝트',
    onClick: () => navigate(PATHS.PROJECTS_BOARD),
    icon: React.createElement(LaptopOutlined)
  }]

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', width: '100%', padding: 30 }}>
        <h2 className="text-[#FFFFFF]">Issue Tracker</h2>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu 
            mode="inline" 
            items={Menus} 
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}
            items={[{title: 'Home'}, { title: 'Login'}]} 
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <Router />
            <p>
              Issue Tracker Server Status: {data && !isLoading ? JSON.stringify(data.data) : 'Loading...'}
            </p>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
