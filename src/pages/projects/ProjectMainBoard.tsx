import { CommonResponse, fetcher } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { Col, Flex, Row, Spin } from 'antd';
import '../../styles/MainBoard.css';
import ProjectCard from './ProjectCard';
import CreateProject from './new';

interface Project {
  id: number;
  title: string;
  description: string;
  managerName: string;
  status: string;
  createdAt: Date;
}

type FindProjectsResponse = CommonResponse<{
  projects: Project[];
}>;

export const ProjectMainBoard: React.FC = () => {
  const { data, isLoading, refetch } = useQuery({ 
    queryKey: ['projects'], 
    queryFn: async () => fetcher.post<FindProjectsResponse>('/api/v1/projects/find', {}),
  });

  const handleCreateProject = (newProject: { title: string; description: string }) => {
    refetch();
  };

  const projects = data?.data?.data?.projects ?? [];

  return (
    <div className="projectBoardContainer">
      <h1 className="projectBoardTitle">프로젝트 보드</h1>
      <div className="createProjectBox">
        <CreateProject onCreate={handleCreateProject} />
      </div>
      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          <div className="m-20">
            <Spin tip="로딩 중입니다" size="large" />
          </div>
        </Flex>
      ) : (
        <Row gutter={16}>
          {projects.map((project) => (
            <Col key={project.id} span={24}>
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProjectMainBoard;
