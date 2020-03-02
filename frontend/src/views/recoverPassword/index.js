import React, { useEffect } from 'react';
import styled from 'styled-components'

import useLogin from '../../state/auth/hooks/useLogin';
import Container from './containers/container';
import FormContainer from './containers/FormContainer';
import Form from './containers/form';
import Spinner from '../../components/spinner';

const Description = styled.p`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #7E8594;
  text-align: center;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 30.5856px;
  line-height: 37px;
  color: #000000;
`;

const RecoverPassword = (props) => {
  const { from } = props.location.state || {from: {pathname: "/"}};
  const { auth, recoverPassword, isLoading, emailSent } = useLogin();
  useEffect(() => {
    if (auth.logged) {
      props.history.push(from);
    }
  }, [auth]);
  
  return (
    <Container>
      <Spinner show={isLoading} />
      <FormContainer>
        { emailSent ? <Description>Please check your email to reset the password</Description> :
          <>
            <Title>Forgot your password?</Title>
            <Description>Enter the email address associated to your account</Description>
            <Form onSubmit={recoverPassword} error={auth.error}/>
          </>
        }
      </FormContainer>
    </Container>
  )
};

export default RecoverPassword;
