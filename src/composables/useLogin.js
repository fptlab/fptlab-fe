import { ApiFactory } from 'src/api/apiFactory'
const LoginService = ApiFactory.get('login')
import { useQuasar } from 'quasar'
import JwtService from '../api/jwtService'
import { computed, ref } from 'vue'

const loggedUser = ref({})

export default function useLogin () {
  const $q = useQuasar()

  async function login (queryParams) {
    $q.loading.show()
    const { data } = await LoginService.login(queryParams)
    JwtService.saveToken(data.result.token)
    $q.loading.hide()
  }

  return {
    loggedUser: computed(() => loggedUser.value),
    login
  }
}
