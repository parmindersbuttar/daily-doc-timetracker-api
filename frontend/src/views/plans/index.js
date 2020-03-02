import React, { useEffect } from 'react'
import styled from 'styled-components'
import usePlans from '../../state/plans/hooks/usePlan'
import BannerBackground from '../../assets/images/bannerBackground.svg'
import CheckImage from '../../assets/images/check.svg'

import history from '../../utils/history'
import Spinner from '../../components/spinner'
import Button from '../../components/button'

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

const Description = styled.h4`
  font-weight: bold;
  font-size: 23.228px;
  line-height: 36px;
  letter-spacing: 0.46456px;
  color: #212e4a;
  text-align: center;
`

const BannerBackgroundContainer = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 100%;
`

const PlanContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: relative;
  z-index: 10;
  margin: 30px 0;
`

const PlanBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 17px 53px rgba(177, 183, 189, 0.43);
  border-radius: 9.50999px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
`

const PlanTitle = styled.h2`
  font-size: 20.228px;
  line-height: 36px;
  letter-spacing: 0.40456px;
  color: #212e4a;
`
const PlanPer = styled.h2`
  font-size: 18.228px;
  line-height: 36px;
  letter-spacing: 0.40456px;
  color: #212e4a;
  font-weight: bold
`

const PlanPrice = styled.h3`
  font-size: 55.4655px;
  line-height: 68px;
  letter-spacing: 3.08142px;
  color: #212e4a;
`

const PlanTerm = styled.p`
  font-weight: bold;
  font-size: 23.228px;
  line-height: 36px;
  letter-spacing: 0.46456px;
  color: #4bbafb;
`

const PlanFeature = styled.ul`
  margin: 20px 0;
  padding-left: 30px;
  list-style-image: url(${CheckImage});
`

const Feature = styled.li`
  font-weight: 500;
  font-size: 17.228px;
  line-height: 36px;
  letter-spacing: 0.34456px;
  color: #7e8594;
`

const Plans = () => {
  const { plans, isLoading } = usePlans()

  const gotoRegistration = planId => {
    history.push({
      pathname: '/registration',
      state: { planId }
    })
  }
  return (
    <Container>
      <Spinner show={isLoading} />
      <BannerBackgroundContainer
        src={BannerBackground}
        alt='banner background'
      />
      <Title>Plans</Title>
      <Description>
        Flexible plans to meet your time management needs.
      </Description>
      <PlanContainer>
        {plans.data &&
          plans.data.map(plan => {
            return (
              <PlanBox key={plan.id}>
                <PlanTitle>{plan.name}</PlanTitle>
                <PlanPrice>{`${plan.currency}${plan.price}`}</PlanPrice>
                <PlanPer>
                  {plan.name === 'Personal' ? 'PER MONTH' : 'PER USER'}
                </PlanPer>
                <PlanTerm>Monthly</PlanTerm>
                <PlanFeature>
                  {plan.feature &&
                    plan.feature
                      .trim()
                      .split(',')
                      .map((f, key) => {
                        return <Feature key={key}>{f}</Feature>
                      })}
                </PlanFeature>
                <Button large onClick={() => gotoRegistration(plan.id)}>
                  Get Premium
                </Button>
              </PlanBox>
            )
          })}
      </PlanContainer>
    </Container>
  )
}

export default Plans
