import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TrackingImage from '../../../assets/images/tracking.svg';
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
`;

const List = styled.ul`
    
`;

const ListItem = styled.li`
    color: #7E8594;
    padding: 16px 30px;
    border-left: 1px solid #D1D5DB;
    position: relative;
    cursor: pointer;
    &:before {
        content: '';
        border: ${props => props.active ? '4px solid #4BBAFB' : '2px solid #D1D5DB'};
        border-radius: 100%;
        position: absolute;
        width: 13px;
        height: 13px;
        left: -9px;
        background-color: #ffffff;
        box-shadow: ${props => props.active ? '0px 0px 10px rgba(75, 186, 251, 0.768002)' : 'none'};
        transition: all 0.5s;
    }
`;

const Figure = styled.figure`
    display: flex;
`;

const Img = styled.img`
    max-width: 100%;
`;

const features = [
    {
        title: 'Automatic time tracking',
        image: TrackingImage
        
    },
    {
        title: 'Goals & Alerts',
        image: TrackingImage
    },
    {
        title: 'Structured sprint',
        image: TrackingImage
    },
    {
        title: 'Trends nd weekly reports',
        image: TrackingImage
    },
    {
        title: 'Offline time',
        image: TrackingImage
    }
]

const Work = () => {
    const [item, setItem] = useState(null); 
    useEffect(() => {
        setItem(features[0])
    }, []);
  return (
    <Main>
        <Heading>Understand how you work</Heading>
          <Description>See the ebbs and flows of your day with productivity charts</Description>
          {item &&
              <Container>
                  <List>
                      {features.map((feature, key) => {
                          return (
                              <ListItem
                                  key={key}
                                  onClick={() => setItem(feature)}
                                  active={feature.title === item.title}
                              >{feature.title}</ListItem>
                          );
                      })}
                  </List>
                  <Figure>
                      <Img src={item.image} alt={item.title} />
                  </Figure>
              </Container>
          }
    </Main>
  );
}


export default Work;