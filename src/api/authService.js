import ApiService from 'src/api/apiService'

const resource = '/auth'

export default {
  signup (body) {
    return ApiService.post(resource + '/signup', body)
  }
}
