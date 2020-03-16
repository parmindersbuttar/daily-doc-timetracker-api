import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import styled from 'styled-components';
import useOrganization from '../../state/organization/hooks/useOrganization';
import BannerBackground from '../../assets/images/bannerBackground.svg';
import Spinner from '../../components/spinner';
import Button from '../../components/button';
import FormContainer from './containers/FormContainer';
import history from '../../utils/history';

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
  const { organization, getusers, deleteUserService, isLoading } = useOrganization();

  useEffect(() => {
    getusers();
  }, []);

  const gotoAdduser = () => {
    history.push('organization/add-user');
  }

  const gotoUpdate = (userId) => {
    history.push(`organization/users/${userId}`);
  }

  const deleteUser = (user) => {
   swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this user!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      confirmDelete(user);
    } else {
      swal("Your user is safe!");
    }
  });
  }
  const confirmDelete = (user) => {
    deleteUserService(user.id);
   }

  return (
    <Main>
      <Spinner show={isLoading} />
      <BannerBackgroundContainer src={BannerBackground} alt="banner background" />
      <Title>Manage your organization users</Title>
      <Container>
        <FormContainer>
        <StyledButton onClick={gotoAdduser}>Add user</StyledButton>
          <SubTitle>Users</SubTitle>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {organization && organization.users && organization.users.map((user, key) => {
                return <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td> 
                    <StyledButton onClick={() => gotoUpdate(user.id)}>Update</StyledButton>
                    <StyledButton onClick={() => deleteUser(user)} danger>Delete</StyledButton>
                  </td>
                </tr>
              })}
            </tbody>
          </Table>
         
        </FormContainer>
      </Container>
    </Main>
    
  )
};

export default Account;
