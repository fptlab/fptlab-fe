import ApiService from 'src/api/apiService'

const users = '/users'

export default {

  getUsers () {
    return ApiService.get(users)
  }
}
