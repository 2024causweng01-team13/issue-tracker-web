import { CommonResponse, fetcher } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../../../styles/IssueDetail.css';
import { Issue } from '../IssueInterface';
import CommentList from './CommentList';
import EditIssue from './EditIssue';

const IssueDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['issues', id],
    queryFn: async () => fetcher.get<CommonResponse<Issue>>(`/api/v1/issues/${id}`),
  });

  const issue = data?.data?.data;

  const handleAddComment = () => {
    refetch();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = (updatedIssue: Issue) => {
    setIsEditing(false);
  };

  if (isLoading || !issue) {
    return (
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        <div className="m-20">
          <Spin tip="로딩 중입니다" size="large" />
        </div>
      </Flex>
    )
  }

  return (
    <div className="issue-detail">
      <h2>Issue Detail</h2>
      <div className="editIssue" style={{ margin: '10px' }}>
        <Button onClick={handleEditClick}>Edit Issue</Button>
      </div>
      {isEditing ? (
        <EditIssue issue={issue} onSave={handleSaveClick} onCancel={handleCancelClick} />
      ) : (
        <div>
          <p><strong>Issue ID:</strong> {issue.id}</p>
          <p><strong>Title:</strong> {issue.title}</p>
          <p><strong>Description:</strong> {issue.description}</p>
          <p><strong>Reporter:</strong> {issue.reporterName}</p>
          <p><strong>ReportedDate:</strong> {dayjs(issue.createdAt).format("YYYY-MM-DD")}</p>
          <p><strong>Fixer:</strong> {issue.fixerName}</p>
          <p><strong>Assignee:</strong> {issue.assigneeName}</p>
          <p><strong>Priority:</strong> {issue.priority}</p>
          <p><strong>Status:</strong> {issue.status}</p>
          <div className='comments-section'>
            <CommentList comments={issue.comments || []} onAddComment={handleAddComment} />
          </div>
        </div>
      )}

    </div>
  );
};

export default IssueDetail;
