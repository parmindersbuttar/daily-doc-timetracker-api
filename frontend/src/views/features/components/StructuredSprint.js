import React from 'react';
import styled from 'styled-components'
import BannerBackground from '../../../assets/images/bannerBackground.svg';
import StructuredSprintImage from '../../../assets/images/structured-sprint.svg';


const Main = styled.div`
  display: flex;

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
    font-size: 43px;
    line-height: 52px;
    letter-spacing: 2.38889px;
    color: #212E4A;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 19.228px;
  line-height: 36px;
  letter-spacing: 0.38456px;
  color: #7E8594;
`;

const RightSection = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
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

const StructuredSprint = () => {
  return (
    <Main>
      <LeftSection>
        <Heading>
            Structured Sprints 
        </Heading>
        <Description>
            Overcome procrastination and distractions with Structured Sprints. Simply set a timer for how long you want to sprint; after the timer expires your computer will shut off. This allows you to neatly space out our workday with intense bouts of work.
        </Description>
      </LeftSection>
      <RightSection>
        <BannerBackgroundContainer src={BannerBackground} alt="banner background" />
        <BannerImageContainer src={StructuredSprintImage} alt="banner image" />
      </RightSection>
    </Main>
  );
}


export default StructuredSprint;