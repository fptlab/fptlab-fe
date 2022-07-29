<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from 'src/composables/useAuth'

const { signup } = useAuth()
const url = ref(require('../../assets/fptlab_logo.png'))
const confirmPassword = ref('')
const user = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})
const router = useRouter()
const isPwd = ref(true)
// eslint-disable-next-line prefer-const
let isConfPwd = ref(true)

async function doSignup () {
  await signup(user.value)
  await router.push({ path: '/login' })
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-black column no-wrap items-center content-stretch justify-center">
        <q-img :src="url" style="width: 200px" class="q-mb-lg"/>
        <q-form @submit="doSignup" class="q-gutter-y-xs">
          <q-input bg-color="white"
                   outlined
                   class="mw-input"
                   label-color="primary"
                   v-model="user.firstName"
                   label="Nome"
                   :dense="true"
                   lazy-rules
                   :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
          />
          <div class="color"></div>
          <q-input bg-color="white"
                   outlined
                   class="mw-input"
                   label-color="primary"
                   v-model="user.lastName"
                   label="Cognome"
                   lazy-rules
                   :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
                   :dense="true"/>
          <q-input bg-color="white"
                   class="mw-input"
                   outlined
                   label-color="primary"
                   v-model="user.email"
                   label="Email"
                   lazy-rules
                   :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
                   type="mail"
                   :dense="true"/>
          <q-input bg-color="white"
                   outlined label-color="primary"
                   v-model="user.password"
                   label="Password"
                   class="mw-input"
                   :dense="true"
                   lazy-rules
                   :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
                   :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon color="primary"
                      size="xs"
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
                      @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input bg-color="white"
                   outlined
                   class="mw-input"
                   label-color="primary"
                   v-model="confirmPassword"
                   label="Conferma password"
                   :dense="true"
                   lazy-rules
                   :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
                   :type="isConfPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                color="primary"
                size="xs"
                :name="isConfPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
                @click="isConfPwd = !isConfPwd"
              />
            </template>
          </q-input>
          <q-btn text-color="white" class="bg-primary full-width" push label="Registrati" type="submit"/>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
</style>
