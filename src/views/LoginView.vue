<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white-50">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-6">
      <form class="space-y-6">
        <AuthHeading :isLoginPage="true" />
        <AuthInputs />
        <AuthOptions class="mb-4" />
        <div class="flex justify-end mt-6">
          <AuthSubmit text="SE CONNECTER" />
        </div>
      </form>
      <div class="mt-4">
        <AuthRedirectLink :isLoginPage="true" />
      </div>
    </div>
  </div>
</template>

<script>
import AuthInputs from '@/components/AuthInputs.vue'
import AuthOptions from '@/components/AuthOptions.vue'
import AuthSubmit from '@/components/AuthSubmit.vue'
import AuthRedirectLink from '@/components/AuthRedirectLink.vue'
import AuthHeading from '@/components/AuthHeading.vue'

export default {
  name: 'LoginView',
  components: {
    AuthInputs,
    AuthOptions,
    AuthSubmit,
    AuthRedirectLink,
    AuthHeading,
  },
}
</script>

<style>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
</style>
