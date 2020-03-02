import React, { useEffect } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import useLogin from '../../state/auth/hooks/useLogin';
import Container from './containers/container';
import FormContainer from './containers/FormContainer';
import RecoverForm from './containers/RecoverForm';
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

const ResetPassword = (props) => {
  const { from } = props.location.state || {from: {pathname: "/"}};
  const { token } = props.match.params;
  const { auth, resetPassword, isLoading, emailSent } = useLogin();
  useEffect(() => {
    if (auth.logged) {
      props.history.push(from);
    }
  }, [auth]);

  const handleSubmit = (password) => {
    resetPassword({ password, reset_token: token });
  }
  
  return (
    <Container>
      <Spinner show={isLoading} />
      <FormContainer>
        {emailSent ? 
          <>
            <Description>Password reset successfully</Description>
            <Link to="/sign-in" style={{
              display: 'inline-block',
              margin: '10px 0',
              textDecoration: 'underline'
            }}>Back to Login</Link>
          </> : 
          <>
            <Title>Reset your password</Title>
            <RecoverForm onSubmit={handleSubmit} error={auth.error}/>
          </>
        }
      </FormContainer>
    </Container>
  )
};

export default ResetPassword;
