import helloService from 'src/api/helloService'
import loginService from 'src/api/loginService'

const services = {
  hello: helloService,
  login: loginService
}

export const ApiFactory = {
  get: name => services[name]
}
