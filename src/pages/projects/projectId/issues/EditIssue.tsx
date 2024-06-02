import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import '../../../../styles/EditIssue.css';
import { Issue } from '../IssueInterface';

interface EditIssueProps {
  issue: Issue;
  onSave: (updatedIssue: Issue) => void;
  onCancel: () => void;
}

const EditIssue: React.FC<EditIssueProps> = ({ issue, onSave, onCancel }) => {
  const [editedIssue, setEditedIssue] = useState<Issue>(issue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedIssue({
      ...editedIssue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = () => {
    onSave(editedIssue);
  };

  return (
    <div className="edit-issue">
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input
            type="text"
            name="title"
            value={editedIssue.title}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            name="description"
            value={editedIssue.description}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Priority">
          <Input
            type="text"
            name="priority"
            value={editedIssue.priority}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Status">
          <Input
            type="text"
            name="status"
            value={editedIssue.status}
            onChange={handleChange}
          />
        </Form.Item>
        <div className="button-group">
          <Button type="primary" onClick={handleSaveClick}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditIssue;
