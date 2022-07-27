<script setup>
import useHello from 'src/composables/useHello'
import useLogin from 'src/composables/useLogin'
import { onMounted } from 'vue'

const { greeting, helloMessage } = useHello()
const { loggedUser } = useLogin()

onMounted(async () => {
  await greeting() // una volta fatta sta chiamata avrai helloMessage definito dentro il composable accessibile da tutti i componenti perchè dichiarato fuori dalla funzione
})

</script>

<template>
  <q-page class="flex flex-center column">
    <div>
      {{helloMessage}} <br> {{loggedUser.firstName}} {{loggedUser.lastName}}
    </div>
  </q-page>
</template>
