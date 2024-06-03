import { fetcher } from '@/apis';
import { IssuePriority, IssueStatus } from '@/apis/enums';
import { useUser } from '@/pages/UserContext';
import { PATHS } from '@/routes/routers';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Select, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../../styles/EditIssue.css';
import { Issue } from '../IssueInterface';

interface EditIssueProps {
  issue: Issue;
  onEditSuccess: () => void;
  onCancel: () => void;
}

const EditIssue: React.FC<EditIssueProps> = ({ issue, onEditSuccess, onCancel }) => {
  const [editedIssue, setEditedIssue] = useState<Issue>(issue);
  const [form] = useForm();
  const { id: issueId } = useParams<{ id: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => {
      if (!user) {
        message.error('로그인이 필요합니다.');
        navigate(PATHS.LOGIN);
        return Promise.reject();
      }

      console.log(form.getFieldsValue());

      return fetcher.post(`/api/v1/issues/${issueId}`, {
        editorId: user.id,
        ...form.getFieldsValue(),
      });
    },
    onSuccess: () => {
      message.success('성공적으로 수정되었습니다!');
      onEditSuccess();
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedIssue({
      ...editedIssue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    mutate();
  }

  return (
    <div className="edit-issue">
      <Form form={form} layout="vertical" onFinish={mutate}>
        <Form.Item label="Title">
          <Input
            type="text"
            name="제목"
            value={editedIssue.title}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            name="설명"
            value={editedIssue.description}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item name="priority" label="우선순위" rules={[{ required: true }]} initialValue={editedIssue.priority}>
          <Select>
            {Object.values(IssuePriority).map((priority) => (
              <Select.Option key={priority} value={priority}>
                {priority}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="상태" rules={[{ required: true }]} initialValue={editedIssue.status}>
          <Select>
            {Object.values(IssueStatus).map((status) => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className="button-group">
          <Button type="primary" onClick={handleSave}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditIssue;
