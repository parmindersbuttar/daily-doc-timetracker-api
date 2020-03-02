import axios from 'axios'

export const getUsersApi = () => {
  return axios.get('/private/organization/users', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

export const addUserApi = (credentials) => {
  return axios.post('/private/organization/users', { ...credentials }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

export const updateUserApi = (userId, credentials) => {
  console.log(userId, credentials)
  return axios.patch(`/private/organization/users/${userId}`, { ...credentials }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

export const deleteUserApi = (userId) => {
  return axios.delete(`/private/organization/users/${userId}`, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

export const getUserApi = (userId) => {
  return axios.get(`/private/organization/users/${userId}`, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

