import React, { useState } from 'react';
import { Comment } from '../IssueInterface';
import { List, Form, Input, Button } from 'antd';
import '../../../../styles/IssueDetail.css';

interface CommentProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
}

const CommentList: React.FC<CommentProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState<string>('');
  const [commentedBy, setCommentedBy] = useState<string>('');

  const handleAddComment = () => {
    if (newComment.trim() && commentedBy.trim()) {
      const comment: Comment = {
        id: Date.now(),
        content: newComment,
        commentedBy,
        commentedDate: new Date(),
      };
      onAddComment(comment);
      setNewComment('');
      setCommentedBy('');
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
              title={comment.commentedBy}
              description={comment.commentedDate.toString()}
            />
            <div>{comment.content}</div>
          </List.Item>
        )}
      />
      <Form layout="vertical" className="comment-form">
        <Form.Item label="Commented By">
          <Input value={commentedBy} onChange={e => setCommentedBy(e.target.value)} />
        </Form.Item>
        <Form.Item label="Comment">
          <Input.TextArea rows={4} value={newComment} onChange={e => setNewComment(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CommentList;
