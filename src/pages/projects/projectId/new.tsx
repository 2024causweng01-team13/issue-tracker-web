import React from 'react';
import { Button, Input, DatePicker, Select, Form } from 'antd';
import moment from 'moment';
import { Issue } from './IssueCard';
const { TextArea } = Input;
const { Option } = Select;

const CreateIssue: React.FC<{ onIssueCreate?: (issue: Issue) => void }> = ({ onIssueCreate }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const newIssue: Issue = {
      id: Date.now(), // 임시 ID 생성
      title: values.title,
      description: values.description,
      status: values.status || 'To-Do', // 기본 상태 설정
    };
    if (onIssueCreate) {
      onIssueCreate(newIssue); // 이슈 생성 함수 호출
    } else {
      console.error('onIssueCreate prop is missing!');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ reportedDate: moment() }}>
      <Form.Item name="title" label="Issue Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Issue Description" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="reporter" label="Reporter" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="reportedDate" label="Reported Date" rules={[{ required: true }]}>
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name="assignee" label="Assignee">
        <Input />
      </Form.Item>
      <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
        <Select>
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Issue Status" rules={[{ required: true }]}>
        <Select>
          <Option value="To-Do">To-Do</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Done">Done</Option>
        </Select>
      </Form.Item>
      <Form.Item name="comment" label="Comment">
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Issue
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateIssue;
