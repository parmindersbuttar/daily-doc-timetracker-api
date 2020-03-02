import axios from 'axios'

export const getUsersApi = () => {
  return axios.get('http://localhost:2018/private/organization/users', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

export const addUserApi = (credentials) => {
  return axios.post('http://localhost:2018/private/organization/users', { ...credentials }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

export const updateUserApi = (userId, credentials) => {
  console.log(userId, credentials)
  return axios.patch(`http://localhost:2018/private/organization/users/${userId}`, { ...credentials }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

export const deleteUserApi = (userId) => {
  return axios.delete(`http://localhost:2018/private/organization/users/${userId}`, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

export const getUserApi = (userId) => {
  return axios.get(`http://localhost:2018/private/organization/users/${userId}`, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err =>  err.response.data)
};

