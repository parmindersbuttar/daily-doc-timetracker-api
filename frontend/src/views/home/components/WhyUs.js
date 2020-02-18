import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Heading from '../../../components/Heading';
import Description from '../../../components/Description';

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
    width: 50%;
    background: #FFFFFF;
    box-shadow: 0px 6px 49px rgba(177, 183, 189, 0.624317);
    border-radius: 10px;
    padding: 20px 40px;
    margin-top: 40px;
`;

const List = styled.ul`
    list-style: disc;
`;

const ListItem = styled.li`
    color: #7E8594;
    padding: 16px 0;
    line-height: 24px;
`;

const SubHeading = styled.h3`
    font-weight: bold;
    font-size: 23.228px;
    line-height: 36px;
    letter-spacing: 0.46456px;
    color: #212E4A;
`;



const understand = [
    'Where you’re spending your time',
    'What apps and websites are most distracting',
    'How much time you spend in meetings, answering emails, and on social media',
    'When you’re most (and least) productive each day',
    'The ebbs and flows of your day so you can do more meaningful work'
]

const WhyUs = () => {
  
  return (
    <Main>
        <Heading>Why choose Us?</Heading>
        <Description>A research-backed solution out of the University of Chicago, DailyDoc provides innovative ways to be more productive</Description>
          <Container>
              <div>
                  <SubHeading>Understand</SubHeading>
              <List>
                {understand.map((item, key) => {
                    return (
                        <ListItem
                            key={key}
                        >{item}</ListItem>
                    );
                })}
            </List>
              </div>
              <div>
              <SubHeading>Optimize your</SubHeading>
            <List>
                {understand.map((item, key) => {
                    return (
                        <ListItem
                            key={key}
                        >{item}</ListItem>
                    );
                })}
                  </List>
                  </div>
        </Container>
    </Main>
  );
}


export default WhyUs;