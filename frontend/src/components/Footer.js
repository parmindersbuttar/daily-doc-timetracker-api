import React from 'react'
import styled from 'styled-components';
import Linkedin from '../assets/images/linkedin.png';
import Twitter from '../assets/images/twitter-black-shape.png';
import Instagram from '../assets/images/instagram.png';
import Facebook from '../assets/images/facebook.png';
import OutlinedButton from './OutlinedButton'; 

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ContainerBlue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(198.53deg, #4B98FB 0%, #43BAFD 100%);
  border-radius: 5.28px;
  position: relative;
  width: 100%;
`;

const Heading = styled.h2`
    font-weight: bold;
    font-size: 43.82px;
    line-height: 53px;
    text-align: center;
    letter-spacing: 2.43444px;
    color: #FFFFFF;
    margin-top: 100px;
    margin-bottom: 50px;
`;

const StyledButton = styled(OutlinedButton)`
    margin-bottom: 100px
`;

const SocialMedia = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const FollowTitle = styled.h3`
    font-weight: bold;
    font-size: 20.82px;
    line-height: 25px;
    letter-spacing: 1.15667px;
    color: #212E4A;
`;

const SocialIcon = styled.img`
    margin: 0 10px;
`;

const Copyright = styled.div`
    width: 100%;
    margin: 20px 0;
    border-top: 0.5px solid #A5A8AB; 
    display: flex;
    justify-content: center;
`;

const CopyText = styled.p`
    background-color: #FFFFFF;
    margin-top: -7px;
`;

const Footer = (props) => {

    return (
        <Container>
            <ContainerBlue>
                <Heading>Ready to take back control of your time?</Heading>
                <StyledButton>Get Started</StyledButton>
            </ContainerBlue>
            <SocialMedia>
                <FollowTitle>
                    Follow Us
                </FollowTitle>
                <SocialIcon src={Linkedin} alt="linkedin" />
                <SocialIcon src={Twitter} alt="linkedin" />
                <SocialIcon src={Instagram} alt="linkedin" />
                <SocialIcon src={Facebook} alt="linkedin" />
            </SocialMedia>
            <Copyright>
                <CopyText>Copyright@2020</CopyText>
            </Copyright>
        </Container>
  )
}


export default Footer