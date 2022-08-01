import { ApiFactory } from 'src/api/apiFactory'
const AdminService = ApiFactory.get('admin')
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

const userList = ref({})

export default function useAdmin () {
  const $q = useQuasar()

  async function getUsers () {
    $q.loading.show()
    const { data } = await AdminService.getUsers()
    userList.value = data.result
    $q.loading.hide()
  }

  return {
    getUsers,
    userList: computed(() => userList.value)
  }
}
