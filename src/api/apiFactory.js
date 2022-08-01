import helloService from 'src/api/helloService'
import loginService from 'src/api/loginService'
import adminService from 'src/api/adminService'
import authService from 'src/api/authService'
import userService from 'src/api/userService'

const services = {
  hello: helloService,
  login: loginService,
  admin: adminService,
  auth: authService,
  user: userService
}

export const ApiFactory = {
  get: name => services[name]
}
