import React, { useEffect } from 'react';
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
import Organization from '../views/organization';
import AddUser from '../views/organization/AddUser';
import UpdateUser from '../views/organization/UpdateUser';
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
              <PrivateRoute exact path='/account' component={Account} />
              <PrivateRoute exact path='/organization' component={Organization} />
              <PrivateRoute exact path='/organization/add-user' component={AddUser} />
              <PrivateRoute exact path='/organization/users/:userId' component={UpdateUser} />
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
