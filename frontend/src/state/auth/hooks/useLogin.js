import { useState } from 'react';
import { 
  loginApi, 
  registerApi, 
  recoverPasswordApi, 
  validateApi,
  resetPasswordApi,
  updateApi,
  toggleSubscriptionApi
} from '../queries';
import { useStateValue } from '../../index';
import history from '../../../utils/history';
import {
  loginSuccess,
  loginFailed,
  recoverPasswordFailed,
  recoverPasswordSuccess,
  resetPasswordFailed,
  resetPasswordSuccess
} from '../actions'

const useProducts = () => {
  const [{auth}, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, sentEmailSent] = useState(false);
  
  const loginUser = async (credentials) => {
    try {
      setIsLoading(true);
      const resp = await loginApi(credentials);
      setIsLoading(false);
      if (resp.msg || resp.error) {
        dispatch(loginFailed(resp.msg || resp.error));
      } else {
        localStorage.setItem('token', resp.token);
        dispatch(loginSuccess(resp.user));
        history.push('/');
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
      console.log('loginUser: ', err)
    }
  }

  const recoverPassword = async (credentials) => {
    try {
      setIsLoading(true);
      const resp = await recoverPasswordApi(credentials);
      setIsLoading(false);
      if (resp.success) {
        sentEmailSent(true);
        dispatch(recoverPasswordSuccess());
      } else {
        dispatch(recoverPasswordFailed(resp.msg || resp.error));
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
      console.log('recoverPassword: ', err)
    }
  }

  const resetPassword = async (credentials) => {
    try {
      setIsLoading(true);
      const resp = await resetPasswordApi(credentials);
      setIsLoading(false);
      if (resp.success) {
        sentEmailSent(true);
        dispatch(resetPasswordSuccess());
      } else {
        dispatch(resetPasswordFailed(resp.msg || resp.error));
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
      console.log('resetPassword: ', err)
    }
  }

  const registerUser = async (credentials, card) => {
    try {
      setIsLoading(true);
      const resp = await registerApi({...credentials, card});
      setIsLoading(false);
      if (resp.msg || resp.error) {
        dispatch(loginFailed(resp.msg || resp.error));
      } else {
        localStorage.setItem('token', resp.token);
        dispatch(loginSuccess(resp.user));
        history.push('/');
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
      console.log('registerUser: ', err)
    }
  }

  const validateUser = async (token) => {
    try {
      setIsLoading(true);
      const resp = await validateApi(token);
      setIsLoading(false);
      if (resp.isvalid) {
        dispatch(loginSuccess(resp.user));
      } else {
        localStorage.clear();
        history.push('/sign-in');
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
      console.log('loginUser: ', err)
    }
  
  }

  const updateUser = async (credentials) => {
    if(!credentials.password.trim()) {
      delete credentials.password;
    }

    try {
      setIsLoading(true);
      const resp = await updateApi({...credentials});
      setIsLoading(false);
      if (resp.success) {
        dispatch(loginSuccess(resp.user));
      } else if(resp) {
        dispatch(loginFailed(resp.msg || resp.error));       
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
      console.log('updateUser: ', err)
    }
  }

  const toggleSubscription = async (value) => {
   
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const resp = await toggleSubscriptionApi(value,token);
      setIsLoading(false);
      if (resp.success) {
        validateUser(token);
      } else if(resp) {
        dispatch(loginFailed(resp.msg || resp.error));       
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
      console.log('toggleSubscription: ', err)
    }
  }

  return { auth, loginUser, validateUser, toggleSubscription, recoverPassword, resetPassword, registerUser, updateUser, isLoading, emailSent };
}

export default useProducts
