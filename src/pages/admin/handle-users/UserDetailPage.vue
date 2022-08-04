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
          <div class="text-h6 text-white column">
            <div>{{user.firstName}} {{user.lastName}}</div>
            <div class="text-caption text-primary">
              {{user.email}}
            </div>
          </div>
        </div>
        <div class="column items-center">
          <q-icon name="fiber_smart_record" size="md" @click="user.enabled = !user.enabled" :color="user.enabled ? 'primary' : 'negative'" ></q-icon>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <span class="text-h6">Le tue sottoscrizioni</span>
      <div class="row no-wrap q-gutter-md overflow-auto q-py-md">
        <q-card class="shadow-4 subscription-card">
          <q-card-section class="row justify-between items-center">
            <div class="column">
              <div class="text-bold text-primary text-h6">Test1</div>
              <div class="text-caption text-bold">Mezz'ora</div>
              <div class="text-caption text-italic">04/08/2022</div>
            </div>
            <div class="column items-center">
              <div class="text-primary text-h4 text-white">10</div>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="shadow-4 subscription-card subscription-card__expired">
          <q-card-section class="row justify-between items-center">
            <div class="column">
              <div class="text-bold text-primary text-h6">Test1</div>
              <div class="text-caption text-bold">Mezz'ora</div>
              <div class="text-caption text-italic">02/08/2022</div>
            </div>
            <div class="column items-center">
              <div class="text-primary text-h4 text-white">0</div>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="shadow-4 subscription-card subscription-card__expired">
          <q-card-section class="row justify-between items-center">
            <div class="column">
              <div class="text-bold text-primary text-h6">Test2</div>
              <div class="text-caption text-bold">Orario</div>
              <div class="text-caption text-italic">20/07/2022</div>
            </div>
            <div class="column items-center">
              <div class="text-primary text-h4 text-white">0</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.subscription-card {
  width: 50vw;
  min-width: 50vw;
  border-radius: 20px;
  background: linear-gradient(315deg, #638229 0%, rgb(129, 185, 58) 45%, transparent 0%);

  &__expired {
    background: linear-gradient(315deg, #e87c03 0%, rgb(232, 124, 3) 45%, transparent 0%)
  }
}
</style>
