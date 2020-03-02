import React, { useState } from 'react';
import styled from 'styled-components';
import LucasImage from '../../../assets/images/lucas.png';
import BenImage from '../../../assets/images/ben.png';
import ErinImage from '../../../assets/images/erin.png';

const CarousalContainer = styled.div`
  padding: 0 40px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
`;

const Slide = styled.div`
  background-color: #FFFFFF;
  box-shadow: 0px 4px 46px rgba(140, 156, 171, 0.3);
  height: 462px;
  flex: 1;
  padding: 20px;
  transition: all .3s;
  opacity: ${props => props.active ? 1 : 0.5}
  transform: ${props => props.active ? 'translateZ(0)' : 'perspective(500px) translateZ(-100px)'};
`;

const Slides = styled.div`
  padding: 0 40px;
  margin: 30px 0;
  display: flex;
  flex: 1;
`;
const DotGroup = styled.div`
  display: flex;
  justify-content: center
`;

const Dot = styled.div`
  background: ${props => props.active ? '#4BBAFB' : '#D7DFF0'};
  mix-blend-mode: normal;
  opacity: 0.84;
  height: 10px;
  width: 10px;
  border-radius: 100%;
  margin: 0 10px;
  cursor: pointer
`;

const ImageContainer = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 100%
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 33.228px;
  line-height: 41px;
  letter-spacing: 0.66456px;
  color: #303F61;
  padding-left: 20px;
`;

const Occupation = styled.p`
  font-size: 18.4645px;
  line-height: 33px;
  letter-spacing: 0.36929px;
  color: #7E8594;
`;

const BodyText = styled.p`
  font-size: 16px;
  line-height: 33px;
  letter-spacing: 0.36929px;
  color: #7E8594;
`;

const testimonials = [
  {
    name: 'Erin',
    occupation: 'Student',
    image: ErinImage,
    company: 'University of Chicago',
    body: 'With technology\'s omnipresence in my life, I often found hours to slip away. However, now I am in more control; DailyDoc allows me to see how I spent my time and where I lose my flow.'
  },
  {
    name: 'Lucas',
    occupation: 'Lawyer',
    image: LucasImage,
    company: 'Knowledge Worker',
    body: 'DailyDoc has been instrumental in being able to track my hours and bill clients with more precision. Being able to see where my productivity dips (11 AM after donuts) allowed me to strategize and better structure my day.'
  },
  {
    name: 'Ben',
    occupation: 'Developer',
    image: BenImage,
    company: 'Knowledge Worker',
    body: 'Spending my days in front of screen causes all the hours to kind of mesh together. With DailyDoc, I can easily look back to see what I was doing at what time. The sprints are killer but effective. Nice job guys!'
  },
]

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(1);
  
  return (
    <CarousalContainer>
      <Slides>
        {testimonials.map((testimonial, key) => {
          return (
            <Slide active={activeItemIndex === key} key={key}>
              <ImageContainer>
                <Img src={testimonial.image} alt={testimonial.name} />
                <Title>{testimonial.company}</Title>
              </ImageContainer>
              <Occupation>{`${testimonial.name}, ${testimonial.occupation}`}</Occupation>
              <BodyText>{testimonial.body}</BodyText>
            </Slide>
          );
        })}
      </Slides>
      <DotGroup>
        {testimonials.map((testimonial, key) => {
          return (
            <Dot key={key} active={activeItemIndex === key} onClick={() => setActiveItemIndex(key)}/>
          );
        })}
      </DotGroup>
      
    </CarousalContainer>
  );
};