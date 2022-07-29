import { ApiFactory } from 'src/api/apiFactory'
const UserService = ApiFactory.get('user')
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

const loggedUser = ref({})

export default function useUser () {
  const $q = useQuasar()

  async function profile () {
    $q.loading.show()
    const { data } = await UserService.profile()
    loggedUser.value = data.result
    $q.loading.hide()
  }

  return {
    loggedUser: computed(() => loggedUser.value),
    profile
  }
}
