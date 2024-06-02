import { Card } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/routers';
import '../../styles/MainBoard.css';

interface Project {
  id: number;
  title: string;
  description: string;
  managerName: string;
  status: string;
  createdAt: Date;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const cardBorderColor = () => {
    // switch (project.type) {
    //   case '개발':
    //     return '#4C9AFF';
    //   case '디자인':
    //     return '#36B37E';
    //   case '버그':
    //     return '#FF5630';
    //   default:
    //     return '#D3D3D3';
    // }
    return '#4C9AFF';
  };

  return (
    <Card
      className="projectCard"
      title={<div className="projectCardTitle">{project.title}</div>}
      bordered={false}
      onClick={() => navigate(`${PATHS.PROJECT_DETAIL.replace(':projectId', project.id.toString())}`)}
      style={{ borderColor: cardBorderColor() }}
    >
      <div className="projectCardContent">
        <div className="projectCardDescription">{project.description}</div>
        <div className="projectCardDetails">
          <span>매니저: {project.managerName}</span>
          <span>상태: {project.status}</span>
          <span>생성일: {dayjs(project.createdAt).format("YYYY-MM-DD")}</span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
