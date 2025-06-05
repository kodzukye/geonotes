<template>
  <div class="flex flex-col h-screen relative">
    <!-- Header -->
    <div class="bg-white px-4 py-3 border-b border-gray-200 z-10">
      <AppTitle />
      <SearchBar v-model="searchQuery" @place-selected="handlePlaceSelected" />
    </div>

    <!-- Map Section -->
    <div class="flex-1 relative">
      <!-- Google Map fills this area -->
      <GoogleMap ref="googleMapRef" class="w-full h-full" />
      <!-- Floating Add Button -->
      <button
        v-show="false"
        @click="createNote"
        class="absolute right-2 bottom-50 w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-150 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </button>
    </div>

    <!-- Bottom Navigation -->
    <div class="h-20 z-10">
      <BottomNavigation v-model="selectedTab" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import AppTitle from '@/components/AppTitle.vue'
import GoogleMap from '@/components/GoogleMap.vue'
import router from '@/router'

const searchQuery = ref('')
const selectedTab = ref('explore')
const googleMapRef = ref(null)

const createNote = async () => {
  router.push('/notes/new/')
}

// Handle place selection from search bar
const handlePlaceSelected = (place) => {
  // Get place details and show on map
  if (googleMapRef.value && googleMapRef.value.showPlaceFromSearch) {
    googleMapRef.value.showPlaceFromSearch(place.place_id)
  }
}
</script>
