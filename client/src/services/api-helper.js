import axios from 'axios';
const baseUrl = 'https://hack-a-manager.herokuapp.com/'

const api = axios.create({
  baseURL: baseUrl
})

export const loginUser = async (loginData) => {
    const resp = await api.post('/auth/login', loginData)
    
    localStorage.setItem('authToken', resp.data.token);
    localStorage.setItem('userId', resp.data.user_id)
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
    return resp.data.user
  }
  
  export const registerUser = async (registerData) => {
    const resp = await api.post('/users', { user: registerData })
    return resp.data
  }
  
  export const verifyUser = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`
      const resp = await api.get('https://hack-a-manager.herokuapp.com/users/verify');
      return resp.data
    }
    return false;
  }