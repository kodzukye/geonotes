<template>
  <div class="relative w-full pl-4 pr-4">
    <div class="absolute inset-y-0 left-8 flex items-center pointer-events-none">
      <svg
        class="w-5 h-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    <!-- Regular input for non-explore pages -->
    <input
      v-if="!isExplorePage"
      type="search"
      class="w-full py-3 pl-11 pr-4 text-gray-500 border border-gray-100 rounded-full outline-none bg-white focus:ring-2 focus:ring-gray-200 shadow-sm"
      :placeholder="dynamicPlaceholder"
      v-model="searchQuery"
      @input="$emit('update:modelValue', searchQuery)"
    />

    <!-- Places Autocomplete input for explore page -->
    <input
      v-else
      ref="autocompleteInput"
      type="search"
      class="w-full py-3 pl-11 pr-4 text-gray-500 border border-gray-100 rounded-full outline-none bg-white focus:ring-2 focus:ring-gray-200 shadow-sm"
      :placeholder="dynamicPlaceholder"
      v-model="searchQuery"
      @input="handleInput"
      @focus="onInputFocus"
    />

    <!-- Autocomplete suggestions dropdown -->
    <div
      v-if="isExplorePage && showSuggestions && suggestions.length > 0"
      class="absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
    >
      <div
        v-for="(suggestion, index) in suggestions"
        :key="suggestion.place_id"
        @click="selectPlace(suggestion)"
        class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
      >
        <div class="flex items-center">
          <svg
            class="w-4 h-4 mr-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div class="flex-1">
            <div class="text-sm font-medium text-gray-900">
              {{ suggestion.structured_formatting.main_text }}
            </div>
            <div class="text-xs text-gray-500">
              {{ suggestion.structured_formatting.secondary_text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading indicator -->
    <div
      v-if="isExplorePage && isLoading"
      class="absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center"
    >
      <div class="text-sm text-gray-500">Recherche en cours...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'place-selected'])

const searchQuery = ref(props.modelValue)
const route = useRoute()
const autocompleteInput = ref(null)
const autocompleteService = ref(null)
const suggestions = ref([])
const showSuggestions = ref(false)
const searchTimeout = ref(null)
const isLoading = ref(false)
const isGoogleMapsLoaded = ref(false)

// Check if we're on the explore page
const isExplorePage = computed(() => {
  const path = route.path.toLowerCase()
  return path.includes('map') || path.includes('explore')
})

// Compute the placeholder based on current route
const dynamicPlaceholder = computed(() => {
  const path = route.path.toLowerCase()

  if (path.includes('notes')) {
    return "Recherche d'une note"
  } else if (path.includes('contacts')) {
    return "Recherche d'un contact"
  } else if (path.includes('map') || path.includes('explore')) {
    return "Recherche d'un lieu"
  } else {
    return 'Rechercher...'
  }
})

// Check if Google Maps is loaded
const checkGoogleMapsLoaded = () => {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        clearInterval(checkInterval)
        isGoogleMapsLoaded.value = true
        resolve(true)
      }
    }, 100)

    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval)
      resolve(false)
    }, 10000)
  })
}

// Initialize Google Places Autocomplete Service
const initializeAutocomplete = async () => {
  if (!isExplorePage.value) return

  await checkGoogleMapsLoaded()

  if (isGoogleMapsLoaded.value) {
    try {
      autocompleteService.value = new google.maps.places.AutocompleteService()
    } catch (error) {
      console.error('Error initializing Google Places Autocomplete:', error)
    }
  }
}

onMounted(async () => {
  await initializeAutocomplete()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
})

// Handle input focus
const onInputFocus = () => {
  if (searchQuery.value.length >= 2 && suggestions.value.length > 0) {
    showSuggestions.value = true
  }
}

// Handle input for regular search or places autocomplete
const handleInput = () => {
  emit('update:modelValue', searchQuery.value)

  if (!isExplorePage.value || !autocompleteService.value) {
    return
  }

  // Clear previous timeout
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }

  // Hide suggestions if query is too short
  if (searchQuery.value.length < 2) {
    suggestions.value = []
    showSuggestions.value = false
    isLoading.value = false
    return
  }

  // Show loading
  isLoading.value = true
  showSuggestions.value = false

  // Debounce the search
  searchTimeout.value = setTimeout(() => {
    searchPlaces()
  }, 300)
}

// Search places using Google Places Autocomplete
const searchPlaces = () => {
  if (!autocompleteService.value) {
    isLoading.value = false
    return
  }

  const request = {
    input: searchQuery.value,
    types: ['establishment', 'geocode'], // Include businesses and addresses
    componentRestrictions: { country: 'mq' }, // Restrict to Martinique
  }

  autocompleteService.value.getPlacePredictions(request, (predictions, status) => {
    isLoading.value = false

    if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
      suggestions.value = predictions
      showSuggestions.value = true
    } else {
      suggestions.value = []
      showSuggestions.value = false
    }
  })
}

// Handle place selection
const selectPlace = (place) => {
  searchQuery.value = place.description
  suggestions.value = []
  showSuggestions.value = false

  // Emit the selected place to parent component
  emit('place-selected', place)
}

// Handle click outside to close suggestions
const handleClickOutside = (event) => {
  if (autocompleteInput.value && !autocompleteInput.value.parentElement.contains(event.target)) {
    showSuggestions.value = false
  }
}

// Watch for route changes to reset autocomplete and reinitialize if needed
watch(
  () => route.path,
  async () => {
    suggestions.value = []
    showSuggestions.value = false
    searchQuery.value = ''

    // Reinitialize autocomplete if moving to explore page
    if (isExplorePage.value && !autocompleteService.value) {
      await nextTick()
      await initializeAutocomplete()
    }
  },
)

// Watch for Google Maps API loading
watch(isGoogleMapsLoaded, (loaded) => {
  if (loaded && isExplorePage.value && !autocompleteService.value) {
    initializeAutocomplete()
  }
})
</script>
