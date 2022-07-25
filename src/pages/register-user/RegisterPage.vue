<script setup>
import { ref } from 'vue'
import useLogin from 'src/composables/useLogin'
import { useRouter } from 'vue-router'

const { register } = useLogin()
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
const isConfPwd = ref(true)

async function doRegister () {
  console.log('user', user.value)
  await register(user.value)
  router.push({ path: '/login' })
}
</script>

<template>
  <q-layout view="hHh lpR fFf" class="login-background">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column items-center q-gutter-y-lg">
          <q-img :src="url" style="width: 200px"/>
          <q-form
            @submit="doRegister"
            class="q-gutter-xs">
            <q-input bg-color="white" rounded outlined color="green" v-model="user.firstName" label="Nome" :dense="true" lazy-rules :rules="[ val => val && val.length > 0 || 'Inserisci un nome valido']">
              <template v-slot:append>
                <q-icon name="man" color="green"/>
              </template>
            </q-input>
            <q-input bg-color="white" rounded outlined color="green" v-model="user.lastName" label="Cognome" :dense="true" lazy-rules :rules="[ val => val && val.length > 0 || 'Inserisci un cognome valido']">
              <template v-slot:append>
                <q-icon name="man" color="green"/>
              </template>
            </q-input>
            <q-input bg-color="white" rounded outlined color="green" v-model="user.email" label="Email" type="mail" :dense="true" lazy-rules :rules="[ val => val && val.length > 0 || 'Inserisci una mail valida']">
              <template v-slot:append>
                <q-icon name="mail" color="green"/>
              </template>
            </q-input>
            <q-input bg-color="white" rounded outlined color="green" v-model="user.password" label="Password" :dense="true" :type="isPwd ? 'password' : 'text'" lazy-rules :rules="[ val => val && val.length > 0 || 'Inserisci una password valida']">
              <template v-slot:append>
                <q-icon
                  color="green"
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input bg-color="white" rounded outlined color="green" v-model="confirmPassword" label="Conferma password" :dense="true" :type="isConfPwd ? 'password' : 'text'" lazy-rules :rules="[ val => val && val === user.password || 'Le password non coincidono']">
              <template v-slot:append>
                <q-icon
                  color="green"
                  :name="isConfPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isConfPwd = !isConfPwd"
                />
              </template>
            </q-input>
            <div class="row justify-center q-mt-lg">
              <q-btn rounded text-color="white" style="background: #81b93a" label="Registrati" type="submit"/>
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<style scoped lang="scss">

.login-background {
  background-image: url("../../assets/fptlab_background.png");
}

</style>
