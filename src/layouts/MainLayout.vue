<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-tabs
        v-model="tab"
        class="bg-primary text-white">
        <q-route-tab name="users" to="/admin/handle-users" exact>
          <q-icon name="people" size="md" col></q-icon>
        </q-route-tab>
        <q-route-tab name="bookings" to="/admin/handle-bookings" exact>
          <q-icon name="event" size="md"></q-icon>
        </q-route-tab>
        <q-route-tab name="trainers" to="/admin/handle-trainers" exact>
          <q-icon name="sports_gymnastics" size="md"></q-icon>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useUser from 'src/composables/useUser'
const { profile } = useUser()

const tab = ref('users')

onMounted(async () => {
  await profile()
})
</script>
