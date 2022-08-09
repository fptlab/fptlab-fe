<script setup>
import { onMounted, ref } from 'vue'
import useUser from 'src/composables/useUser'
import useMainLayout from 'src/composables/useMainLayout'
const { profile } = useUser()
const { layoutData } = useMainLayout()

const tab = ref('users')

onMounted(async () => {
  await profile()
})
</script>

<template>
  <q-layout view="hHh lpR fFf" class="fpt-header">

    <q-header v-if="layoutData.isShown" class="q-pa-md bg-transparent flex text-white justify-between items-center" reveal>
      <q-icon name="fa-solid fa-angle-left" class="text-white" @click="$router.back()"></q-icon>
      <div class="text-h6 text-capitalize">
        {{ layoutData.title }}
      </div>
      <q-icon name="fa-solid fa-ellipsis" class="text-white"></q-icon>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-black">
      <q-tabs v-model="tab" class="text-white">
        <q-route-tab name="users" to="/admin/handle-users" exact class="unactive-icon" active-class="active-icon text-primary">
          <q-icon name="people" size="md"></q-icon>
        </q-route-tab>
        <q-route-tab name="bookings" to="/admin/handle-bookings" exact class="unactive-icon" active-class="active-icon text-primary">
          <q-icon name="event" size="md"></q-icon>
        </q-route-tab>
        <q-route-tab name="trainers" to="/admin/handle-trainers" exact class="unactive-icon" active-class="active-icon text-primary">
          <q-icon name="sports_gymnastics" size="md"></q-icon>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<style lang="scss">
.active-icon {
  opacity: 1 !important;
}
.unactive-icon {
  opacity: 0.5;
}
</style>
