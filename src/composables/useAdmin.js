import { ApiFactory } from 'src/api/apiFactory'
const AdminService = ApiFactory.get('admin')
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

const userList = ref([])
const user = ref({})

export default function useAdmin () {
  const $q = useQuasar()

  async function getUsers () {
    $q.loading.show()
    const { data } = await AdminService.getUsers()
    userList.value = data.result
    $q.loading.hide()
  }

  async function getUser (userId) {
    $q.loading.show()
    const { data } = await AdminService.getUser(userId)
    user.value = data.result
    $q.loading.hide()
  }

  return {
    getUsers,
    getUser,
    userList: computed(() => userList.value),
    user: computed(() => user.value)
  }
}
