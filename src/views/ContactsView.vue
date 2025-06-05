<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white px-4 py-3 border-b border-gray-200">
      <SearchBar placeholder="Rechercher un contact" />
    </div>

    <!-- Contacts List -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="loading" class="flex justify-center items-center h-32">
        <div class="text-gray-500">Chargement...</div>
      </div>

      <div v-else-if="filteredContacts.length === 0" class="flex justify-center items-center h-32">
        <div class="text-gray-500">Aucun contact trouvé</div>
      </div>

      <div v-else class="divide-y divide-gray-200">
        <div
          v-for="contact in filteredContacts"
          :key="contact.id"
          class="bg-white px-4 py-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center justify-between"
          @click="goToEditContact(contact.id)"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                :src="contact.avatar || 'https://via.placeholder.com/40'"
                alt=""
              />
            </div>
            <div class="ml-4">
              <h3 class="text-base font-medium text-gray-900">
                {{ contact.full_name }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ contact.email }}
              </p>
              <p class="text-sm text-gray-500">
                {{ contact.phone }}
              </p>
              <div class="mt-1 flex space-x-2">
                <span
                  v-for="tag in contact.tags"
                  :key="tag"
                  class="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
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
    <div class="absolute bottom-20 right-4 pb-4">
      <button
        @click="createContact"
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
import { supabase } from '@/lib/supabaseClient.js'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'ContactsView',
  components: {
    SearchBar,
    BottomNavigation,
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const selectedTab = ref('contact')
    const contacts = ref([])
    const loading = ref(true)
    const searchQuery = ref('')

    const filteredContacts = computed(() => {
      if (!searchQuery.value) {
        return contacts.value
      }
      return contacts.value.filter(
        (contact) =>
          contact.full_name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          contact.phone?.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    })

    const fetchContacts = async () => {
      try {
        loading.value = true

        // Only fetch contacts for the current user
        const { data, error } = await supabase
          .from('contacts')
          .select('*')
          .eq('user_id', authStore.user.id) // Add this filter
          .order('created_at', { ascending: false })

        if (error) throw error

        contacts.value = data || []
      } catch (error) {
        console.error('Error fetching contacts:', error)
      } finally {
        loading.value = false
      }
    }

    const createContact = async () => {
      router.push('/contacts/new/')
    }

    function goToEditContact(contactId) {
      router.push({ name: 'edit-contact', params: { id: contactId } })
    }

    onMounted(() => {
      if (authStore.user) {
        fetchContacts()
      }
    })

    return {
      selectedTab,
      contacts,
      loading,
      searchQuery,
      filteredContacts,
      fetchContacts,
      createContact,
      goToEditContact,
    }
  },
}
</script>
