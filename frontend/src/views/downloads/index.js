import React from 'react'
import styled from 'styled-components'
import Download from './components/Download'

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-weight: bold;
  font-size: 50px;
  line-height: 61px;
  letter-spacing: 2.77778px;
  color: #212e4a;
  text-align: center;
`

const Downloads = () => {
  return (
    <Container>
      <Title>Downloads</Title>
      <Download />
    </Container>
  )
}

export default Downloads
