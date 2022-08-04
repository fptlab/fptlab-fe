<script setup>
import useAdmin from 'src/composables/useAdmin'
import useMainLayout from 'src/composables/useMainLayout'
import { computed, onMounted, ref } from 'vue'
import SkeletonList from 'components/SkeletonList'
import SkeletonTitle from 'components/SkeletonTitle'
const { getUsers, userList } = useAdmin()
const { layoutData } = useMainLayout()

layoutData.value.title = 'Lista utenti'
layoutData.value.isShown = true

const users = ref([])
const text = ref('')

const filterList = computed(() => {
  const filter = text.value
  if (filter) {
    return users.value.filter((user) => {
      const fullName = user.firstName + ' ' + user.lastName
      return fullName.toLowerCase().indexOf(filter.toLowerCase()) > -1
    })
  } else {
    return users.value
  }
})

onMounted(async () => {
  await getUsers()
  users.value = userList.value.map((user) => {
    return {
      ...user,
      letter: user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()
    }
  })
})

</script>
<template>
  <div v-if="users.length <= 0">
    <skeleton-title></skeleton-title>
    <skeleton-list></skeleton-list>
  </div>
  <div v-else>
    <q-list v-if="users.length > 0">
      <div v-for="user in filterList" :key="user.id">
        <q-item class="q-my-sm" clickable v-ripple :to="'handle-users/' + user.id">
          <q-item-section avatar>
            <q-avatar color="primary" class="shadow-3 text-white">
              <img src="../../../assets/avatar2.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-white q-mb-xs">{{ user.firstName }} {{ user.lastName }}</q-item-label>
            <q-item-label class="text-white" caption lines="1" >{{ user.email }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="fiber_smart_record" :color="user.enabled ? 'positive' : 'negative'" size="xs"/>
          </q-item-section>

          <q-item-section side>
            <q-icon name="chevron_right" size="xs"/>
          </q-item-section>
        </q-item>
        <q-separator color="grey" inset />
      </div>
    </q-list>
  </div>

</template>

<style scoped lang="scss">
</style>
