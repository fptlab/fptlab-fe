<script setup>
import useAdmin from 'src/composables/useAdmin'
import useMainLayout from 'src/composables/useMainLayout'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { getUser, user } = useAdmin()
const { layoutData } = useMainLayout()
const route = useRoute()

layoutData.value.isShown = false

const subscriptionList = [
  {
    id: 1,
    name: 'WALLR',
    type: 'HALF_HOUR',
    startDate: '04/08/2022',
    lessonLeft: 10,
    active: true
  },
  {
    id: 2,
    name: 'MAMMT',
    type: 'HOUR',
    startDate: '02/07/2022',
    lessonLeft: 0,
    active: false
  },
  {
    id: 3,
    name: 'Test2',
    type: 'HALF_HOUR',
    startDate: '20/06/2022',
    lessonLeft: 0,
    active: false
  }
]

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
      <span class="text-h6 text-white">Le tue sottoscrizioni</span>
      <div class="row no-wrap q-gutter-md overflow-auto q-py-md">
        <q-card :class="sub.active ? 'subscription-card' : 'subscription-card subscription-card__expired'" v-for="sub in subscriptionList" :key="sub.id">
          <q-card-section class="row justify-between items-end">
            <div class="column q-gutter-xs">
              <div class="text-bold text-primary text-h6">{{sub.name}}</div>
              <q-img class="q-mb-xs" src="../../../assets/workout_1h.png" v-if="sub.type === 'HOUR'" style="width: 60px"></q-img>
              <q-img class="q-mb-xs" src="../../../assets/workout_half1h.png" v-if="sub.type === 'HALF_HOUR'" style="width: 60px"></q-img>
              <!--div class="text-caption text-italic">{{sub.startDate}}</div-->
            </div>
            <div class="column justify-between items-end">
              <div class="text-primary text-h3 text-white">{{sub.lessonLeft}}</div>
              <div class="text-primary text-caption text-white">Pacchetto lezioni</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.subscription-card {
  min-width: 70vw;
  border-radius: 20px;
  background: linear-gradient(300deg, #638229 0%, rgb(129, 185, 58) 42%, #ffffff 0%);
  box-shadow: 1px 1px 4px 0px #a69d9d7d;

  &__expired {
    background: linear-gradient(300deg, #e87c03 0%, rgb(232, 124, 3) 42%, #ffffff 0%)
  }
}
</style>
