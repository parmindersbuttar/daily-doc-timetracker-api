import React from 'react'
import {  Router, Route, Switch } from 'react-router-dom'
import {StateProvider} from '../state';
import { INITIAL_STATE as AUTH_INITIAL_STATE } from '../state/auth/reducers'
import { INITIAL_STATE as PRODUCT_INITIAL_STATE } from '../state/product/reducers'
import reducers from "../state/reducers";
import BaseStyles from './base-styles';
import history from '../utils/history';
import Content from '../components/content';
import Header from '../components/header';
import Footer from '../components/Footer';
import Login from '../views/login';
import Home from '../views/home';
import Features from '../views/features';

const Root = props => {
    const initialState = {
      auth: AUTH_INITIAL_STATE,
      product: PRODUCT_INITIAL_STATE
    }
    return (
      <StateProvider initialState={initialState} reducer={reducers}>
        <BaseStyles />
        <Router history={history}>
          <>
            <Header />
            <Content>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                <Route exact path="/features" component={Features} />
              </Switch>
            </Content>
            <Footer/>
          </>
        </Router>
      </StateProvider>
    )
};

export default Root
