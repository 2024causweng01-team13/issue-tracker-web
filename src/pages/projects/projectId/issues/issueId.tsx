import { CommonResponse, fetcher } from '@/apis';
import { PATHS } from '@/routes/routers';
import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Spin, message } from 'antd';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../../styles/IssueDetail.css';
import { Issue } from '../IssueInterface';
import { AssignIssueModal } from './AssignIssueModal';
import CommentList from './CommentList';
import EditIssue from './EditIssue';
import { FixIssueModal } from './FixIssueModal';

const IssueDetail: React.FC = () => {
  const { id: issueId } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const [isAssignIssueModalOpen, setIsAssignIssueModalOpen] = useState(false);
  const [isFixIssueModalOpen, setIsFixIssueModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['issues', issueId],
    queryFn: async () => fetcher.get<CommonResponse<Issue>>(`/api/v1/issues/${issueId}`)
      .catch((error) => {
        message.error((error as AxiosError).response?.data?.message ?? error.message);
        navigate(PATHS.PROJECTS_BOARD);
      }),
  });

  const issue = data?.data?.data;

  const assignIssue = () => {
    setIsAssignIssueModalOpen(true);
  }
  
  const fixIssue = () => {
    setIsFixIssueModalOpen(true);
  }

  const handleAddComment = () => {
    refetch();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    refetch();
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
      <h2>{issue.title}</h2>
      <Flex vertical gap="small" justify="end" align="end">
        {!isEditing && (
          <>
            <Button type="primary" onClick={handleEditClick}>이슈 수정하기</Button>
            <Flex gap="small">
              <Button onClick={assignIssue}>이슈 할당하기</Button>
              <Button onClick={fixIssue}>이슈 해결하기</Button>
            </Flex>
          </>
        )}
      </Flex>
      <AssignIssueModal 
        isVisible={isAssignIssueModalOpen} 
        setIsVisible={setIsAssignIssueModalOpen} 
        onAssignSuccess={() => refetch()}
      />
      <FixIssueModal
        isVisible={isFixIssueModalOpen}
        setIsVisible={setIsFixIssueModalOpen}
        onFixSuccess={() => refetch()}
      />
      {isEditing ? (
        <EditIssue issue={issue} onEditSuccess={handleEditSuccess} onCancel={handleCancelClick} />
      ) : (
        <div>
          <p><strong>Issue ID:</strong> {issue.id}</p>
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
