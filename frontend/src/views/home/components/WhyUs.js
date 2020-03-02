import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Heading from '../../../components/Heading'
import Description from '../../../components/Description'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  padding: 20px;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  background: #ffffff;
  box-shadow: 0px 6px 49px rgba(177, 183, 189, 0.624317);
  border-radius: 10px;
  padding: 20px 30px;
  margin-top: 40px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`

const List = styled.ul`
    list-style: disc;
    padding: 0 20px;
`;

const ListItem = styled.li`
  color: #7e8594;
  padding: 16px 0;
  line-height: 24px;
`

const SubHeading = styled.h3`
  font-weight: bold;
  font-size: 23.228px;
  line-height: 36px;
  letter-spacing: 0.46456px;
  color: #212e4a;
`

const understand = [
  'Where you’re spending your time',
  'What apps and websites are most distracting',
  'How much time you spend in meetings, answering emails, and on social media',
  'When you’re most (and least) productive each day',
  'The ebbs and flows of your day so you can do more meaningful work'
]

const optimise = [
  'Daily schedule for deep work and productivity',
  'Focus to get more done in less time and fight burnout',
  'Structured Sprints to follow your natural high and lows of energy',
  'Digital habits to stop multitasking and hit your long-term goals',
  'Feedback loop to see progress, boost motivation, and make real changes to how you work'
]

const WhyUs = () => {
  return (
    <Main>
      <Heading>Why choose Us?</Heading>
      <Description>
        A research-backed solution out of the University of Chicago, DailyDoc
        provides innovative ways to be more productive
      </Description>
      <Container>
        <div style={{ padding: '4px' }}>
          <SubHeading>Understand</SubHeading>
          <List>
            {understand.map((item, key) => {
              return <ListItem key={key}>{item}</ListItem>
            })}
          </List>
        </div>
        <div style={{ padding: '4px', paddingLeft: '16px' }}>
          <SubHeading>Optimize your</SubHeading>
          <List>
            {optimise.map((item, key) => {
              return <ListItem key={key}>{item}</ListItem>
            })}
          </List>
        </div>
      </Container>
    </Main>
  )
}

export default WhyUs
