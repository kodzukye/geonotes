<script setup>
import { ref } from 'vue'
import AuthInputs from '@/components/AuthInputs.vue'
import AuthOptions from '@/components/AuthOptions.vue'
import AuthSubmit from '@/components/AuthSubmit.vue'
import AuthRedirectLink from '@/components/AuthRedirectLink.vue'
import AuthHeading from '@/components/AuthHeading.vue'
import { supabase } from '@/lib/supabaseClient.js'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  loading.value = false
  if (error) {
    errorMessage.value = error.message
  } else if (data.session) {
    router.push('/explore') // Redirect
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white-50">
    <div class="w-full max-w-md p-6 bg-white rounded-lg space-y-6">
      <form class="space-y-6" @submit.prevent="handleLogin">
        <AuthHeading :isLoginPage="true" />
        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>
        <AuthInputs v-model:email="email" v-model:password="password" />
        <AuthOptions class="mb-4" />
        <div class="flex justify-end mt-6">
          <AuthSubmit :text="loading ? 'Connexion...' : 'SE CONNECTER'" :disabled="loading" />
        </div>
      </form>
      <div class="mt-4">
        <AuthRedirectLink :isLoginPage="true" />
      </div>
    </div>
  </div>
</template>
