import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: LoginFormValues) => axios.post('http://15.165.202.64/api/v1/login', data), // API URL을 실제 주소로 변경하세요.
    onSuccess: (data) => {
      message.success('로그인 성공');
      // 대시보드나 홈 화면으로 리디렉션
      // history.push('/dashboard');
    },
    onError: (error) => {
      message.error('로그인 실패: ' + error.message);
    }
  });

  const onFinish = (values: LoginFormValues) => {
    setLoading(true);
    mutation.mutate(values);
  };

  return (
    <div>
      <h1>로그인</h1>
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: '이메일을 입력하세요!' }]}
        >
          <Input placeholder="이메일" />
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
              <Button type="primary" htmlType="submit" loading={loading} block>
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
