import ApiService from 'src/api/apiService'

const resource = '/users'

export default {
  getUsers () {
    return ApiService.get(resource)
  },

  getUser (userId) {
    return ApiService.get(resource + '/' + userId)
  }
}
