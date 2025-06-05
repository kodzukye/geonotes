<template>
  <main>
    <AppDesciption />
    <HowDoesItWork />
  </main>
</template>

<script>
import HowDoesItWork from '@/components/HowDoesItWork.vue'
import AppDesciption from '@/components/AppDesciption.vue'

export default {
  name: 'HomeView',
  components: {
    HowDoesItWork,
    AppDesciption,
  },
}
</script>
