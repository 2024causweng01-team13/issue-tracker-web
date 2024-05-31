import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface Issue {
  id: number;
  title: string;
  description: string;
  reporter?: string;
  reportedDate?: string;
  assignee?: string;
  priority?: 'high' | 'medium' | 'low';
  status: 'To-Do' | 'In Progress' | 'Done';
  comment?: string;
}

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
      <p>{issue.description}</p>
      <p>Status: {issue.status}</p>
    </div>
  );
};

export default IssueCard;
