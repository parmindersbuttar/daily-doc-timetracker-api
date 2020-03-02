import React from 'react';
import styled from 'styled-components'
import StructuredSprint from './components/StructuredSprint';
import WorkJournal from './components/WorkJournal';
import WeeklyProgress from './components/WeeklyProgress';
import ProductivityChart from './components/ProductivityChart';
import ForOrganization from './components/ForOrganization';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 50px;
  line-height: 61px;
  letter-spacing: 2.77778px;
  color: #212E4A;
  text-align: center;
`;


const Features = () => {
  return (
   <Container>
      <Title>Features</Title>
      <StructuredSprint />
      <WorkJournal />
      <WeeklyProgress />
      <ProductivityChart />
      <ForOrganization />
   </Container>
  )
};

export default Features;
