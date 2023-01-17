<script setup>
import { ref } from 'vue'
import useLogin from 'src/composables/useLogin'
import { useRouter } from 'vue-router'
import useAuth from 'src/composables/useAuth'

const { login } = useLogin()
const url = ref(require('../assets/pt-main-logo.png'))
const googleIcon = ref(require('../assets/google-icon.png'))
const fbIcon = ref(require('../assets/fb-icon.png'))
const email = ref('admin@gmail.com')
const password = ref('admin')
const isPwd = ref(true)
const isConfPwd = ref(true)
const router = useRouter()
const section = ref('WB')

async function doLogin () {
  await login({
    email: email.value,
    password: password.value
  })
  await router.push({ path: '/' })
}

/* REGISTRATION */
const { signup } = useAuth()
const confirmPassword = ref('')
const user = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})
async function doSignup () {
  await signup(user.value)
  await router.push({ path: '/login' })
}
</script>

<template>
  <q-layout class="bg-primary">
    <q-page-container>
      <q-page class="column no-wrap q-pa-sm ">
        <div style="flex: 30" class="justify-center column">
          <q-img :src="url" class="self-center"/>
        </div>
        <q-card style="flex: 70; display: grid" class="main-card bg-main-secondary">
          <q-card-section class="column justify-between" v-if="section === 'WB'">
            <div class="column justify-center q-gutter-md">
              <div>
                <div class="text-h4 text-bold">Benvenuto</div>
                <div class="text-body2">Inizia il tuo percorso in maniera professionale</div>
              </div>
              <div>
                <q-btn label="Crea un nuovo account" class="full-width bg-secondary text-bold" push @click="section = 'REGISTER'"/>
              </div>
              <div>
                <q-btn text-color="white" label="Log in" class="full-width bg-primary text-bold" push @click="section= 'LOGIN'"/>
              </div>
            </div>
            <div class="text-center">
              <div class="row justify-between content-stretch items-stretch full-width">
                <div style="border-top: 1px solid #6B6B6B;" class="col"></div>
                <div class="col" style="margin: -9px -50px;">Or</div>
                <div style="border-top: 1px solid #6B6B6B;" class="col"></div>
              </div>
              <div class="row justify-between q-mb-lg q-mt-md">
                <q-btn style="width: 130px" no-caps rounded class="bg-secondary">
                  <div class="row justify-between full-width content-center items-center q-py-xs">
                    <div>
                      <q-img left :src="googleIcon" width="25px"/>
                    </div>
                    <div class="text-body2">Sign in</div>
                  </div>
                </q-btn>
                <q-btn style="width: 130px" no-caps rounded class="bg-secondary">
                  <div class="row justify-between full-width content-center items-center q-py-xs">
                    <div>
                      <q-img left :src="fbIcon" width="25px"/>
                    </div>
                    <div class="text-body2">Sign in</div>
                  </div>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="section === 'LOGIN'" class="column justify-between">
            <q-form @submit="doLogin" class="q-gutter-y-xs">
              <div class="rounded-input">
                <q-item-label class="text-body2 text-bold q-mb-xs">Username</q-item-label>
                <q-input bg-color="white"
                         outlined
                         label-color="primary"
                         v-model="email"
                         lazy-rules
                         :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
                         :dense="true">
                  <template v-slot:append>
                    <q-icon name="mail" size="xs" color="primary"/>
                  </template>
                </q-input>
                <q-item-label class="text-body2 text-bold q-mb-xs">Password</q-item-label>
                <q-input bg-color="white"
                         label-color="primary"
                         outlined
                         :type="isPwd ? 'password' : 'text'"
                         v-model="password"
                         lazy-rules
                         :rules="[ val => val && val.length > 0 || 'Campo obbligatorio!']"
                         :dense="true">
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
              </div>
              <q-btn label="Login" text-color="white" class="full-width bg-primary text-bold" type="submit" push/>
              <div class="full-width q-gutter-x-sm q-mt-md text-body">
                <span>Non hai un account?</span>
                <span class="text-bold text-primary" @click="section = 'REGISTER'">Registrati!</span>
              </div>
            </q-form>
            <div class="text-center">
              <div class="row justify-between content-stretch items-stretch full-width">
                <div style="border-top: 1px solid #6B6B6B;" class="col"></div>
                <div class="col" style="margin: -9px -50px;">Or</div>
                <div style="border-top: 1px solid #6B6B6B;" class="col"></div>
              </div>
              <div class="row justify-between q-mb-lg q-mt-md">
                <q-btn style="width: 130px" no-caps rounded class="bg-secondary">
                  <div class="row justify-between full-width content-center items-center q-py-xs">
                    <div>
                      <q-img left :src="googleIcon" width="25px"/>
                    </div>
                    <div class="text-body2">Sign in</div>
                  </div>
                </q-btn>
                <q-btn style="width: 130px" no-caps rounded class="bg-secondary">
                  <div class="row justify-between full-width content-center items-center q-py-xs">
                    <div>
                      <q-img left :src="fbIcon" width="25px"/>
                    </div>
                    <div class="text-body2">Sign in</div>
                  </div>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="section === 'REGISTER'" class="column justify-between">
            <q-form @submit="doSignup" class="q-gutter-y-xs">
              <div class="rounded-input">
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
              </div>
              <q-btn class="full-width bg-secondary text-bold" push label="Registrati" type="submit"/>
              <div class="full-width q-gutter-x-sm q-mt-md text-body">
                <span>Hai gia un account?</span>
                <span class="text-bold text-primary" @click="section = 'LOGIN'">Log in</span>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
  .login-background {
    background-image: url("../assets/fptlab_background.png");
  }
</style>
