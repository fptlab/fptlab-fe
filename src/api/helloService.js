import ApiService from 'src/api/apiService'

const resource = '/users'

export default {
  greeting () {
    return ApiService.get(resource + '')
  }
}
