import { CommonResponse, fetcher } from '@/apis';
import { IssueStatus } from '@/apis/enums';
import { PATHS } from '@/routes/routers';
import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Modal, Spin } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../styles/IssueBoard.css';
import IssueCard from './IssueCard';
import { Issue } from './IssueInterface';
import CreateIssue from './new';

type FindIssuesResponse = CommonResponse<{
  issues: Issue[];
}>;

const IssueBoard: React.FC = () => {
  const [ModalVisible, setModalVisible] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['issues', projectId],
    queryFn: async () => fetcher.post<FindIssuesResponse>('/api/v1/issues/find', { projectId }),
  });

  const issues = data?.data?.data?.issues ?? [];

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
    <div className="issue-board">
      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          <div className="m-20">
            <Spin tip="로딩 중입니다" size="large" />
          </div>
        </Flex>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default IssueBoard;
