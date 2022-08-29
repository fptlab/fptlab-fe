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
  <q-layout view="hHh lpR fFf" style="background-color: black">

    <q-header v-if="layoutData.isShown" class="q-py-md q-px-md bg-black flex text-white justify-between items-center" reveal elevated>
      <q-icon name="fa-solid fa-angle-left" class="text-white" @click="$router.back()"></q-icon>
      <div class="text-h6 text-capitalize">
        {{ layoutData.title }}
      </div>
      <q-icon name="fa-solid fa-ellipsis" class="text-white"></q-icon>
    </q-header>

    <q-page-container style="background-color:#16161a">
      <router-view />
    </q-page-container>

    <q-footer class="bg-black q-py-xs" elevated>
      <q-tabs
        narrow-indicator
        align="justify"
        v-model="tab">
        <q-route-tab name="users" to="/admin/handle-users" exact class="unActive-icon" active-class="active-icon text-primary">
          <q-icon name="fa-solid fa-people-group" size="sm"></q-icon>
        </q-route-tab>
        <q-route-tab name="bookings" to="/admin/handle-bookings" exact class="unActive-icon" active-class="active-icon text-primary">
          <q-icon name="fa-solid fa-calendar-days" size="sm"></q-icon>
        </q-route-tab>
        <q-route-tab name="trainers" to="/admin/handle-trainers" exact class="unActive-icon" active-class="active-icon text-primary">
          <q-icon name="fa-solid fa-dumbbell" size="sm"></q-icon>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<style lang="scss">
.active-icon {
  opacity: 1 !important;
}
.unActive-icon {
  opacity: 0.5;
}
</style>
