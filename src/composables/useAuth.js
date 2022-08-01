import { ApiFactory } from 'src/api/apiFactory'
const AuthService = ApiFactory.get('auth')
import { useQuasar } from 'quasar'

export default function useAuth () {
  const $q = useQuasar()

  async function signup (body) {
    $q.loading.show()
    await AuthService.signup(body)
    $q.loading.hide()
  }

  return {
    signup
  }
}
