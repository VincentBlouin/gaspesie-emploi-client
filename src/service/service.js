import axios from 'axios'
import Store from '@/store'

const Service = {
  baseUrl: function () {
    return location.protocol + '//' + location.hostname + ':3000'
  },
  api: function () {
    const loginPages = [
      '/',
      '/login'
    ]
    const axiosInstance = axios.create({
      baseURL: Service.baseUrl(),
      headers: {
        Authorization: 'Bearer ' + Store.state.token
      }
    })
    axiosInstance.interceptors.response.use(null, function (error) {
      if (error.response.status === 401) {
        Store.dispatch('setToken', null)
        Store.dispatch('setUser', null)
        if (loginPages.indexOf(window.location.pathname) === -1) {
          window.location.href = '/'
        }
      }
      return Promise.reject(error)
    })
    return axiosInstance
  }
}
export default Service
