import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import User from '../../../assets/images/userimage.svg'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const CardImage = styled.img`
  width: 100px;
  border-radius: 100px;
  background-color: #000000;
`

const ImageDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18.228px;
  line-height: 27px;
  letter-spacing: 0.30456px;
  color: #000000;
  margin-top: 20px;
  margin-left: 20px;
`

const Name = styled.p`
  font-size: 12.228px;
  line-height: 27px;
  letter-spacing: 0.30456px;
  color: #7e8594;
  margin-top: 10px;
  align-self: flex-start;
`

const Description = styled.p`
  font-size: 10.228px;
  line-height: 27px;
  letter-spacing: 0.30456px;
  color: #a9b0bf;
  margin-top: 10px;
`

const Card = styled.div`
  border: 1.5429px solid rgba(143, 148, 156, 0.25142);
  box-sizing: border-box;
  border-radius: 16.287px;
  background: #ffffff;
  padding: 20px;
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70%;
`

const CorousalItem = props => {
  return (
    <Card>
      <Main>
        <ImageDiv>
          <CardImage src={props.item.image} alt={'user'} />
          <Title>{props.item.title}</Title>
        </ImageDiv>

        <Name>
          {props.item.name}, {props.item.occupation}
        </Name>
        <Description>{props.item.description}</Description>
      </Main>
    </Card>
  )
}

export default CorousalItem
