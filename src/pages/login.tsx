import React from 'react';
import Layout from '../layout';
import LoginForm from '../components/LoginForm';
import './indexPage.scss';

const page: React.FunctionComponent = () => (
  <Layout>
    <h1>Login</h1>
    <LoginForm />
  </Layout>
);

export default page;
