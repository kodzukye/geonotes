<template>
  <RouterView />
</template>

<script lang="js">
import { RouterView } from 'vue-router'
import { supabase } from '@/lib/supabaseClient.js'
import { useRouter } from 'vue-router'

import { onMounted, ref } from 'vue'

const session = ref()
onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })
  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})

export default {
  components: { RouterView },
}
</script>
