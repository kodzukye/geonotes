<template>
  <h1>Account</h1>

  <form @submit.prevent="signOut" class="relative">
    <SignOutButton class="absolute top-4 right-4" />
  </form>
  <BottomNavigation v-model="selectedTab" />
</template>

<script>
import { ref } from 'vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import { supabase } from '@/lib/supabaseClient.js'
import SignOutButton from '@/components/SignOutButton.vue'

const selectedTab = ref('compte')

export default {
  name: 'InteractiveMap',
  components: {
    BottomNavigation,
    SignOutButton,
  },
  data() {
    return {
      selectedTab: 'compte', // Set default to match the current view
    }
  },
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error.message)
  } else {
    console.log('User signed out successfully')
    this.$router.push('/login')
  }
}
</script>
