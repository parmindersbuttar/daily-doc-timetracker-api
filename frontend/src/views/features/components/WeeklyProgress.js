import React from 'react';
import styled from 'styled-components'
import WeeklyProgressImage from '../../../assets/images/weekly-progress.svg';


const Main = styled.div`
  display: flex;
  margin-top: 100px;
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
`;

const BannerImageContainer = styled.img`
  max-width: 100%;
`;

const WeeklyProgress = () => {
  return (
    <Main>
      <LeftSection>
        <Heading>
          Weekly Progress Updates
        </Heading>
        <Description>
          Identify trends in productivity with weekly product updates. Critical information that will enable you to strategize on how you and your organization can be more productive.
        </Description>
      </LeftSection>
      <RightSection>
        <BannerImageContainer src={WeeklyProgressImage} alt="banner image" />
      </RightSection>
    </Main>
  );
}


export default WeeklyProgress;