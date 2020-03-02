import axios from 'axios'

export const loginApi = (credentials) => {
  return axios.post('/public/login', { ...credentials })
    .then(res => res.data)
    .catch(err => err.response.data)
};

export const registerApi = (credentials) => {
  return axios.post('/public/register', { ...credentials })
    .then(res => res.data)
    .catch(err => err.response.data)
};

export const updateApi = (credentials) => {
  return axios.put('/private/users', { ...credentials }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

export const validateApi = (token) => {
  return axios.post('/public/validate', { token })
    .then(res => res.data)
    .catch(err =>  err.response.data )
};

export const recoverPasswordApi = (credentials) => {
  return axios.post('/public/recover-password', { ...credentials })
    .then(res => res.data)
    .catch(err => err.response.data )
};

export const resetPasswordApi = (credentials) => {
  return axios.post('/public/reset-password', { ...credentials })
    .then(res => res.data)
    .catch(err => err.response.data)
};

export const toggleSubscriptionApi = (value, token) => {
  return axios.post('/private/toggle-subscription', { value }, { headers: { Authorization: "Bearer " + token } })
    .then(res => res.data)
    .catch(err => err.response.data)
};