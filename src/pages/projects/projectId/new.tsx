import React from 'react';
import { Button, Input, DatePicker, Select, Form } from 'antd';
import dayjs from 'dayjs';
import { Issue } from './IssueInterface';

const { TextArea } = Input;
const { Option } = Select;

const CreateIssue: React.FC<{ onIssueCreate?: (issue: Issue) => void }> = ({ onIssueCreate }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const newIssue: Issue = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      reporter: values.reporter,
      reportedDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      fixer: values.fixer,
      assignee: values.assignee,
      priority: values.priority || 'Major',
      status: values.status || 'New',
      comments: values.comments,
      keyword: values.keyword,
    };
    
    if (onIssueCreate) {
      onIssueCreate(newIssue); // 이슈 생성 함수 호출
    } else {
      console.error('onIssueCreate prop is missing!');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ reportedDate: dayjs() }}>
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
      <Form.Item name="fixer" label="Fixer">
        <Input />
      </Form.Item>
      <Form.Item name="assignee" label="Assignee">
        <Input />
      </Form.Item>
      <Form.Item name="priority" label="Priority" rules={[{ required: true }]} initialValue={'Major'}>
        <Select>
          <Option value="Blocker">Blocker</Option>
          <Option value="Critical">Critical</Option>
          <Option value="Major">Major</Option>
          <Option value="Minor">Minor</Option>
          <Option value="Trivial">Trivial</Option>
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Issue Status" rules={[{ required: true }]}>
        <Select>
          <Option value="New">New</Option>
          <Option value="Assigned">Assigned</Option>
          <Option value="Resolved">Resolved</Option>
          <Option value="Closed">Closed</Option>
          <Option value="Reopened">Reopened</Option>
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

