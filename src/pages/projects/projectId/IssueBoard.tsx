import { PATHS } from '@/routes/routers';
import { Button, Flex, Modal } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../styles/IssueBoard.css';
import IssueCard from './IssueCard';
import { Issue } from './IssueInterface';
import CreateIssue from './new';

export const initialIssues: Issue[] = [
  { id: 1, 
    title: '첫 번째 이슈', 
    description: '이슈 설명', 
    reporter: '1', 
    reportedDate:'2024.05.31',
    fixer:'11', assignee:'111', 
    priority:'Blocker', 
    status: 'New', 
    comments:[], 
    keyword:'이슈설명' },
  { id: 2, 
    title: '두 번째 이슈', 
    description: '다른 이슈 설명', 
    reporter: '2', 
    reportedDate:'2024.05.31',
    fixer:'22', 
    assignee:'222', 
    priority:'Trivial', 
    status: 'Reopened', 
    comments:[], 
    keyword:'다른이슈 설명', },
];


const IssueBoard: React.FC = () => {
  const [issues, setIssues] = useState(initialIssues);
  const [ModalVisible, setModalVisible] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();

  const showModal = () => {
    setModalVisible(true);
  };
  
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleIssueCreate = (newIssue: Issue) => {
    setIssues(prevIssues => [...prevIssues, newIssue]);
    setModalVisible(false);                                                                                                                                                                                          
  };

  const navigateToAnalytics = () => {
    if (projectId) {
      navigate(PATHS.PROJECT_ANALYTICS.replace(':projectId', projectId));
    }
  }

  return (
    <div className="issue-board">
      <div className="button-container">
        <Flex gap="small">
          <Button onClick={navigateToAnalytics}>
            Analytics
          </Button>
          <Button className="create-issue-btn" onClick={showModal}>
            Create Issue
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
        <div className="column">
          <h4>New</h4>
          <hr />
          {issues
            .filter(issue => issue.status === 'New')
            .map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>

        <div className="column">
          <h4>Assigned</h4>
          <hr />
          {issues
            .filter(issue => issue.status === 'Assigned')
            .map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>

        <div className="column">
          <h4>Resolved</h4>
          <hr />
          {issues
            .filter(issue => issue.status === 'Resolved')
            .map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>

        <div className="column">
          <h4>Closed</h4>
          <hr />
          {issues
            .filter(issue => issue.status === 'Closed')
            .map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>

        <div className="column">
          <h4>Reopened</h4>
          <hr />
          {issues
            .filter(issue => issue.status === 'Reopened')
            .map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default IssueBoard;
