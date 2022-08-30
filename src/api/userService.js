import ApiService from 'src/api/apiService'

const resource = '/users'

export default {
  profile () {
    return ApiService.get(resource + '/me')
  }
}
