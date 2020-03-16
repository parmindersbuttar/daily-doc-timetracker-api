import React from 'react';
import styled from 'styled-components'
import PlansImage from '../../../assets/images/plans.svg';
import TeamProductivityImage from '../../../assets/images/team-productivity.svg';
import DiscoverImage from '../../../assets/images/discover.svg';
import BoostPerformanceImage from '../../../assets/images/boost-performance.svg';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


const Heading = styled.h2`
    font-weight: bold;
    font-size: 43px;
    line-height: 52px;
    letter-spacing: 2.38889px;
    color: #212E4A;
`;

const CardContainer = styled.div`
  display: flex;
`;

const Box = styled.div`
   display: flex;
   flex-direction: column;
   margin: 0 10px;
`;

const Card = styled.div`
    border: 1.5429px solid rgba(143, 148, 156, 0.25142);
    box-sizing: border-box;
    border-radius: 16.287px;
    background: #FFFFFF;
    padding: 20px;
    min-height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardImage = styled.img`
  max-width: 100%;
`;

const CardHeading = styled.p`
    font-weight: bold;
    font-size: 19.5725px;
    line-height: 25px;
    text-align: center;
    letter-spacing: 1.08736px;
    color: #7E8594;
    margin-top: 10px;
`;

const items = [
    {
        title: "All-premium features",
        image: PlansImage
    },
    {
        title: "Team Productivity Updates",
        image: TeamProductivityImage
    },
    {
        title: "Discover Inefficiencies",
        image: DiscoverImage
    },
    {
        title: "Boost Performance",
        image: BoostPerformanceImage
    }
];


const ForOrganization = () => {
  return (
    <Main>
        <Heading>
            For organizations
        </Heading>
        <CardContainer>
            {items && items.map((item, key) => { 
                return (<Box key={key}>
                    <Card>
                        <CardImage src={item.image} alt={item.title} />
                    </Card>
                    <CardHeading>{item.title}</CardHeading>
                </Box>);
            })}
        </CardContainer>
    </Main>
  );
}


export default ForOrganization;