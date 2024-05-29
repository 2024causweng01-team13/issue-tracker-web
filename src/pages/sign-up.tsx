import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface SignUpFormValues {
  email: string;
  password: string;
  name: string;
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: SignUpFormValues) => axios.post('http://15.165.202.64/api/v1/signup', data), // API URL을 실제 주소로 변경하세요.
    onSuccess: (data) => {
      message.success('회원가입 성공');
      // 로그인 페이지로 리디렉션
      // history.push('/login');
    },
    onError: (error) => {
      message.error('회원가입 실패: ' + error.message);
    }
  });

  const onFinish = (values: SignUpFormValues) => {
    setLoading(true);
    mutation.mutate(values);
  };

  return (
    <div>
      <h1>회원가입</h1>
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
        <Form.Item
          name="name"
          rules={[{ required: true, message: '이름을 입력하세요!' }]}
        >
          <Input placeholder="이름" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { SignUp };
