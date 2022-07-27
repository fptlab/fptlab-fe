<script setup>
import { ref } from 'vue'
import useLogin from 'src/composables/useLogin'
import { useRouter } from 'vue-router'

const { login } = useLogin()
const url = ref(require('../assets/fptlab_logo.png'))
const email = ref('')
const password = ref('')
const isPwd = ref(true)
const router = useRouter()

async function doLogin () {
  await login({
    email: email.value,
    password: password.value
  })
  router.push({ path: '/' })
}
</script>

<template>
  <q-layout view="hHh lpR fFf" class="login-background">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column items-center q-gutter-y-lg">
          <q-img :src="url" style="width: 200px"/>
          <div class="column q-gutter-y-md">
            <q-input bg-color="white" outlined color="green" v-model="email" label="Nome utente" :dense="true">
              <template v-slot:append>
                <q-icon name="man" color="green"/>
              </template>
            </q-input>
            <q-input bg-color="white" color="green" outlined :type="isPwd ? 'password' : 'text'" v-model="password" label="Password" :dense="true">
              <template v-slot:append>
                <q-icon
                  color="green"
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn rounded text-color="white" style="background: #81b93a" label="Login" @click="doLogin()"/>
          </div>
          <div>
            <q-item class="text-white">Non hai un account?<q-item class="text-bold no-padding q-ml-sm" style="color: #81b93a" tag="a" to="/register">Registrati</q-item></q-item>
          </div>
        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<style scoped lang="scss">

.login-background {
  background-image: url("../assets/fptlab_background.png");
}

</style>
