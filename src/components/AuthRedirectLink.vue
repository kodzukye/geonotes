<template>
  <div class="text-center pt-10">
    <span class="text-gray-800 text-base font-normal">{{ staticText }}</span>
    <router-link
      :to="linkDestination"
      class="ml-1 text-indigo-500 hover:text-indigo-700 font-medium text-base transition-colors"
    >
      {{ linkText }}
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  isLoginPage: {
    type: Boolean,
    required: true,
  },
})

const staticText = computed(() => {
  return props.isLoginPage ? 'Vous n’avez pas de compte ?' : 'Vous avez déjà un compte ?'
})

const linkText = computed(() => {
  return props.isLoginPage ? 'S’inscrire' : 'Se connecter'
})

const linkDestination = computed(() => {
  return props.isLoginPage ? '/register' : '/login'
})
</script>
