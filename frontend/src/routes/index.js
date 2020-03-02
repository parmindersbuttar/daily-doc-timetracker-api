import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import BaseStyles from './base-styles'
import history from '../utils/history'
import PrivateRoute from './private-route'
import Content from '../components/content'
import Header from '../components/header'
import Footer from '../components/Footer'
import Login from '../views/login'
import Registration from '../views/registration'
import RecoverPassword from '../views/recoverPassword'
import ResetPassword from '../views/recoverPassword/ResetPassword'
import Home from '../views/home'
import Plans from '../views/plans'
import Account from '../views/account'
import NotFound from '../views/notFound'
import Features from '../views/features'
import Downloads from '../views/downloads'
import useLogin from '../state/auth/hooks/useLogin'
import Spinner from '../components/spinner'

const Root = props => {
  const { validateUser, isLoading } = useLogin()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      validateUser(token)
    }
  }, [])

  return (
    <>
      <BaseStyles />
      <Spinner show={isLoading} />
      <Router history={history}>
        <>
          <Header />
          <Content>
            <Switch>
              <Route exact path='/sign-in' component={Login} />
              <Route exact path='/' component={Home} />
              <Route exact path='/features' component={Features} />
              <Route exact path='/downloads' component={Downloads} />
              <Route exact path='/plans' component={Plans} />
              <Route exact path='/registration' component={Registration} />
              <Route
                exact
                path='/recover-password'
                component={RecoverPassword}
              />
              <Route
                exact
                path='/reset-password/:token'
                component={ResetPassword}
              />
              <PrivateRoute path='/account' component={Account} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer />
        </>
      </Router>
    </>
  )
}

export default Root
