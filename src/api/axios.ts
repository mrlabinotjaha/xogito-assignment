import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((request: any) => {
  return request
})

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
