import React from "react";
import styled from "styled-components";
import useLogin from "../../state/auth/hooks/useLogin";
import BannerBackground from "../../assets/images/bannerBackground.svg";
import Spinner from "../../components/spinner";
import Button from "../../components/button";
import FormContainer from "./containers/FormContainer";
import Form from "./containers/form";

const Main = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
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
  color: #212e4a;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-weight: bold;
  font-size: 30px;
  line-height: 61px;
  letter-spacing: 2.77778px;
  color: #212e4a;
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
  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
`;

const Account = () => {
  const { auth, updateUser, toggleSubscription, isLoading } = useLogin();
  console.log(auth.user);
  return (
    <Main>
      <Spinner show={isLoading} />
      <BannerBackgroundContainer
        src={BannerBackground}
        alt="banner background"
      />
      <Title>Manage your account</Title>
      <Container>
        <FormContainer>
          <SubTitle>Personal Detail</SubTitle>
          <Form onSubmit={updateUser} error={auth.error} user={auth.user} />
        </FormContainer>
        <FormContainer>
          <SubTitle>Your Cards</SubTitle>
          <Table>
            <thead>
              <tr>
                <th>Card Number</th>
                <th>Expiry</th>
                <th>Customer Name</th>
              </tr>
            </thead>
            <tbody>
              {auth.user && auth.user.PaymentMethods &&
                auth.user.PaymentMethods.map((card, key) => {
                  return (
                    <tr>
                      <td>{card.last4}</td>
                      <td>{`${card.exp_month}/${card.exp_year}`}</td>
                      <td>{auth.user.name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <StyledButton
            onClick={() => toggleSubscription(!auth.user.subscriptionActive)}
          >
            {auth.user && auth.user.subscriptionActive ? "Unsubscribe" : "subscribe"}
          </StyledButton>
        </FormContainer>
      </Container>
    </Main>
  );
};

export default Account;
