import ApiService from 'src/api/apiService'

const resource = '/login'

export default {
  login (user) {
    return ApiService.postEncoded(resource + '', user)
  }
}
