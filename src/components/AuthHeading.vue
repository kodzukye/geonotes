<template>
  <div class="text-left pb-10">
    <h1 class="text-4xl font-bold text-black mb-1 sm:mb-2">
      {{ mainTitle }}
    </h1>
    <p class="text-lg text-indigo-400">
      {{ subTitle }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * Determines if the component is for a login page or a sign-up page.
   * true: Displays "Se connecter" and its corresponding subtitle.
   * false: Displays "S'inscrire" and its corresponding subtitle.
   */
  isLoginPage: {
    type: Boolean,
    required: true,
  },
})

const mainTitle = computed(() => {
  return props.isLoginPage ? 'Se connecter' : "S'inscrire"
})

const subTitle = computed(() => {
  return props.isLoginPage
    ? 'Veuillez vous connecter pour continuer.'
    : 'Créez un compte pour commencer.'
})
</script>
