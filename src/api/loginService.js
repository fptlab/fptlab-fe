import ApiService from 'src/api/apiService'

const resource = '/login'
const signup = '/auth/signup'

export default {
  login (user) {
    return ApiService.postEncoded(resource + '', user)
  },

  register (user) {
    return ApiService.post(signup + '', user)
  }
}
