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

layoutData.value.isShown = true
layoutData.value.title = 'Profilo'

const userSubscriptionList = ref([])

const subscriptionList = ref([
  {
    id: 1,
    name: 'HALF HOUR TEN',
    type: 'HALF_AN_HOUR',
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
    type: 'HALF_AN_HOUR',
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
  userSubscriptionList.value = user.value.subscriptionList
  console.log('USER', userSubscriptionList.value)
})
</script>

<template>
  <q-page>
    <div class="column justify-center items-center bg-black q-pb-md">
      <q-avatar color="primary" size="120px" class="q-mb-md">
        <img src="../../../assets/avatar2.png">
      </q-avatar>
      <div class="text-h6 text-white column">
        <div>{{user.firstName}} {{user.lastName}}</div>
        <div class="text-caption text-primary text-center">
          {{user.email}}
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="row items-center q-gutter-sm">
        <span class="text-h6 text-white">Ultime sottoscrizioni</span>
        <q-space/>
        <q-icon name="format_list_bulleted" color="white" size="sm"></q-icon>
        <q-icon name="add" color="white" size="sm" @click="dialog = true; subscriptionSelected = false"></q-icon>
      </div>
      <q-separator dark></q-separator>
      <div class="row no-wrap q-gutter-md overflow-auto q-py-md">
        <q-card :class="sub.active ? 'subscription-card subscription-card__active' : 'subscription-card subscription-card__expired'" v-for="sub in userSubscriptionList" :key="sub.id">
          <q-card-section class="row justify-between items-end no-wrap">
            <div class="column q-gutter-xs">
              <div class="text-bold text-primary" style="font-size: 1rem">{{sub.subscriptionType.name}}</div>
              <q-img class="q-mb-xs" src="../../../assets/workout_1h.png" v-if="sub.subscriptionType.workOutDuration === 'ONE_HOUR'" style="width: 50px"></q-img>
              <q-img class="q-mb-xs" src="../../../assets/workout_half1h.png" v-if="sub.subscriptionType.workOutDuration === 'HALF_AN_HOUR'" style="width: 50px"></q-img>
              <div class="text-caption text-italic">{{date.formatDate(sub.startDate, 'DD/MM/YYYY')}}</div>
            </div>
            <div class="column justify-between items-end">
              <div class="text-primary text-h4 text-white">{{sub.reservationLeft}}</div>
              <div class="text-primary text-caption text-white">Lezioni</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!--div class="row justify-end items-center">
        <q-item tag="a" class="text-white items-center" :to="user.id + '/subscriptions'">Visualizza tutte</q-item>
        <q-btn text-color="white" label="Aggiungi" no-caps icon-right="more_time" class="bg-primary" @click="dialog = true; subscriptionSelected = false" push/>
      </div-->
    </div>

    <div class="q-pa-md">
      <div class="row items-center q-gutter-sm">
        <span class="text-h6 text-white">Ultime prenotazioni</span>
        <q-space/>
        <q-icon name="format_list_bulleted" color="white" size="sm"></q-icon>
      </div>
      <q-separator dark></q-separator>
      <div class="row no-wrap q-gutter-md overflow-auto q-py-md">
        <q-card class="booking-card" v-for="sub in userSubscriptionList" :key="sub.id">
          <em></em>
          <div class="row justify-center items-center bg-primary text-white text-h6 booking-card__header text-bold shadow-2">
            <q-space v-if="sub.active"/>
            <q-space v-if="sub.active"/>
            <div>10 AGOSTO</div>
            <q-space v-if="sub.active"/>
            <q-btn flat round dense icon="more_vert" v-if="sub.active">
              <q-menu fit transition-show="flip-right"
                       transition-hide="flip-left">
                <q-list style="min-width: 200px">
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <div class="row justify-between items-center">
                        Elimina prenotazione
                        <q-icon name="delete" size="sm" color="red"></q-icon>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <q-card-section class="column justify-center items-center">
            <div class="row justify-center items-center q-mb-sm">
              <q-img src="../../../assets/workout_1h.png" v-if="sub.subscriptionType.workOutDuration === 'ONE_HOUR'" style="width: 70px"></q-img>
              <q-img src="../../../assets/workout_half1h.png" v-if="sub.subscriptionType.workOutDuration === 'HALF_AN_HOUR'" style="width: 70px"></q-img>
            </div>
            <div class="text-secondary text-bold text-h6">10:00 - 10:30</div>
          </q-card-section>
          <!--div class="row justify-between full-width" v-if="sub.active">
            <q-btn text-color="white" label="Cancella" no-caps class="bg-red full-width" style="border-radius: 0px 0px 20px 20px"/>
          </div-->
        </q-card>
      </div>
      <!--div class="row justify-end">
        <q-item tag="a" class="text-white no-padding" :to="user.id + '/subscriptions'">Visualizza tutte</q-item>
      </div-->
    </div>

    <q-dialog v-model="dialog" position="bottom">
      <q-card class="q-pa-xs">
        <q-card-section>
          <q-item-label class="text-primary text-h6 text-bold">Seleziona l'abbonamento</q-item-label>
          <div class="row no-wrap q-gutter-md overflow-auto q-py-md">
            <q-card @click="subscriptionSelected = sub.id"
                    :class="subscriptionSelected === sub.id ? 'subscription-card subscription-card__selected shadow-2' : 'subscription-card shadow-2'"
                    v-for="sub in subscriptionList" :key="sub.id">
              <q-card-section class="row justify-between items-end">
                <div class="column q-gutter-xs">
                  <div class="text-bold text-primary" style="font-size: 1rem">{{sub.name}}</div>
                  <q-img class="q-mb-xs" src="../../../assets/workout_1h.png" v-if="sub.type === 'HOUR'" style="width: 45px"></q-img>
                  <q-img class="q-mb-xs" src="../../../assets/workout_half1h.png" v-if="sub.type === 'HALF_AN_HOUR'" style="width: 45px"></q-img>
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
  </q-page>
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
    box-shadow:0 1px 5px #0003,0 2px 2px #00000024,0 3px 1px -2px #0000001f !important;
    background: linear-gradient(300deg, #638229 0%, rgb(129, 185, 58) 58%, #638229 0%) !important;
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
.booking-card:before{left:30px;}
.booking-card:after{right:30px;}

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
.booking-card em:before{left:32px;}
.booking-card em:after{right:32px;}
</style>
