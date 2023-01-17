// localhost: http://localhost:8082 test
const API_BASE_DOMAIN = process.env.NODE_ENV === 'development' ? 'https://pt-lab-373712.oa.r.appspot.com' : 'https://pt-lab-373712.oa.r.appspot.com'
export const API_BASE_URL = `${API_BASE_DOMAIN}/rest/api/`

export default {
  API_BASE_URL
}
