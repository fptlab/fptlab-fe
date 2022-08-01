import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_BASE_URL } from './config'
import JwtService from './jwtService'
import { Loading, Notify } from 'quasar'

const app = createApp()
let vuerouter

const authInterceptor = (config) => {
  if (JwtService.getToken()) {
    config.headers.Authorization = `Bearer ${JwtService.getToken()}`
  }
  return config
}

const errorInterceptor = async (error) => {
  Loading.hide()
  if (!error.response) {
    // JwtService.destroyToken()
    vuerouter.push('/404')
  }
  switch (error.response.status) {
    case 400:
      Notify.create({
        type: 'negative',
        message: error.response.data.message
      })
      break

    case 401:
      if (error.response.config.url === '/login') {
        Notify.create({
          type: 'negative',
          message: error.response.data.message
        })
      } else {
        JwtService.destroyToken()
        vuerouter.push('/login')
      }
      break

    case 503:
      JwtService.destroyToken()
      vuerouter.push('/login')
      break

    default:
      Notify.create({
        type: 'negative',
        message: error.response.data.message,
        html: true
      })
  }
  return Promise.reject(error)
}

const responseInterceptor = response => {
  switch (response.status) {
    case 200:
      console.log(response.status)
      console.log(response.data)
      if (response.data.message) {
        Notify.create({
          type: 'positive',
          message: response.data.message
        })
      }
      break
    default:
  }

  return response
}

const ApiService = {
  init (router) {
    vuerouter = router
    app.use(VueAxios, axios)
    app.axios.defaults.baseURL = API_BASE_URL
    app.axios.defaults.headers.common = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    app.axios.interceptors.request.use(authInterceptor)
    app.axios.interceptors.response.use(responseInterceptor, errorInterceptor)
  },

  get (resource) {
    return app.axios.get(`${resource}`)
  },

  post (resource, body) {
    return app.axios.post(`${resource}`, body)
  },

  postEncoded (resource, body) {
    return app.axios.post(`${resource}`,
      new URLSearchParams(body), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
  },

  update (resource, params) {
    return app.axios.put(`${resource}`, params)
  },

  put (resource, body) {
    return app.axios.put(`${resource}`, body)
  },

  delete (resource, body) {
    return axios.delete(resource, body)
  }
}

export default ApiService
