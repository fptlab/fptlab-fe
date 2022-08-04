<script setup>
import useAdmin from 'src/composables/useAdmin'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { getUser, user } = useAdmin()
const route = useRoute()

onMounted(async () => {
  const userid = route.params.userid
  await getUser(userid)
  console.log('USER', user)
})
</script>

<template>
  <div>
    <div class="text-primary q-pa-lg shadow-2 fpt-header radius">
      <div class="row justify-between items-center">
        <div class="row q-gutter-md">
          <q-avatar color="primary">
            <img src="../../../assets/avatar2.png">
          </q-avatar>
          <div class="text-h6 text-primary column">
            <div>{{user.firstName}} {{user.lastName}}</div>
            <div class="text-caption text-primary">
              {{user.email}}
            </div>
          </div>
        </div>
        <div class="column items-center">
          <q-icon name="fiber_smart_record" size="md" @click="user.enabled = !user.enabled" :color="user.enabled ? 'primary' : 'negative'" ></q-icon>
          <!--div :class="user.enabled ? 'text-caption text-primary' : 'text-caption text-negative'">{{ user.enabled ? 'Attivo' : 'Disattivo' }}</div-->
          <!--q-toggle v-model="user.enabled" color="primary" keep-color icon="fiber_smart_record"/-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
