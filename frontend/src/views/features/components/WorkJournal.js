import React from 'react';
import styled from 'styled-components'
import WorkJournalImage from '../../../assets/images/work-journal.svg';


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
  padding: 0 20px;
  flex-direction: column;
  justify-content: center;
`;

const BannerImageContainer = styled.img`
  max-width: 100%;
`;

const WorkJournal = () => {
  return (
    <Main>
      <LeftSection>
        <BannerImageContainer src={WorkJournalImage} alt="banner image" />
      </LeftSection>
      <RightSection>
        <Heading>
          Work Journal 
        </Heading>
        <Description>
          Instead of tediously recording your every action or forgetting what happened in a workday, DailyDoc catalogues your workday. With unlimited historical data access, you can see what you were working on yesterday or last year.
        </Description>
      </RightSection>
    </Main>
  );
}


export default WorkJournal;