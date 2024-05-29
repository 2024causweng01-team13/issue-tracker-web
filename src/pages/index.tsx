import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './login';
import { SignUp } from './sign-up';

const Home = () => {
  return (
    <div>
      <h1>홈 페이지</h1>
      {/* 추가적인 홈 페이지 내용을 여기에 추가 */}
    </div>
  );
};

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default Index;
export { Home };
