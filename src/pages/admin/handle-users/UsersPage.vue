<script setup>
import useAdmin from 'src/composables/useAdmin'
import { onMounted, ref } from 'vue'
const { getUsers, userList } = useAdmin()

const users = ref([])

onMounted(async () => {
  await getUsers()
  users.value = userList.value.map((user) => {
    return {
      ...user,
      letter: user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()
    }
  })
  console.log('AOOAOA', users.value)
})
</script>

<template>
  <div class="">
    <q-toolbar class="bg-black shadow-2" style="color: #81b93a">
      <q-icon class="q-mr-sm" name="people" size="md" style="color: #81b93a"></q-icon>
      <q-toolbar-title>Lista utenti</q-toolbar-title>
    </q-toolbar>

    <q-list>
      <div v-for="user in users" :key="user.id">
        <q-item class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="black" style="color: #81b93a" class="shadow-3">
              {{ user.letter }}
            </q-avatar>
          </q-item-section>

          <q-item-section style="color: #81b93a">
            <q-item-label>{{ user.firstName }} {{ user.lastName }}</q-item-label>
            <q-item-label caption lines="1" >{{ user.email }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="fiber_smart_record" :color="user.enabled ? 'green' : 'red'" size="xs"/>
          </q-item-section>
        </q-item>
        <q-separator class="q-ml-xl"/>
      </div>
    </q-list>
  </div>
</template>
