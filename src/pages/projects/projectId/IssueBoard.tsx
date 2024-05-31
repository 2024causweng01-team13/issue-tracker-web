import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import IssueCard, { Issue } from './IssueCard';
import CreateIssue from './new';
import '../../../styles/IssueBoard.css';

const initialIssues: Issue[] = [
  { id: 1, title: '첫 번째 이슈', description: '이슈 설명', status: 'To-Do' },
  { id: 2, title: '두 번째 이슈', description: '다른 이슈 설명', status: 'To-Do' },
  { id: 3, title: '세 번째 이슈', description: '또 다른 이슈 설명', status: 'In Progress' },
  { id: 4, title: '네 번째 이슈', description: '이슈 설명 업데이트', status: 'Done' },
];

const IssueBoard: React.FC = () => {
  const [issues, setIssues] = useState(initialIssues);
  const [ModalVisible, setModalVisible] = useState(false);

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

  return (
    <div className="issue-board">
      <div className="button-container">
        <Button className="create-issue-btn" onClick={showModal}>
          Create Issue
        </Button>
      </div>

      <Modal
        title="Create a New Issue"
        visible={ModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateIssue onIssueCreate={handleIssueCreate} />
      </Modal>

      <div className="column">
        <h4>To-Do</h4>
        <hr />
        {issues
          .filter(issue => issue.status === 'To-Do')
          .map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
      </div>

      <div className="column">
        <h4>In Progress</h4>
        <hr />
        {issues
          .filter(issue => issue.status === 'In Progress')
          .map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
      </div>

      <div className="column">
        <h4>Done</h4>
        <hr />
        {issues
          .filter(issue => issue.status === 'Done')
          .map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
      </div>
    </div>
  );
};

export default IssueBoard;
