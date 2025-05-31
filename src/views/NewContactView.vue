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
          ></path>
        </svg>
      </button>
      <h1 class="text-xl font-semibold text-gray-900">Nouveau contact</h1>
    </div>

    <!-- Form Content -->
    <div class="flex-1 overflow-y-auto p-4">
      <form @submit.prevent="saveContact" class="space-y-6">
        <!-- Profile Picture Section -->
        <div class="flex justify-center">
          <div class="relative">
            <div
              class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="contact.avatar"
                :src="contact.avatar"
                alt="Avatar"
                class="w-full h-full object-cover"
              />
              <svg v-else class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <button
              type="button"
              @click="selectImage"
              class="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
            />
          </div>
        </div>

        <!-- Name Fields -->
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Nom complet *
            </label>
            <input
              id="name"
              v-model="contact.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1"> Email </label>
            <input
              id="email"
              v-model="contact.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              id="phone"
              v-model="contact.phone"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.phone }"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 mb-1"> Tags </label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="(tag, index) in contact.tags"
              :key="index"
              class="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700 flex items-center"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-1 text-gray-500 hover:text-gray-700"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </span>
          </div>
          <div class="flex">
            <input
              v-model="newTag"
              @keyup.enter="addTag"
              type="text"
              placeholder="Ajouter un tag"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              @click="addTag"
              class="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-200"
            >
              Ajouter
            </button>
          </div>
        </div>

        <!-- Notes -->
        <div>
          <label for="notes" class="block text-sm font-medium text-gray-700 mb-1"> Notes </label>
          <textarea
            id="notes"
            v-model="contact.notes"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ajouter des notes sur ce contact..."
          ></textarea>
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

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient.js'

export default {
  name: 'NewContactView',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const fileInput = ref(null)
    const newTag = ref('')

    const contact = reactive({
      name: '',
      email: '',
      phone: '',
      avatar: '',
      tags: [],
      notes: '',
    })

    const errors = reactive({
      name: '',
      email: '',
      phone: '',
    })

    const validateForm = () => {
      // Reset errors
      Object.keys(errors).forEach((key) => (errors[key] = ''))

      let isValid = true

      // Required fields
      if (!contact.name.trim()) {
        errors.name = 'Le prénom est requis'
        isValid = false
      }

      // Email validation
      if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
        errors.email = "Format d'email invalide"
        isValid = false
      }

      // Phone validation
      if (contact.phone && !/^[\d\s\-\+\(\)]+$/.test(contact.phone)) {
        errors.phone = 'Format de téléphone invalide'
        isValid = false
      }

      return isValid
    }

    const saveContact = async () => {
      if (!validateForm()) {
        return
      }

      try {
        loading.value = true

        const contactData = {
          name: contact.name.trim(),
          email: contact.email || null,
          phone: contact.phone || null,
          avatar: contact.avatar || null,
          tags: contact.tags,
          notes: contact.notes || null,
        }

        //const { data, error } = await supabase.from('contacts').insert([contactData]).select()

        if (error) {
          console.error('Error creating contact:', error)
          alert('Erreur lors de la création du contact')
          return
        }

        console.log('Contact created successfully')
        router.push('/contacts')
      } catch (error) {
        console.error('Error:', error)
        alert('Erreur lors de la création du contact')
      } finally {
        loading.value = false
      }
    }

    const goBack = () => {
      router.go(-1)
    }

    const selectImage = () => {
      fileInput.value?.click()
    }

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          contact.avatar = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const addTag = () => {
      if (newTag.value.trim() && !contact.tags.includes(newTag.value.trim())) {
        contact.tags.push(newTag.value.trim())
        newTag.value = ''
      }
    }

    const removeTag = (index) => {
      contact.tags.splice(index, 1)
    }

    return {
      contact,
      errors,
      loading,
      fileInput,
      newTag,
      saveContact,
      goBack,
      selectImage,
      handleImageUpload,
      addTag,
      removeTag,
    }
  },
}
</script>
