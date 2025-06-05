<template>
  <div class="relative h-screen">
    <h1 class="p-4">Account</h1>

    <SignOutButton @click="handleSignOut" class="absolute top-4 right-4" />

    <BottomNavigation v-model="selectedTab" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BottomNavigation from '@/components/BottomNavigation.vue'
import SignOutButton from '@/components/SignOutButton.vue'

const selectedTab = ref('compte')
const router = useRouter()
const authStore = useAuthStore()

const handleSignOut = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error.message)
    // Optionally show error to user
  }
}
</script>
