import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { PATHS, Router } from './routes/routers';
import { createGlobalStyle } from 'styled-components';

const GlobalSyles = createGlobalStyle
  `
  html {
    --grey: #3A3A3A;
    --midGrey: #666666;
    --lightGrey: #f2f2f2;
    --offWhite: #ededed;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
  }
`;

const { Header, Content, Sider } = Layout;

export const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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

  const breadCrumbContent = useMemo(() => {
    return pathname.split('/').slice(1).map(path => ({ title: path }))
  }, [pathname]);

  return (
    <div className='max-w-screen-xl m-auto h-full'>
      <Layout style={{ height: '100%', overflow: 'auto' }}>
        <GlobalSyles />
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
              items={breadCrumbContent}
            />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                overflow: 'auto',
              }}>
              <Router />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
