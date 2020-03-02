import axios from 'axios'

export const getPlansApi = (credentials) => {
  return axios.get('/public/plans')
    .then(res => res.data)
    .catch(err => err.response.data)
};
