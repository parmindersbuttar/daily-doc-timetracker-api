import { useState, useEffect } from 'react';
import { getPlansApi } from '../queries';
import { useStateValue } from '../../index';
import {
  getPlanSuccess,
  getPlanFailed
} from '../actions'

const usePlans = () => {
  const [{ plans }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPlans();
  }, []);

  const getPlans = async () => {
    try {
      setIsLoading(true);
      const resp = await getPlansApi();
      setIsLoading(false);
      if (resp.msg) {
        dispatch(getPlanFailed('Something Went wrong'));
      } else {
        dispatch(getPlanSuccess(resp.plans));
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(getPlanFailed('Something Went wrong'));
      console.log('loginUser: ', err)
    }
  }

  return { plans, getPlans, isLoading };
}

export default usePlans
