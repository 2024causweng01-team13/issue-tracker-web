import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Issue} from './IssueInterface';

// export interface Issue {
//   id: number;
//   title: string;
//   description: string;
//   reporter: string;
//   reportedDate?: string;
//   fixer: string;
//   assignee: string;
//   priority: 'Blocker' | 'Critical' | 'Major' | 'Minor' | 'Trivial';
//   status: 'New' | 'Assigned' | 'Resolved' | 'Closed' | 'Reopened';
//   comment: string;
//   keyword:string;
// }

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
      <p>{issue.keyword}</p>
      <p>Status: {issue.status}</p>
    </div>
  );
};

export default IssueCard;
