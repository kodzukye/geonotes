<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white-50">
    <div class="w-full max-w-md p-6 bg-white rounded-lg space-y-6">
      <form class="space-y-6" @submit.prevent="handleSignUp">
        <AuthHeading :isLoginPage="false" />
        <AuthInputs v-model:email="email" v-model:password="password" />
        <div v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</div>
        <div class="flex justify-end mt-6">
          <AuthSubmit :text="loading ? 'Inscription...' : 'S\'INSCRIRE'" :disabled="loading" />
        </div>
      </form>
      <div class="mt-4">
        <AuthRedirectLink :isLoginPage="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'
import { useRouter } from 'vue-router'
import AuthInputs from '@/components/AuthInputs.vue'
import AuthSubmit from '@/components/AuthSubmit.vue'
import AuthRedirectLink from '@/components/AuthRedirectLink.vue'
import AuthHeading from '@/components/AuthHeading.vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()

const handleSignUp = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value.trim(),
      password: password.value.trim(),
    })

    if (error) throw error

    if (data.user) {
      router.push('/explore')
    }
  } catch (error) {
    errorMessage.value = error.message
    if (error.message.includes('already registered')) {
      errorMessage.value = 'Cet email est déjà utilisé'
    }
  } finally {
    loading.value = false
  }
}
</script>
