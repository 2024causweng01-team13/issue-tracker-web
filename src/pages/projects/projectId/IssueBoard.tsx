import { CommonResponse, fetcher } from '@/apis';
import { IssueStatus, ProjectStatus } from '@/apis/enums';
import { PATHS } from '@/routes/routers';
import { useQuery } from '@tanstack/react-query';
import { Button, Descriptions, Divider, Flex, List, Modal, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../styles/IssueBoard.css';
import { AddMemberModal } from '../AddMemberModal';
import IssueCard from './IssueCard';
import { Issue } from './IssueInterface';
import CreateIssue from './new';

type FindIssuesResponse = CommonResponse<{
  issues: Issue[];
}>;

type FindProjectResponse = CommonResponse<{
  id: number;
  title: string;
  description: string;
  managerName: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  members: {
    id: number;
    name: string;
  }[];
}>

const IssueBoard: React.FC = () => {
  const [ModalVisible, setModalVisible] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['issues', 'ofProject', projectId],
    queryFn: async () => 
      fetcher.post<FindIssuesResponse>('/api/v1/issues/find', { projectId, searchAs: "PROJECT_ID" }),
  });

  const { data: projectData, isLoading: isProjectLoading, refetch: refetchProject } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => fetcher.get<FindProjectResponse>(`/api/v1/projects/${projectId}`),
  });

  const issues = data?.data?.data?.issues ?? [];
  const project = projectData?.data?.data;
  const projectItems = project ? [{
    key: 1,
    label: '제목',
    children: project.title,
  }, {
    key: 3,
    label: '매니저',
    children: project.managerName,
  }, {
    key: 4,
    label: '상태',
    children: project.status,
  }, {
    key: 2,
    label: '설명',
    children: project.description,
    span: 3,
  }, {
    key: 5,
    label: '생성일',
    children: <>{project.createdAt}</>,
  }, {
    key: 6,
    label: '수정일',
    children: <>{project.updatedAt}</>,
  }] : [];

  const showModal = () => {
    setModalVisible(true);
  };
  
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleIssueCreate = () => {
    refetch();
    setModalVisible(false);                                                                                                                                                                                          
  };

  const navigateToAnalytics = () => {
    if (projectId) {
      navigate(PATHS.PROJECT_ANALYTICS.replace(':projectId', projectId));
    }
  }

  return (
    <div>
      {isLoading && isProjectLoading && project ? (
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          <div className="m-20">
            <Spin tip="로딩 중입니다" size="large" />
          </div>
        </Flex>
      ) : (
        <>
          <Descriptions title={`프로젝트 ${projectId} 정보`} items={projectItems} layout="vertical" bordered={true} size="small" />
          <div className="button-container">
            <Flex gap="small">
              <Button onClick={navigateToAnalytics}>
                분석
              </Button>
              <Button className="create-issue-btn" onClick={showModal}>
                이슈 생성하기
              </Button>
            </Flex>
          </div>
          <Modal
            title="Create a New Issue"
            open={ModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <CreateIssue onIssueCreate={handleIssueCreate} />
          </Modal>
          <div className='column-container'>
            {Object.values(IssueStatus).map(status => (
              <div className="column">
                <h4>{status}</h4>
                <hr />
                {issues
                  .filter(issue => issue.status === status)
                  .map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
              </div>
            ))}
          </div>
          <Divider />
          <Flex justify='space-between'>
            <Title level={2} className="mb-1">멤버 목록</Title>
            <Button onClick={() => setIsAddMemberModalOpen(true)}>멤버 추가하기</Button>
          </Flex>
          <AddMemberModal 
            isVisible={isAddMemberModalOpen}
            setIsVisible={setIsAddMemberModalOpen}
            onAddMemberSuccess={refetchProject}
          />
          <List
            bordered
            dataSource={project?.members ?? []}
            renderItem={(item) => (
              <List.Item id={item.id.toString()} className="hover:bg-slate-200">
                {item.name}
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default IssueBoard;
