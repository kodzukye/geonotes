import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  // Initialize auth state and listen for changes
  const initializeAuth = async () => {
    // Check existing session
    const {
      data: { session },
    } = await supabase.auth.getSession()
    user.value = session?.user || null

    // Set up auth state listener
    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null
    })
  }

  const isLoggedIn = () => !!user.value

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    this.user = null
  }

  return {
    user,
    initializeAuth,
    isLoggedIn,
    logout,
  }
})
