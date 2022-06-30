import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_BASE_URL } from './config'
import JwtService from './jwtService'
import { Notify } from 'quasar'

const app = createApp()

const authInterceptor = (config) => {
  if (JwtService.getToken()) {
    config.headers.Authorization = `Bearer ${JwtService.getToken()}`
  }
  return config
}

const errorInterceptor = async error => {
  if (!error.response) {
    return Promise.reject(error)
  }

  switch (error.response.status) {
    case 400:
      console.error(error.response.status, error.message)
      Notify.create({
        type: 'negative',
        message: error.response.data.message
      })
      break

    case 401:
      console.log('401 UNAUTHORIZED')
      // TODO rimandare a login component magari
      JwtService.destroyToken()
      break

    default:
      console.log(error.response)
      Notify.create({
        type: 'negative',
        message: error.response.data.error.message,
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
  init () {
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
