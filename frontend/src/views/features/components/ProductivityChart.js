import React from 'react';
import styled from 'styled-components'
import ProductivityChartImage from '../../../assets/images/productivity-chart.svg';


const Main = styled.div`
  display: flex;
  margin-top: 100px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 469px
`;

const Heading = styled.h2`
    font-weight: bold;
    font-size: 43px;
    line-height: 52px;
    letter-spacing: 2.38889px;
    color: #212E4A;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 19.228px;
  line-height: 36px;
  letter-spacing: 0.38456px;
  color: #7E8594;
`;

const RightSection = styled.div`
  display: flex;
  padding: 0 20px;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const BannerImageContainer = styled.img`
  max-width: 100%;
`;

const ProductivityChart = () => {
  return (
    <Main>
      <LeftSection>
        <BannerImageContainer src={ProductivityChartImage} alt="banner image" />
      </LeftSection>
      <RightSection>
        <Heading>
          Productivity Charts
        </Heading>
        <Description>
          Daily productivity charts enable individuals to see the ebbs and flows of their productivity, so you can understand when you are most productive.
        </Description>
      </RightSection>
    </Main>
  );
}


export default ProductivityChart;