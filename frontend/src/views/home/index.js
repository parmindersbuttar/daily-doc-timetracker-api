import React from 'react'
import Banner from './components/Banner'
import Work from './components/Work'
import AdditionalBenefits from './components/AdditionalBenefits'
import WhyUs from './components/WhyUs'
import FindOut from './components/FindOut'
import Corousal from './components/Corousal'

const Home = () => {
  return (
    <div>
      <Banner />
      <Work />
      <AdditionalBenefits />
      <WhyUs />
      <FindOut />
      <Corousal />
    </div>
  )
}

export default Home
