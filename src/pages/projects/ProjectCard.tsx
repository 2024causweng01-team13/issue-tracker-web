import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/routers';
import '../../styles/MainBoard.css';

interface Project {
  title: string;
  description: string;
  user: string;
  priority: string;
  type: string;
  id: number;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const cardBorderColor = () => {
    switch (project.type) {
      case '개발':
        return '#4C9AFF';
      case '디자인':
        return '#36B37E';
      case '버그':
        return '#FF5630';
      default:
        return '#D3D3D3';
    }
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
          <span>{project.user}</span>
          <span>{project.priority}</span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
