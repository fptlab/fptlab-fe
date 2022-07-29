<script setup>
import useHello from 'src/composables/useHello'
import useLogin from 'src/composables/useLogin'
import { onMounted } from 'vue'

const { greeting, helloMessage } = useHello()
const { loggedUser } = useLogin()

onMounted(async () => {
  await greeting()
})

</script>

<template>
  <q-page class="flex flex-center column">
    <div>
      {{helloMessage}} <br> {{loggedUser.firstName}} {{loggedUser.lastName}}
    </div>
  </q-page>
</template>
