import { ApiFactory } from 'src/api/apiFactory'
const LoginService = ApiFactory.get('login')
import { useQuasar } from 'quasar'
import JwtService from '../api/jwtService'
import { computed, ref } from 'vue'

const loggedUser = ref({})

export default function useCatalog () {
  const $q = useQuasar()

  async function login (queryParams) {
    $q.loading.show()
    const { data } = await LoginService.login(queryParams)
    console.log(data)
    JwtService.saveToken(data.result.token)
    $q.loading.hide()
  }

  async function register (user) {
    $q.loading.show()
    const { data } = await LoginService.register(user)
    console.log(data)
    $q.loading.hide()
  }

  async function getLoggedUser () {
    $q.loading.show()
    const { data } = await LoginService.getLoggedUser()
    loggedUser.value = data.result
    $q.loading.hide()
  }

  return {
    loggedUser: computed(() => loggedUser.value),
    login,
    register,
    getLoggedUser
  }
}
