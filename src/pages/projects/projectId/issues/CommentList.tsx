import { fetcher } from '@/apis';
import { useUser } from '@/pages/UserContext';
import { PATHS } from '@/routes/routers';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, List, message } from 'antd';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../../styles/IssueDetail.css';
import { Comment } from '../IssueInterface';

interface CommentProps {
  comments: Comment[];
  onAddComment: () => void;
}

type CommentFormValues = {
  authorId: number;
  parentIssueId: number;
  content: string;
}

const CommentList: React.FC<CommentProps> = ({ comments, onAddComment }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [newComment, setNewComment] = useState<string>('');

  const mutation = useMutation({
    mutationFn: (data: CommentFormValues) => fetcher.post(`/api/v1/comments`, data),
    onSuccess: () => {
      message.info('댓글이 추가되었습니다.');

      onAddComment();
      setNewComment('');
    },
    onError: (error) => {
      message.error('댓글 추가에 실패했습니다. \n' + (error as AxiosError).response?.data?.message ?? error.message);
      console.error(error);
    }
  })

  const handleAddComment = () => {
    if (!user) {
      message.error('로그인이 필요합니다.');
      navigate(PATHS.LOGIN);
      return;
    }

    if (newComment.trim()) {
      const comment: CommentFormValues = {
        content: newComment,
        authorId: user.id,
        parentIssueId: Number(id),
      };

      mutation.mutate(comment);
    }
  };

  return (
    <div className="comment-list">
      <List
        header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={comment => (
          <List.Item key={comment.id}>
            <List.Item.Meta
              title={comment.authorName}
              description={comment.createdAt.toString()}
            />
            <div>{comment.content}</div>
          </List.Item>
        )}
      />
      <Form layout="vertical" className="comment-form">
        <Form.Item label="Comment">
          <Input.TextArea rows={4} value={newComment} onChange={e => setNewComment(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddComment}>
            코멘트 추가하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CommentList;
