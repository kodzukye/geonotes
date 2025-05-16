<template>
  <main>
    <h1>Hi Home page</h1>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/register">Register</RouterLink>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
    RouterLink,
  },
}
</script>
