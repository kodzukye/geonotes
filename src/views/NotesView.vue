<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white px-4 py-3 border-b border-gray-200">
      <AppTitle />
      <SearchBar />
    </div>

    <!-- Filter/Sort Section -->
    <div class="bg-white px-4 py-2 border-b border-gray-200 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
          ></path>
        </svg>
        <span class="text-sm text-gray-600">Récent</span>
      </div>
      <div class="flex items-center">
        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          ></path>
        </svg>
      </div>
    </div>

    <!-- Notes List -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="loading" class="flex justify-center items-center h-32">
        <div class="text-gray-500">Chargement...</div>
      </div>

      <div v-else-if="filteredNotes.length === 0" class="flex justify-center items-center h-32">
        <div class="text-gray-500">Aucune note trouvée</div>
      </div>

      <div v-else class="divide-y divide-gray-200">
        <div
          v-for="note in filteredNotes"
          :key="note.id"
          class="bg-white px-4 py-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-start justify-between"
          @click="openNote(note)"
        >
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-medium text-gray-900 truncate">
              {{ note.title || 'Sans titre' }}
            </h3>
            <p class="text-sm text-gray-500 mt-1 line-clamp-2">
              {{ note.content || 'Supporting line text lorem ipsum dolor sit amet, consectetur.' }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Add Button -->
    <div v-show="false" class="absolute bottom-20 right-4 pb-4">
      <button
        @click="createNote"
        class="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-150"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      </button>
    </div>

    <BottomNavigation v-model="selectedTab" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import AppTitle from '@/components/AppTitle.vue'
import { supabase } from '@/lib/supabaseClient.js'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'NotesView',
  components: {
    SearchBar,
    BottomNavigation,
    AppTitle,
  },
  setup() {
    const authStore = useAuthStore()
    const selectedTab = ref('note')
    const notes = ref([])
    const loading = ref(true)
    const searchQuery = ref('')

    const filteredNotes = computed(() => {
      if (!searchQuery.value) {
        return notes.value
      }
      return notes.value.filter(
        (note) =>
          note.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    })

    const fetchNotes = async () => {
      try {
        loading.value = true

        // Only fetch notes for the current user
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('user_id', authStore.user.id) // Add this filter
          .order('created_at', { ascending: false })

        if (error) throw error

        notes.value = data || []
      } catch (error) {
        console.error('Error fetching notes:', error)
      } finally {
        loading.value = false
      }
    }

    const createNote = async () => {
      router.push('/notes/new/')
    }

    const openNote = (note) => {
      router.push(`/notes/edit/${note.id}`)
    }

    onMounted(() => {
      if (authStore.user) {
        fetchNotes()
      }
    })

    return {
      selectedTab,
      notes,
      loading,
      searchQuery,
      filteredNotes,
      fetchNotes,
      createNote,
      openNote,
    }
  },
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
