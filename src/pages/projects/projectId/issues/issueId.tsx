import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Issue, Comment } from '../IssueInterface';
import { initialIssues } from '../IssueBoard';
import CommentList from './CommentBy';
import '../../../../styles/IssueDetail.css';

const IssueDetail: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);


  // useEffect(() => {
  //   // localStorage에서 이슈 데이터를 가져옴
  //   // const existingIssues = JSON.parse(localStorage.getItem('issues') || '[]');
  //   // const foundIssue = existingIssues.find((issue: Issue) => issue.id === parseInt(id!));

  //   const foundIssue = initialIssues.find((issue: Issue) => issue.id === parseInt(id));
  //   setIssue(foundIssue);
  // }, [id]);

  useEffect(() => {
    if (id) {
      const foundIssue = initialIssues.find(issue => issue.id === parseInt(id as string));
      setIssue(foundIssue || null);
    }
  }, [id]);

  const handleAddComment = (comment: Comment) => {
    if (issue) {
      const updatedIssue = {
        ...issue,
        comments: issue.comments ? [...issue.comments, comment] : [comment],
      };
      setIssue(updatedIssue);
    }
  };

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="issue-detail">
      <h2>Issue Detail</h2>
      <p><strong>Issue ID:</strong> {issue.id}</p>
      <p><strong>Title:</strong> {issue.title}</p>
      <p><strong>Description:</strong> {issue.description}</p>
      <p><strong>Reporter:</strong> {issue.reporter}</p>
      <p><strong>ReportedDate:</strong> {issue.reportedDate}</p>
      <p><strong>Fixer:</strong> {issue.fixer}</p>
      <p><strong>Assignee:</strong> {issue.assignee}</p>
      <p><strong>Priority:</strong> {issue.priority}</p>
      <p><strong>Status:</strong> {issue.status}</p>
      <p><strong>Keyword:</strong> {issue.keyword}</p>

      <div className='comments-section'>
        <CommentList comments={issue.comments || []} onAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default IssueDetail;
