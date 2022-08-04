<script setup>
import useAdmin from 'src/composables/useAdmin'
import { computed, onMounted, ref } from 'vue'
const { getUsers, userList } = useAdmin()

const users = ref([])
const text = ref('')

const filterList = computed(() => {
  const filter = text.value
  if (filter) {
    return users.value.filter((user) => {
      const fullname = user.firstName + ' ' + user.lastName
      return fullname.toLowerCase().indexOf(filter.toLowerCase()) > -1
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
  <div>
    <div class="text-primary q-pa-md fpt-header shadow-2">
      <div class="row justify-between items-center">
        <div class="text-h5 text-primary">
          <div>Lista utenti</div>
        </div>
        <q-input borderless dark standout v-model="text" input-class="text-right" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </div>
    </div>

    <q-list v-if="users.length > 0">
      <div v-for="user in filterList" :key="user.id">
        <q-item class="q-my-sm" clickable v-ripple :to="'handle-users/' + user.id">
          <q-item-section avatar>
            <q-avatar color="secondary" class="shadow-3 text-white">
              {{ user.letter }}
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-primary">
            <q-item-label>{{ user.firstName }} {{ user.lastName }}</q-item-label>
            <q-item-label caption lines="1" >{{ user.email }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="fiber_smart_record" :color="user.enabled ? 'positive' : 'negative'" size="xs"/>
          </q-item-section>

          <q-item-section side>
            <q-icon name="chevron_right" size="xs"/>
          </q-item-section>
        </q-item>
        <q-separator class="q-ml-xl"/>
      </div>
    </q-list>
  </div>
</template>

<style scoped lang="scss">
</style>
