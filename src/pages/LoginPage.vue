<script setup>
import { ref } from 'vue'
import useLogin from 'src/composables/useLogin'
import { useRouter } from 'vue-router'

const { login } = useLogin()
const url = ref(require('../assets/fptlab_logo.png'))
const email = ref('admin@gmail.com')
const password = ref('admin')
const isPwd = ref(true)
const router = useRouter()

async function doLogin () {
  await login({
    email: email.value,
    password: password.value
  })
  await router.push({ path: '/' })
}
</script>

<template>
  <q-layout class="fpt-bg-gradient">
    <q-page-container>
      <q-page class="column no-wrap items-center content-stretch justify-center">
          <q-img :src="url" style="width: 200px" class="q-mb-lg"/>
          <q-form @submit="doLogin" class="q-gutter-y-xs">
            <q-input bg-color="white"
                     outlined
                     class="mw-input"
                     label-color="primary"
                     v-model="email"
                     label="Username"
                     lazy-rules
                     :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
                     :dense="true">
              <template v-slot:append>
                <q-icon name="mail" size="xs" color="primary"/>
              </template>
            </q-input>
            <q-input bg-color="white"
                     label-color="primary"
                     class="mw-input"
                     outlined :type="isPwd ? 'password' : 'text'"
                     v-model="password"
                     lazy-rules
                     :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
                     label="Password" :dense="true">
              <template v-slot:append>
                <q-icon
                  color="primary"
                  size="xs"
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn text-color="white" label="Login" class="full-width bg-primary" type="submit" push/>
            <div class="full-width text-center q-gutter-x-sm q-mt-md">
              <span class="text-white">Non hai un account?</span>
              <span class="text-bold text-primary cursor-pointer" style="font-size: 1.05rem" @click="router.push('/register')">Registrati!</span>
            </div>
          </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
  .login-background {
    background-image: url("../assets/fptlab_background.png");
  }
</style>
