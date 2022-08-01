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
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h5 text-primary">{{user.firstName}} {{user.lastName}}</div>
          <div>
            <q-toggle v-model="user.enabled" color="primary" icon="fiber_smart_record"/>
          </div>
        </div>
        <div class="text-caption text-primary">{{user.email}}</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn text-color="white" label="Aggiungi sottoscrizione" class="full-width bg-primary" push/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
</style>
