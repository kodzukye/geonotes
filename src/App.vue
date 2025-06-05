<template>
  <RouterView />
</template>

<script lang="js">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

onMounted(() => {
  const authStore = useAuthStore()
  authStore.initializeAuth()
})

export default {
  components: { RouterView },
}
</script>
