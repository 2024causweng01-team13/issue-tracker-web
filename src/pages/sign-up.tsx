import { fetcher } from '@/apis';
import { PATHS } from '@/routes/routers';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { AxiosError } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

interface SignUpFormValues {
  loginId: string;
  password: string;
  name: string;
}

const SignUp: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: SignUpFormValues) => fetcher.post('/api/v1/auth/sign-up', data), // API URL을 실제 주소
    onSuccess: (data) => {
      const token = data.data?.data?.token;
      if (!token) {
        message.error('토큰이 없습니다.');
        return;
      }

      login(token);

      message.success('회원가입 성공');

      navigate(PATHS.PROJECTS_BOARD);
    },
    onError: (error) => {
      message.error('회원가입 실패: ' + (error as AxiosError).response?.data?.message ?? error.message);
    }
  });

  const onFinish = (values: SignUpFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <h1>회원가입</h1>
      <Form onFinish={onFinish}>
        <Form.Item
          name="loginId"
          rules={[{ required: true, message: '아이디를 입력하세요!' }]}
        >
          <Input placeholder="아이디" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
        >
          <Input.Password placeholder="비밀번호" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: '이름을 입력하세요!' }]}
        >
          <Input placeholder="이름" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isPending}>
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { SignUp };
