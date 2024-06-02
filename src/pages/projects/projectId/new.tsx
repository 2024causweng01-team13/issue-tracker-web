import { fetcher } from '@/apis';
import { useUser } from '@/pages/UserContext';
import { PATHS } from '@/routes/routers';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { TextArea } = Input;

const CreateIssue: React.FC<{ onIssueCreate: () => void }> = ({ onIssueCreate }) => {
  const [form] = Form.useForm();
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!user) {
        message.error('로그인이 필요합니다.');
        navigate(PATHS.LOGIN);
        return Promise.reject();
      }

      return fetcher.post('/api/v1/issues', {
        ...form.getFieldsValue(),
        reporterId: user.id,
        projectId,
      });
    },
    onSuccess: () => {
      message.success('이슈가 성공적으로 생성되었습니다.');
      onIssueCreate();
    },
    onError: (error) => {
      message.error('이슈 생성에 실패했습니다.' + (error as AxiosError).response?.data?.message ?? error.message);
    },
  });

  const onFinish = () => {    
    mutate();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ reportedDate: dayjs() }}>
      <Form.Item name="title" label="Issue Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Issue Description" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          이슈 생성하기
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateIssue;

