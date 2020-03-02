import React, { useEffect } from 'react';
import styled from 'styled-components'

import useLogin from '../../state/auth/hooks/useLogin';
import Container from './containers/container';
import FormContainer from './containers/FormContainer';
import Form from './containers/form';
import Spinner from '../../components/spinner';

const Logo = styled.h2`
  font-weight: bold;
  font-size: 37.506px;
  line-height: 46px;
  color: #000000;
  text-align: center;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 30.5856px;
  line-height: 37px;
  color: #000000;
`;

const Login = (props) => {
  const { from } = props.location.state || {from: {pathname: "/"}};
  const { auth, loginUser, isLoading } = useLogin();
  useEffect(() => {
    if (auth.logged) {
      props.history.push(from);
    }
  }, [auth]);
  
  return (
    <Container>
      <Spinner show={isLoading} />
      <FormContainer>
        <Logo>Daily Doc</Logo>
        <Title>Log In</Title>
        <Form onSubmit={loginUser} error={auth.error}/>
      </FormContainer>
    </Container>
  )
};

export default Login
