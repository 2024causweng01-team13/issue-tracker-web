import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Issue } from './IssueInterface';

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/issuedetail/${issue.id}`);
  };

  return (
    <div className="issue-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{issue.title}</h3>
      <p>우선순위: {issue.priority}</p>
      <p>상태: {issue.status}</p>
      <p>생성일: {dayjs(issue.createdAt).format("YYYY-MM-DD")}</p>
    </div>
  );
};

export default IssueCard;
