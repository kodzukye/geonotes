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
    <input
      type="search"
      class="w-full py-3 pl-11 pr-4 text-gray-500 border border-gray-100 rounded-full outline-none bg-white focus:ring-2 focus:ring-gray-200 shadow-sm"
      :placeholder="dynamicPlaceholder"
      v-model="searchQuery"
      @input="$emit('update:modelValue', searchQuery)"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])

const searchQuery = ref(props.modelValue)
const route = useRoute()

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
</script>
