import helloService from 'src/api/helloService'
import loginService from 'src/api/loginService'
import adminService from 'src/api/adminService'

const services = {
  hello: helloService,
  login: loginService,
  admin: adminService
}

export const ApiFactory = {
  get: name => services[name]
}
