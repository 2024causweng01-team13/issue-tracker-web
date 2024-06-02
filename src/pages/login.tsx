import { CommonResponse, fetcher } from '@/apis';
import { PATHS } from '@/routes/routers';
import { useMutation } from '@tanstack/react-query';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

interface LoginFormValues {
  loginId: string;
  password: string;
}

type LoginResponse = CommonResponse<{
  token: string;
}>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATHS.PROJECTS_BOARD);
    }
  }, [isLoggedIn, navigate]);

  const mutation = useMutation({
    mutationFn: (data: LoginFormValues) => fetcher.post<LoginResponse>('/api/v1/auth/sign-in', data),
    onSuccess: (data) => {
      const token = data.data?.data?.token;
      if (!token) {
        message.error('토큰이 없습니다.');
        return;
      }

      login(token);

      message.success('로그인 성공');

      navigate(PATHS.PROJECTS_BOARD);
    },
    onError: (error) => {
      message.error('로그인 실패: ' + (error as AxiosError).response?.data?.message ?? error.message);
    }
  });

  const onFinish = (values: LoginFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <h1>로그인</h1>
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
        <Form.Item>
          <Row gutter={8}>
            <Col span={12}>
              <Button type="primary" htmlType="submit" loading={mutation.isPending} block>
                로그인
              </Button>
            </Col>
            <Col span={12}>
              <Button type="default" onClick={() => navigate('/sign-up')} block>
                회원가입
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export { Login };
