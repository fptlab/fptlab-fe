<script setup>
import useAdmin from 'src/composables/useAdmin'
import useMainLayout from 'src/composables/useMainLayout'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { getUser, user } = useAdmin()
const { layoutData } = useMainLayout()
const route = useRoute()

layoutData.value.isShown = false

onMounted(async () => {
  const userid = route.params.userid
  await getUser(userid)
  console.log('USER', user)
})
</script>

<template>
  <div>
    <div class="text-primary q-pa-lg shadow-2 fpt-header">
      <div class="row justify-between">
        <div class="row q-gutter-md">
          <q-avatar color="primary">
            <img src="../../../assets/avatar2.png">
          </q-avatar>
          <div class="text-h5 text-white column">
            <div>{{user.firstName}} {{user.lastName}}</div>
            <div class="text-caption text-primary">{{user.email}}</div>
          </div>
        </div>
        <div>
          <q-toggle v-model="user.enabled" color="primary" icon="fiber_smart_record"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
