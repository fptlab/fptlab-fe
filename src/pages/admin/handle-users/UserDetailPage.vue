<script setup>
import useAdmin from 'src/composables/useAdmin'
import useMainLayout from 'src/composables/useMainLayout'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { date } from 'quasar'

const { getUser, user } = useAdmin()
const { layoutData } = useMainLayout()
const route = useRoute()
const dialog = ref(false)
const subscriptionSelected = ref(undefined)

layoutData.value.isShown = false

const userSubscriptionList = ref([
  {
    id: 1,
    name: 'HALF HOUR TEN',
    type: 'HALF_HOUR',
    startDate: '04/08/2022',
    lessonLeft: 10,
    active: true
  },
  {
    id: 2,
    name: 'HOUR TEN',
    type: 'HOUR',
    startDate: '02/07/2022',
    lessonLeft: 0,
    active: false
  },
  {
    id: 3,
    name: 'HALF HOUR TWENTY',
    type: 'HALF_HOUR',
    startDate: '20/06/2022',
    lessonLeft: 0,
    active: false
  }
])

const subscriptionList = ref([
  {
    id: 1,
    name: 'HALF HOUR TEN',
    type: 'HALF_HOUR',
    lessons: 10
  },
  {
    id: 2,
    name: 'HOUR TEN',
    type: 'HOUR',
    lessons: 10
  },
  {
    id: 3,
    name: 'HALF HOUR TWENTY',
    type: 'HALF_HOUR',
    lessons: 20
  },
  {
    id: 4,
    name: 'HOUR TWENTY',
    type: 'HOUR',
    lessons: 20
  }
])

function addSubscription () {
  const subSelected = subscriptionList.value.find((sub) => {
    return sub.id === subscriptionSelected.value
  })
  userSubscriptionList.value.unshift({
    name: subSelected.name,
    type: subSelected.type,
    startDate: date.formatDate(new Date(), 'DD/MM/YYYY'),
    lessonLeft: subSelected.lessons,
    active: true
  })
  dialog.value = false
}

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
      <span class="text-h6 text-white">Ultime sottoscrizioni</span>
      <div class="row no-wrap q-gutter-md overflow-auto q-py-md">
        <q-card :class="sub.active ? 'subscription-card subscription-card__active' : 'subscription-card subscription-card__expired'" v-for="sub in userSubscriptionList" :key="sub.id">
          <q-card-section class="row justify-between items-end">
            <div class="column q-gutter-xs">
              <div class="text-bold text-primary" style="font-size: 1rem">{{sub.name}}</div>
              <q-img class="q-mb-xs" src="../../../assets/workout_1h.png" v-if="sub.type === 'HOUR'" style="width: 50px"></q-img>
              <q-img class="q-mb-xs" src="../../../assets/workout_half1h.png" v-if="sub.type === 'HALF_HOUR'" style="width: 50px"></q-img>
              <div class="text-caption text-italic">{{sub.startDate}}</div>
            </div>
            <div class="column justify-between items-end">
              <div class="text-primary text-h4 text-white">{{sub.lessonLeft}}</div>
              <div class="text-primary text-caption text-white">Lezioni</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="row justify-end items-center">
        <q-item tag="a" class="text-white items-center" :to="user.id + '/subscriptions'">Visualizza tutte</q-item>
        <q-btn text-color="white" label="Aggiungi" no-caps icon-right="more_time" class="bg-primary" @click="dialog = true; subscriptionSelected = false" push/>
      </div>
    </div>

    <div class="q-pa-md">
      <span class="text-h6 text-white">Ultime prenotazioni</span>
      <div class="row no-wrap q-gutter-md overflow-auto q-py-md">
        <q-card class="booking-card" v-for="sub in userSubscriptionList" :key="sub.id">
          <em></em>
          <div class="row bg-primary items-center justify-center text-white text-h6 booking-card__header text-bold">
            10 AGOSTO
          </div>
          <q-card-section class="column justify-center items-center">
            <div class="row justify-center items-center q-mb-sm">
              <q-img src="../../../assets/workout_1h.png" v-if="sub.type === 'HOUR'" style="width: 70px"></q-img>
              <q-img src="../../../assets/workout_half1h.png" v-if="sub.type === 'HALF_HOUR'" style="width: 70px"></q-img>
            </div>
            <div class="text-secondary text-bold text-h6">10:00 - 10:30</div>
          </q-card-section>
          <!--div class="row justify-between full-width" v-if="sub.active">
            <q-btn text-color="white" label="Cancella" no-caps class="bg-red full-width" style="border-radius: 0px 0px 20px 20px"/>
          </div-->
        </q-card>
      </div>
      <div class="row justify-end">
        <q-item tag="a" class="text-white no-padding" :to="user.id + '/subscriptions'">Visualizza tutte</q-item>
      </div>
    </div>

    <q-dialog v-model="dialog" position="bottom">
      <q-card class="q-pa-xs">
        <q-card-section>
          <div class="row no-wrap q-gutter-md overflow-auto q-py-md">
            <q-card @click="subscriptionSelected = sub.id"
                    :class="subscriptionSelected === sub.id ? 'subscription-card subscription-card__selected shadow-2' : 'subscription-card shadow-2'"
                    v-for="sub in subscriptionList" :key="sub.id">
              <q-card-section class="row justify-between items-end">
                <div class="column q-gutter-xs">
                  <div class="text-bold text-primary" style="font-size: 1rem">{{sub.name}}</div>
                  <q-img class="q-mb-xs" src="../../../assets/workout_1h.png" v-if="sub.type === 'HOUR'" style="width: 45px"></q-img>
                  <q-img class="q-mb-xs" src="../../../assets/workout_half1h.png" v-if="sub.type === 'HALF_HOUR'" style="width: 45px"></q-img>
                </div>
                <div class="column justify-between items-end">
                  <div class="text-primary text-h4 text-white">{{sub.lessons}}</div>
                  <div class="text-primary text-caption text-white text-right">Pacchetto<br>lezioni</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn text-color="white" label="Conferma selezione" no-caps icon-right="check" class="bg-primary" :disable="!subscriptionSelected" @click="addSubscription" push/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped lang="scss">
.subscription-card {
  min-width: 80vw;
  border-radius: 20px;
  background: linear-gradient(300deg, #638229 0%, rgb(129, 185, 58) 38%, #ffffff 0%);

  &__active {
    background: linear-gradient(300deg, #638229 0%, rgb(129, 185, 58) 38%, #ffffff 0%) !important;
    box-shadow: 1px 1px 4px 0px #a69d9d7d;
  }

  &__expired {
    background: linear-gradient(300deg, #e87c03 0%, rgb(232, 124, 3) 38%, #ffffff 0%) !important;
    box-shadow: 1px 1px 4px 0px #a69d9d7d;
  }

  &__selected {
    border: 3px solid #638229;
  }
}

.booking-card {
  min-width: 60vw;
  border-radius: 20px;
  box-shadow: 1px 1px 4px 0px #a69d9d7d;

  &__header {
    height: 50px;
    border-radius: 20px 20px 0px 0px !important;
  }
}

.booking-card:before, .booking-card:after{
  content:'';
  float:left;
  position:absolute;
  top:5px;
  width:8px;
  height:8px;
  background:#111;
  z-index:1;
  -moz-border-radius:10px;
  -webkit-border-radius:10px;
  border-radius:10px;
  -moz-box-shadow:0 1px 1px #fff;
  -webkit-box-shadow:0 1px 1px #fff;
  box-shadow:0 1px 1px #fff;
}
.booking-card:before{left:11px;}
.booking-card:after{right:11px;}

.booking-card em:before, .booking-card em:after{
  content:'';
  float:left;
  position:absolute;
  top:-5px;
  width:4px;
  height:14px;
  background:#dadada;
  background:-webkit-gradient(linear, left top, left bottom, from(#f1f1f1), to(#aaa));
  background:-moz-linear-gradient(top,  #f1f1f1,  #aaa);
  z-index:2;
  -moz-border-radius:2px;
  -webkit-border-radius:2px;
  border-radius:2px;
}
.booking-card em:before{left:13px;}
.booking-card em:after{right:13px;}
</style>
