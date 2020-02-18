import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChartImage from '../../../assets/images/chart.png';
import WorkImage from '../../../assets/images/work.png';
import CodingImage from '../../../assets/images/coding.png';
import ProgressImage from '../../../assets/images/progress.png';
import DataImage from '../../../assets/images/data.png';
import TeamImage from '../../../assets/images/team.png';
import Heading from '../../../components/Heading';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 70%;
    margin-top: 30px;
`;

const Figure = styled.figure`
    display: flex;
    justify-content: center
`;

const Img = styled.img`
    max-width: 100%;
`;

const Paper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(210, 214, 219, 0.459353);
    border-radius: 30px;
    padding: 30px 20px;
    width: 30.33%;
    margin: 1%;
    min-height: 332px;
`;

const Title = styled.p`
    font-weight: 600;
    font-size: 15.228px;
    line-height: 27px;
    letter-spacing: 0.30456px;
    color: #A9B0BF;
    margin-top: 20px;
`;

const items = [
    {
        title: 'Get rid of "Lite users can only see three months"',
        image: ChartImage
        
    },
    {
        title: 'Structured sprints to push you past distraction and procrastination',
        image: WorkImage
    },
    {
        title: 'Leave the data entry to us: daily work journal and productivity charts',
        image: CodingImage
    },
    {
        title: 'Total control over what apps and sites get tracked and when',
        image: ProgressImage
    },
    {
        title: 'Works across MacOS, Windows, Linux, iOS, Android, and ChromeOS',
        image: DataImage
    },
    {
        title: 'Team-level insights to make your company more productive',
        image: TeamImage
    }
]

const AdditionalBenefits = () => {
  return (
    <Main>
        <Heading>Additional Benefits </Heading>
          <Container>
              {items.map((item, key) => {
                  return (
                      <Paper>
                          <Figure>
                              <Img src={item.image} alt={item.title}/>
                          </Figure>
                          <Title>{item.title}</Title>
                      </Paper>
                  )
              })}
        </Container>
    </Main>
  );
}


export default AdditionalBenefits;