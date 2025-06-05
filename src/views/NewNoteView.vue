<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white px-4 py-4 border-b border-gray-200 flex items-center">
      <button @click="goBack" class="mr-3">
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 class="text-xl font-semibold text-gray-900">Nouvelle Note</h1>
    </div>

    <!-- Form Content -->
    <div class="flex-1 overflow-y-auto p-4">
      <form @submit.prevent="saveNote" class="space-y-6">
        <!-- Location Info (if provided) -->
        <div v-if="locationInfo" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-blue-500 mr-2"
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
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-800">{{ locationInfo.name }}</p>
              <p class="text-xs text-blue-600">{{ locationInfo.address }}</p>
            </div>
          </div>
        </div>

        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1"> Titre * </label>
          <input
            id="title"
            v-model="note.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': errors.title }"
            placeholder="Titre de la note"
          />
          <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
        </div>

        <!-- Content -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 mb-1">
            Contenu *
          </label>
          <textarea
            id="content"
            v-model="note.content"
            rows="6"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': errors.content }"
            placeholder="Écrivez votre note ici..."
          ></textarea>
          <p v-if="errors.content" class="mt-1 text-sm text-red-600">{{ errors.content }}</p>
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <select
            id="category"
            v-model="note.category_id"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sélectionner une catégorie</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 mb-1"> Tags </label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="tag in selectedTags"
              :key="tag.id"
              class="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 flex items-center"
            >
              {{ tag.name }}
              <button
                type="button"
                @click="removeTag(tag)"
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
          <div class="relative">
            <input
              v-model="tagInput"
              @input="searchTags"
              @keydown.enter.prevent="addTag"
              @keydown.escape="clearTagSearch"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                {{ tag.name }}
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

        <!-- Contacts -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Contacts associés </label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="contact in selectedContacts"
              :key="contact.id"
              class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 flex items-center"
            >
              {{ contact.full_name }}
              <button
                type="button"
                @click="removeContact(contact)"
                class="ml-2 text-green-600 hover:text-green-800"
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
          <div class="relative">
            <input
              v-model="contactInput"
              @input="searchContacts"
              @keydown.escape="clearContactSearch"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rechercher un contact..."
            />

            <!-- Contact Suggestions -->
            <div
              v-if="showContactSuggestions && filteredContacts.length > 0"
              class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto"
            >
              <div
                v-for="contact in filteredContacts"
                :key="contact.id"
                @click="selectContact(contact)"
                class="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div class="font-medium">{{ contact.full_name }}</div>
                <div class="text-sm text-gray-500">{{ contact.email }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Media Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Médias </label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div class="text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="mt-4">
                <label for="file-upload" class="cursor-pointer">
                  <span class="mt-2 block text-sm font-medium text-gray-900">
                    Ajouter des fichiers
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                    multiple
                    accept="image/*,video/*,audio/*"
                    @change="handleFileUpload"
                  />
                </label>
                <p class="mt-1 text-xs text-gray-500">PNG, JPG, MP4, MP3 jusqu'à 50MB</p>
              </div>
            </div>
          </div>

          <!-- Uploaded Files Preview -->
          <div v-if="uploadedFiles.length > 0" class="mt-4 space-y-2">
            <div
              v-for="(file, index) in uploadedFiles"
              :key="index"
              class="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span class="text-sm">{{ file.name }}</span>
              <button
                type="button"
                @click="removeFile(index)"
                class="text-red-600 hover:text-red-800"
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
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-800 text-sm">{{ errorMessage }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3 pt-6">
          <button
            type="button"
            @click="goBack"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient.js'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Form data
const note = reactive({
  title: '',
  content: '',
  category_id: '',
  location_id: route.query.locationId || null,
})

// State
const loading = ref(false)
const errorMessage = ref('')
const locationInfo = ref(null)
const categories = ref([])
const contacts = ref([])
const availableTags = ref([])
const uploadedFiles = ref([])

// Tags
const selectedTags = ref([])
const tagInput = ref('')
const showSuggestions = ref(false)

// Contacts
const selectedContacts = ref([])
const contactInput = ref('')
const showContactSuggestions = ref(false)

// Validation
const errors = reactive({
  title: '',
  content: '',
})

// Computed
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

const filteredContacts = computed(() => {
  if (!contactInput.value.trim()) return contacts.value
  const searchTerm = contactInput.value.toLowerCase().trim()
  return contacts.value.filter(
    (contact) =>
      (contact.full_name.toLowerCase().includes(searchTerm) ||
        contact.email?.toLowerCase().includes(searchTerm)) &&
      !selectedContacts.value.some((selectedContact) => selectedContact.id === contact.id),
  )
})

// Load initial data
const loadInitialData = async () => {
  try {
    // Load categories
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('id, name')
      .order('name')
    categories.value = categoriesData || []

    // Load tags
    const { data: tagsData } = await supabase.from('tags').select('id, name').order('name')
    availableTags.value = tagsData || []

    // Load user contacts
    const { data: contactsData } = await supabase
      .from('contacts')
      .select('id, full_name, email')
      .eq('user_id', authStore.user.id)
      .order('full_name')
    contacts.value = contactsData || []

    // Load location info if provided
    if (note.location_id) {
      const { data: locationData } = await supabase
        .from('locations')
        .select('name, address')
        .eq('id', note.location_id)
        .single()
      locationInfo.value = locationData
    }
  } catch (error) {
    console.error('Error loading initial data:', error)
  }
}

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
    const { data: existingTag } = await supabase
      .from('tags')
      .select('id, name')
      .eq('name', tagName)
      .single()

    if (existingTag) {
      selectExistingTag(existingTag)
      return
    }

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

// Contact functions
const searchContacts = () => {
  showContactSuggestions.value = contactInput.value.trim().length > 0
}

const selectContact = (contact) => {
  if (!selectedContacts.value.some((c) => c.id === contact.id)) {
    selectedContacts.value.push(contact)
  }
  contactInput.value = ''
  showContactSuggestions.value = false
}

const removeContact = (contactToRemove) => {
  selectedContacts.value = selectedContacts.value.filter(
    (contact) => contact.id !== contactToRemove.id,
  )
}

const clearContactSearch = () => {
  contactInput.value = ''
  showContactSuggestions.value = false
}

// File upload
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  uploadedFiles.value.push(...files)
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

// Validation
const validateForm = () => {
  Object.keys(errors).forEach((key) => (errors[key] = ''))
  let isValid = true

  if (!note.title.trim()) {
    errors.title = 'Le titre est requis'
    isValid = false
  }

  if (!note.content.trim()) {
    errors.content = 'Le contenu est requis'
    isValid = false
  }

  return isValid
}

// Save note
const saveNote = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    errorMessage.value = ''

    // Create note
    const { data: newNote, error: noteError } = await supabase
      .from('notes')
      .insert({
        user_id: authStore.user.id,
        title: note.title.trim(),
        content: note.content.trim(),
        category_id: note.category_id || null,
        location_id: note.location_id || null,
      })
      .select('id')
      .single()

    if (noteError) throw noteError

    // Add tag relationships
    if (selectedTags.value.length > 0) {
      const tagRelations = selectedTags.value.map((tag) => ({
        note_id: newNote.id,
        tag_id: tag.id,
      }))

      const { error: tagsError } = await supabase.from('notes_tags').insert(tagRelations)

      if (tagsError) throw tagsError
    }

    // Add contact relationships
    if (selectedContacts.value.length > 0) {
      const contactRelations = selectedContacts.value.map((contact) => ({
        note_id: newNote.id,
        contact_id: contact.id,
      }))

      const { error: contactsError } = await supabase.from('note_contacts').insert(contactRelations)

      if (contactsError) throw contactsError
    }

    // Upload media files (simplified - you may want to implement proper file upload)
    if (uploadedFiles.value.length > 0) {
      // This is a placeholder - implement actual file upload to Supabase Storage
      console.log('Files to upload:', uploadedFiles.value)
    }

    router.push('/notes')
  } catch (error) {
    console.error('Error creating note:', error)
    errorMessage.value = 'Erreur lors de la création de la note'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  loadInitialData()
})
</script>
