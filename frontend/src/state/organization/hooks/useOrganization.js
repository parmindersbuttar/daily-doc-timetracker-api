import { useState } from 'react';
import { 
 getUsersApi,
 addUserApi,
 deleteUserApi,
 updateUserApi,
 getUserApi
} from '../queries';
import { useStateValue } from '../../index';
import history from '../../../utils/history';
import {
  addUserSuccess,
  addUserFailed,
  getUsersSuccess,
  getUserSuccess
} from '../actions'

const useOrganization = () => {
  const [{organization}, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  
  const getusers = async () => {
    try {
      setIsLoading(true);
      const resp = await getUsersApi();
      setIsLoading(false);
      if (resp.msg || resp.error) {
        dispatch(addUserFailed(resp.msg || resp.error));
      } else {
        dispatch(getUsersSuccess(resp.users));
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(addUserFailed('Something went wrong. Please try after some time'));
      console.log('getusers: ', err)
    }
  }

  const addUser = async (credentials) => {
    try {
      setIsLoading(true);
      const resp = await addUserApi({...credentials});
      setIsLoading(false);
      dispatch(addUserSuccess());
      if (resp.msg || resp.error) {
        dispatch(addUserFailed(resp.msg || resp.error));
      } else {
        history.push('/organization')
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(addUserFailed('Something went wrong. Please try after some time'));
      console.log('addUser: ', err)
    }
  }

  const deleteUserService = async (userId) => {
    try {
      setIsLoading(true);
      const resp = await deleteUserApi(userId);
      setIsLoading(false);
      if (resp.msg || resp.error) {
        dispatch(addUserFailed(resp.msg || resp.error));
      } else {
        getusers()
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(addUserFailed('Something went wrong. Please try after some time'));
      console.log('deleteUserService: ', err)
    }
  }

  const updateUser = async (userId, credentials) => {
    try {
      setIsLoading(true);
      const resp = await updateUserApi(userId, credentials);
      setIsLoading(false);
      if (resp.msg || resp.error) {
        dispatch(addUserFailed(resp.msg || resp.error));
      } else {
        history.push('/organization')
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(addUserFailed('Something went wrong. Please try after some time'));
      console.log('addUser: ', err)
    }
  }

  const getUser = async (userId) => {
    try {
      setIsLoading(true);
      const resp = await getUserApi(userId);
      setIsLoading(false);
      if (resp.msg || resp.error) {
        dispatch(addUserFailed(resp.msg || resp.error));
      } else {
        dispatch(getUserSuccess(resp.user));
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(addUserFailed('Something went wrong. Please try after some time'));
      console.log('deleteUserService: ', err)
    }
  }

  return { organization, getusers, getUser, addUser, deleteUserService, updateUser, isLoading };
}

export default useOrganization
