<template>
  <div class="bg-white rounded-2xl w-full overflow-hidden">
    <!-- Header with close button -->
    <div class="relative text-black w-full p-2">
      <div class="pr-8">
        <h2 class="text-base font-bold w-full">{{ place.name }}</h2>
        <p class="text-gray italic text-sm">{{ place.formatted_address }}</p>
      </div>
    </div>

    <!-- Place Information -->
    <div class="p-2 pt-0 space-y-3">
      <!-- Contact Info -->
      <div v-if="place.formatted_phone_number || place.website" class="space-y-2">
        <div v-if="place.formatted_phone_number" class="flex items-center text-gray-700">
          <svg
            class="w-4 h-4 mr-3 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>

          <span class="text-sm">{{ place.formatted_phone_number }}</span>
        </div>

        <div v-if="place.website" class="flex items-center text-gray-700">
          <svg
            class="w-4 h-4 mr-3 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>

          <a
            :href="place.website"
            target="_blank"
            class="text-sm text-blue-600 hover:text-blue-800 truncate"
          >
            {{ formatWebsite(place.website) }}
          </a>
        </div>
      </div>

      <!-- Create Note Button -->
      <button
        @click="$emit('create-note')"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Créer une nouvelle note ici
      </button>

      <!-- Recent Notes Section -->
      <div v-if="notes.length > 0" class="border-t border-gray-100 pt-4">
        <h3 class="font-semibold text-gray-800 mb-3 flex items-center">
          <svg
            class="w-4 h-4 mr-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Mes notes récentes ({{ notes.length }} note{{ notes.length > 1 ? 's' : '' }})
        </h3>

        <ul class="space-y-2 max-h-32 overflow-y-auto">
          <li v-for="note in displayedNotes" :key="note.id" class="text-sm">
            <div class="flex justify-between items-start">
              <span class="text-gray-700 truncate flex-1">{{ note.title }}</span>
              <span class="text-gray-400 text-xs ml-2 whitespace-nowrap">
                {{ formatTimeAgo(note.created_at) }}
              </span>
            </div>
          </li>
          <li v-if="notes.length > 3">
            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Voir plus...
            </button>
          </li>
        </ul>
      </div>

      <!-- Linked Contacts Section -->
      <div v-if="contacts.length > 0" class="border-t border-gray-100 pt-4">
        <h3 class="font-semibold text-gray-800 mb-3 flex items-center">
          <svg
            class="w-4 h-4 mr-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Mes contacts liés ({{ contacts.length }} contact{{ contacts.length > 1 ? 's' : '' }})
        </h3>

        <ul class="space-y-2">
          <li v-for="contact in contacts" :key="contact.id" class="flex items-center">
            <div
              class="w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-medium flex items-center justify-center mr-3"
            >
              {{ getInitials(contact.full_name) }}
            </div>
            <span class="text-gray-700 text-sm">{{ contact.full_name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  place: {
    type: Object,
    required: true,
  },
  notes: {
    type: Array,
    default: () => [],
  },
  contacts: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['create-note', 'close'])

const displayedNotes = computed(() => {
  return props.notes.slice(0, 3)
})

const formatWebsite = (url) => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))

  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
  } else if (diffInMinutes < 43200) {
    const days = Math.floor(diffInMinutes / 1440)
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`
  } else {
    const months = Math.floor(diffInMinutes / 43200)
    return `Il y a ${months} mois`
  }
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>
