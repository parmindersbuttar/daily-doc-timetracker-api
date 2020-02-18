import React from 'react';
import Banner from './components/Banner';
import Work from './components/Work';
import AdditionalBenefits from './components/AdditionalBenefits';
import WhyUs from './components/WhyUs';
import FindOut from './components/FindOut';

const Home = () => {
  return (
   <div>
      <Banner /> 
      <Work />
      <AdditionalBenefits />
      <WhyUs />
      <FindOut/>
   </div>
  )
};

export default Home;
