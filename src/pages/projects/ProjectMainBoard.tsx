import { useState } from 'react';
import { Col, Row } from 'antd';
import ProjectCard from './ProjectCard';
import CreateProject from './new';
import '../../styles/MainBoard.css';

interface Project {
  id: number;
  title: string;
  description: string;
  user: string;
  priority: string;
  type: string;
}

// 초기 기본 세팅
const initialProjects: Project[] = [
  { id: 1, title: '프로젝트 1', description: '프로젝트 1 설명', user: '사용자 A', priority: '높음', type: '개발' },
  { id: 2, title: '프로젝트 2', description: '프로젝트 2 설명', user: '사용자 B', priority: '중간', type: '디자인' },
];

export const ProjectMainBoard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleCreateProject = (newProject: { title: string; description: string }) => {
    const newId = projects.length ? projects[projects.length - 1].id + 1 : 1;
    const projectWithId: Project = { id: newId, ...newProject, user: '사용자 C', priority: '낮음', type: '기타' }; // 기본값 설정
    setProjects([...projects, projectWithId]);
  };

  return (
    <div className="projectBoardContainer">
      <h1 className="projectBoardTitle">프로젝트 보드</h1>
      <div className="createProjectBox">
        <CreateProject onCreate={handleCreateProject} />
      </div>
      <Row gutter={16}>
        {projects.map((project) => (
          <Col key={project.id} span={24}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProjectMainBoard;
