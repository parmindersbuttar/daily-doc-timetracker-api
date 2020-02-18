import React from 'react';
import styled from 'styled-components'
import BannerBackground from '../../../assets/images/bannerBackground.svg';
import BannerImage from '../../../assets/images/bannerImage.svg';
import Button from '../../../components/button'


const Main = styled.div`
  display: flex;
  padding: 20px 50px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 469px
`;

const Heading = styled.h2`
  font-weight: bold;
  font-size: 61.4655px;
  line-height: 75px;
  letter-spacing: 3.41475px;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 19.228px;
  line-height: 36px;
  letter-spacing: 0.38456px;
  color: #7E8594;
`;

const ButtonContainer = styled.div`
  margin-top: 30px
`;

const RightSection = styled.div`
  display: flex;
  flex: 1;
  @media (max-width: 768px) {
    position: relative;
  }
`;

const BannerBackgroundContainer = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 100%;
`;

const BannerImageContainer = styled.img`
  max-width: 100%;
`;

const Banner = () => {
  return (
    <Main>
      <LeftSection>
        <Heading>
          Effortless Productivy
        </Heading>
        <Description>
          DailyDoc helps you understand how you spend your time at work..
        </Description>
        <ButtonContainer>
          <Button>Get Started</Button>
        </ButtonContainer>
      </LeftSection>
      <RightSection>
        <BannerBackgroundContainer src={BannerBackground} alt="banner background" />
        <BannerImageContainer src={BannerImage} alt="banner image" />
      </RightSection>
    </Main>
  );
}


export default Banner;