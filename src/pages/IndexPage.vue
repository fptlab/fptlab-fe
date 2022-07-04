<script setup>
import useHello from 'src/composables/useHello'
import { onMounted } from 'vue'

const { greeting, helloMessage } = useHello()

onMounted(async () => {
  await greeting() // una volta fatta sta chiamata avrai helloMessage definito dentro il composable accessibile da tutti i componenti perchè dichiarato fuori dalla funzione
})

</script>

<template>
  <q-page class="flex flex-center column">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <div>
      {{helloMessage}}
    </div>
  </q-page>
</template>
