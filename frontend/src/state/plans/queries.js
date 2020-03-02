import axios from 'axios'

export const getPlansApi = (credentials) => {
  return axios.get('http://localhost:2018/public/plans')
    .then(res => res.data)
    .catch(err => err.response.data)
};
