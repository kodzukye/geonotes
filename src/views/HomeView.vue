<template>
  <main>
    <AppDesciption />
    <HowDoesItWork />
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'
import HowDoesItWork from '@/components/HowDoesItWork.vue'
import AppDesciption from '@/components/AppDesciption.vue'

export default {
  name: 'HomeView',
  components: {
    RouterLink,
    HowDoesItWork,
    AppDesciption,
  },
}
</script>
