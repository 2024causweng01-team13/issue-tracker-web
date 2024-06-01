import React, { useState } from 'react';
import { Issue } from '../IssueInterface';
import { Button, Input, Form } from 'antd';
import '../../../../styles/EditIssue.css';

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
        <Form.Item label="Reporter">
          <Input
            type="text"
            name="reporter"
            value={editedIssue.reporter}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Reported Date">
          <Input
            type="text"
            name="reportedDate"
            value={editedIssue.reportedDate}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Fixer">
          <Input
            type="text"
            name="fixer"
            value={editedIssue.fixer}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Assignee">
          <Input
            type="text"
            name="assignee"
            value={editedIssue.assignee}
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
        <Form.Item label="Keyword">
          <Input
            type="text"
            name="keyword"
            value={editedIssue.keyword}
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
