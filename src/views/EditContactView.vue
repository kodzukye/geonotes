<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
      <button @click="goBack" class="mr-3 p-2 rounded-full hover:bg-gray-100">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 class="text-xl font-semibold text-gray-800">Modifier Contact</h1>
    </div>

    <!-- Form Content -->
    <div class="flex-1 overflow-y-auto p-4">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Contact Information -->
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="text-lg font-medium text-gray-800 mb-4">Informations du contact</h2>

          <!-- Full Name -->
          <div class="mb-4">
            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              id="fullName"
              v-model="contact.full_name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entrez le nom complet"
            />
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email </label>
            <input
              id="email"
              v-model="contact.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="exemple@email.com"
            />
          </div>

          <!-- Phone -->
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              id="phone"
              v-model="contact.phone"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+596 696 12 34 56"
            />
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              v-model="contact.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Notes ou description du contact..."
            ></textarea>
          </div>
        </div>

        <!-- Tags Section (same as NewContactView) -->
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="text-lg font-medium text-gray-800 mb-4">Tags</h2>

          <!-- Selected Tags Display -->
          <div v-if="selectedTags.length > 0" class="mb-4">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in selectedTags"
                :key="tag.id"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {{ tag.name }}
                <button
                  @click="removeTag(tag)"
                  type="button"
                  class="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <!-- Tag Input -->
          <div class="relative">
            <input
              v-model="tagInput"
              @input="searchTags"
              @keydown.enter.prevent="addTag"
              @keydown.escape="clearTagSearch"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rechercher ou créer un tag..."
            />

            <!-- Tag Suggestions -->
            <div
              v-if="showSuggestions && (filteredTags.length > 0 || tagInput.trim())"
              class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto"
            >
              <!-- Existing Tags -->
              <div
                v-for="tag in filteredTags"
                :key="tag.id"
                @click="selectExistingTag(tag)"
                class="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  {{ tag.name }}
                </div>
              </div>

              <!-- Create New Tag Option -->
              <div
                v-if="tagInput.trim() && !tagExists"
                @click="createNewTag"
                class="px-3 py-2 hover:bg-blue-50 cursor-pointer text-blue-600 border-t border-gray-100"
              >
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Créer "{{ tagInput.trim() }}"
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-800 text-sm">{{ errorMessage }}</p>
        </div>

        <!-- Submit Button -->
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <button
            type="submit"
            :disabled="loading || !contact.full_name.trim()"
            class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {{ loading ? 'Sauvegarde en cours...' : 'Sauvegarder les modifications' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Form data
const contact = ref({
  id: '',
  full_name: '',
  email: '',
  phone: '',
  description: '',
})

// Tags data
const selectedTags = ref([])
const availableTags = ref([])
const tagInput = ref('')
const showSuggestions = ref(false)
const loading = ref(false)
const errorMessage = ref('')

// Computed properties
const filteredTags = computed(() => {
  if (!tagInput.value.trim()) return availableTags.value
  const searchTerm = tagInput.value.toLowerCase().trim()
  return availableTags.value.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm) &&
      !selectedTags.value.some((selectedTag) => selectedTag.id === tag.id),
  )
})

const tagExists = computed(() => {
  const searchTerm = tagInput.value.toLowerCase().trim()
  return availableTags.value.some((tag) => tag.name.toLowerCase() === searchTerm)
})

// Tag functions
const searchTags = () => {
  showSuggestions.value = tagInput.value.trim().length > 0
}

const selectExistingTag = (tag) => {
  if (!selectedTags.value.some((t) => t.id === tag.id)) {
    selectedTags.value.push(tag)
  }
  tagInput.value = ''
  showSuggestions.value = false
}

const createNewTag = async () => {
  const tagName = tagInput.value.trim()
  if (!tagName) return

  try {
    // Check if tag already exists
    const { data: existingTag } = await supabase
      .from('tags')
      .select('id, name')
      .eq('name', tagName)
      .single()

    if (existingTag) {
      selectExistingTag(existingTag)
      return
    }

    // Create new tag
    const { data, error } = await supabase
      .from('tags')
      .insert({ name: tagName })
      .select('id, name')
      .single()

    if (error) throw error

    availableTags.value.push(data)
    selectedTags.value.push(data)
    tagInput.value = ''
    showSuggestions.value = false
  } catch (error) {
    console.error('Error creating tag:', error)
    errorMessage.value = 'Erreur lors de la création du tag'
  }
}

const addTag = () => {
  if (filteredTags.value.length > 0) {
    selectExistingTag(filteredTags.value[0])
  } else if (tagInput.value.trim() && !tagExists.value) {
    createNewTag()
  }
}

const removeTag = (tagToRemove) => {
  selectedTags.value = selectedTags.value.filter((tag) => tag.id !== tagToRemove.id)
}

const clearTagSearch = () => {
  tagInput.value = ''
  showSuggestions.value = false
}

// Fetch contact data
const fetchContact = async () => {
  try {
    loading.value = true
    const { data: contactData, error } = await supabase
      .from('contacts')
      .select('*, contacts_tags(tags(*))')
      .eq('id', route.params.id)
      .single()

    if (error) throw error

    contact.value = {
      id: contactData.id,
      full_name: contactData.full_name,
      email: contactData.email,
      phone: contactData.phone,
      description: contactData.description,
    }

    selectedTags.value = contactData.contacts_tags.map((ct) => ct.tags)
  } catch (error) {
    console.error('Error fetching contact:', error)
    errorMessage.value = 'Erreur lors du chargement du contact'
    router.push('/contacts')
  } finally {
    loading.value = false
  }
}

const loadTags = async () => {
  try {
    const { data, error } = await supabase.from('tags').select('id, name').order('name')

    if (error) throw error
    availableTags.value = data || []
  } catch (error) {
    console.error('Error loading tags:', error)
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (!contact.value.full_name.trim()) {
    errorMessage.value = 'Le nom complet est requis'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    // Update contact
    const { error: updateError } = await supabase
      .from('contacts')
      .update({
        full_name: contact.value.full_name.trim(),
        email: (contact.value.email ?? '').trim() || null,
        phone: (contact.value.phone ?? '').trim() || null,
        description: (contact.value.description ?? '').trim() || null,
      })
      .eq('id', contact.value.id)

    if (updateError) throw updateError

    // Get current tag IDs
    const currentTagIds = selectedTags.value.map((t) => t.id)

    // Remove all existing relationships first to avoid conflicts
    const { error: deleteError } = await supabase
      .from('contacts_tags')
      .delete()
      .eq('contact_id', contact.value.id)

    if (deleteError) throw deleteError

    // Insert new relationships using upsert with ignoreDuplicates
    if (currentTagIds.length > 0) {
      const newRelations = currentTagIds.map((tagId) => ({
        contact_id: contact.value.id,
        tag_id: tagId,
      }))

      const { error: upsertError } = await supabase.from('contacts_tags').upsert(newRelations, {
        onConflict: 'contact_id,tag_id',
        ignoreDuplicates: true,
      })

      if (upsertError) throw upsertError
    }

    // Success - redirect to contacts list
    router.push('/contacts')
  } catch (error) {
    console.error('Error updating contact:', error)
    errorMessage.value = 'Erreur lors de la mise à jour du contact'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchContact()
  await loadTags()
})

const goBack = () => {
  router.go(-1)
}
</script>
