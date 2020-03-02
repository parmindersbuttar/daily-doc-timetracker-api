import React from 'react';
import styled from 'styled-components';
import useOrganization from '../../state/organization/hooks/useOrganization';
import BannerBackground from '../../assets/images/bannerBackground.svg';
import Spinner from '../../components/spinner';
import Button from '../../components/button';
import FormContainer from './containers/FormContainer';
import Form from './containers/form';

const Main = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column
`;

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  position: relative;
  z-index: 99;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 50px;
  line-height: 61px;
  letter-spacing: 2.77778px;
  color: #212E4A;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-weight: bold;
  font-size: 30px;
  line-height: 61px;
  letter-spacing: 2.77778px;
  color: #212E4A;
  text-align: center;
`;

const BannerBackgroundContainer = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const Table = styled.table`
  td, th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
`;

const Account = () => {
  const { organization, addUser, isLoading } = useOrganization();
  return (
    <Main>
      <Spinner show={isLoading} />
      <BannerBackgroundContainer src={BannerBackground} alt="banner background" />
      <Title>Add new user</Title>
      <Container>
        <FormContainer>
            <Form
              onSubmit={addUser}
              error={organization.error}
            />
        </FormContainer>
      </Container>
    </Main>
    
  )
};

export default Account;
