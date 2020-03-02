import React from 'react';
import styled from 'styled-components';
import Heading from '../../../components/Heading';
import Description from '../../../components/Description';
import Button from '../../../components/button';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
    max-width: 70%;
    margin: 100px auto 20px auto;
`;


const FindOut = () => {
  return (
    <Main>
        <Heading>Find out how DailyDoc for Orgs can give your team back hours a week</Heading>
        <Description>By increasing productivity, DailyDoc inspires a more effective and efficient workplace environment</Description>
        <Button>Learn More</Button>
      </Main>
  );
}


export default FindOut;