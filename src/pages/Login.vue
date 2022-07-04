<template>
  <q-layout view="hHh lpR fFf" class="login-background">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column items-center q-gutter-y-lg">
          <q-img :src="url" style="width: 200px"/>
          <div class="column q-gutter-y-md">
            <q-input color="green" dark v-model="email" label="Nome utente" :dense="false">
              <template v-slot:prepend>
                <q-icon name="man" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="email = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input color="green" dark v-model="password" label="Password" :dense="false" type="password">
              <template v-slot:prepend>
                <q-icon name="password" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="password = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <q-btn flat style="color: #81b93a" label="Login" @click="doLogin()"/>
          </div>
        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import useLogin from 'src/composables/useLogin'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  setup () {
    const { login } = useLogin()
    const url = ref(require('../assets/fptlab_logo.png'))
    const email = ref('')
    const password = ref('')

    async function doLogin () {
      await login({
        email: email.value,
        password: password.value
      })
    }

    return {
      url,
      email,
      password,
      doLogin
    }
  }
}
</script>

<style scoped lang="scss">

.login-background {
  background-image: url("../assets/fptlab_background.png");
}

</style>
