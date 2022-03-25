<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
// example from HelloWorld.vue 
defineProps<{ msg: string }>()

export default {
  async setup() {
    return {
      msg: 'About'
    }
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
