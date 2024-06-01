import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, type MenuProps } from 'antd';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnalyticsByDate } from "./AnalyticsByDate";
import { AnalyticsByMember } from "./AnalyticsByMember";

type MenuItem = Required<MenuProps>['items'][number];

const ProjectAnalytics = () => {
  const { projectId } = useParams();
  const [current, setCurrent] = useState('byDate');

  const items: MenuItem[] = [
    {
      label: '날짜별',
      key: 'byDate',
      icon: <CalendarOutlined />,
    },
    {
      label: '멤버별',
      key: 'byMember',
      icon: <UserOutlined />,
    }
  ];

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  }

  return (
    <div>
      <h1 className="mb-10">Project {projectId} 분석</h1>
      <Menu 
        mode="horizontal" 
        selectedKeys={[current]} 
        onClick={onClick} 
        items={items} 
        style={{ marginBottom: 20 }}
      />
      {current === 'byDate' && <AnalyticsByDate />}
      {current === 'byMember' && <AnalyticsByMember />}
    </div>
  )
};

export default ProjectAnalytics;
