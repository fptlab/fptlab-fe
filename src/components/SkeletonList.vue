<script setup>
</script>

<template>
  <q-item style="max-width: 300px" v-for="n in 8" :key="n">
    <q-item-section avatar>
      <q-skeleton type="QAvatar" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        <q-skeleton type="text" />
      </q-item-label>
      <q-item-label caption>
        <q-skeleton type="text" width="65%" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>
