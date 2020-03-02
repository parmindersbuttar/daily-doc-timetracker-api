import React from 'react';
import styled from 'styled-components'
import Container from './containers/container';

const Title = styled.h2`
  font-size: 20em;
  margin: 100px 0;
`;

const NotFound = (props) => {  
  return (
    <Container>
      <Title>404</Title>
    </Container>
  )
};

export default NotFound;
