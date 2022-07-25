import { ApiFactory } from 'src/api/apiFactory'
const LoginService = ApiFactory.get('login')
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'

const token = ref('')
const refreshToken = ref('')

export default function useCatalog () {
  const $q = useQuasar()

  async function login (queryParams) {
    $q.loading.show()
    const { data } = await LoginService.login(queryParams)
    token.value = data.token
    refreshToken.value = data.refreshToken
    $q.loading.hide()
  }

  async function register (user) {
    $q.loading.show()
    const { data } = await LoginService.register(user)
    console.log(data)
    $q.loading.hide()
  }

  return {
    token: computed(() => token.value),
    refreshToken: computed(() => refreshToken.value),
    login,
    register
  }
}
