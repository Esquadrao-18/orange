import axios from 'axios'

const orangeAPI = axios.create({
  baseURL: 'https://orange-api.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  },
  interceptors: {
    request: (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default orangeAPI
