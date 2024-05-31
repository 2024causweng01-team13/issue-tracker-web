import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Issue } from '../IssueCard';

const IssueDetail: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);

  
  useEffect(() => {
    // localStorage에서 이슈 데이터를 가져옴
    const existingIssues = JSON.parse(localStorage.getItem('issues') || '[]');
    const foundIssue = existingIssues.find((issue: Issue) => issue.id === parseInt(id!));
    setIssue(foundIssue);
  }, [id]);

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Issue Detail</h2>
      <p><strong>Issue ID:</strong> {issue.id}</p>
      <p><strong>Title:</strong> {issue.title}</p>
      <p><strong>Description:</strong> {issue.description}</p>
      <p><strong>Status:</strong> {issue.status}</p>
    </div>
  );
};

export default IssueDetail;
