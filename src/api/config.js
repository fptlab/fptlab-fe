// localhost: http://localhost:8082
const API_BASE_DOMAIN = process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : 'https://fptlab.herokuapp.com'
export const API_BASE_URL = `${API_BASE_DOMAIN}/rest/api/`

export default {
  API_BASE_URL
}
