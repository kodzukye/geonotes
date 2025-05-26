<template>
  <h1>Interactive Map</h1>
  <SearchBar />
  <!-- Floating Add Button -->
  <div class="absolute bottom-20 right-4 pb-4">
    <button
      @click="createNote"
      class="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-150"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    </button>
  </div>
  <BottomNavigation v-model="selectedTab" />
</template>

<script>
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import router from '@/router'

const selectedTab = ref('explore')

export default {
  name: 'InteractiveMap',
  components: {
    SearchBar,
    BottomNavigation,
  },
  setup() {
    const createNote = async () => {
      console.log('Create new note')
      router.push('/notes/new/') // Redirect to create contact page
    }

    return {
      createNote,
    }
  },
  data() {
    return {
      selectedTab: 'explore', // Set default to match the current view
    }
  },
}
</script>
