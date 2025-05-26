<!-- src/components/BottomNavigation.vue -->
<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow flex justify-around items-center h-20 z-50"
  >
    <button
      v-for="item in items"
      :key="item.key"
      @click="handleItemClick(item)"
      class="flex flex-col items-center justify-center flex-1 focus:outline-none"
    >
      <span
        :class="[
          'flex items-center justify-center w-11 h-11 mb-1',
          modelValue === item.key ? 'bg-indigo-100 rounded-full' : '',
        ]"
      >
        <component
          :is="item.icon"
          :class="['w-6 h-6', modelValue === item.key ? 'text-indigo-500' : 'text-indigo-400']"
        />
      </span>
      <span
        :class="[
          'text-xs font-semibold',
          modelValue === item.key ? 'text-gray-700' : 'text-gray-400',
        ]"
      >
        {{ item.label }}
      </span>
    </button>
  </nav>
</template>

<script>
import AccountIcon from './icons/AccountIcon.vue'
import ContactsIcon from './icons/ContactsIcon.vue'
import MapIcon from './icons/MapIcon.vue'
import NotesIcon from './icons/NotesIcon.vue'
import router from '@/router'

export default {
  components: {
    AccountIcon,
    ContactsIcon,
    MapIcon,
    NotesIcon,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
      default: 'note',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      items: [
        { key: 'compte', path: '/account', label: 'Compte', icon: 'AccountIcon' },
        { key: 'contact', path: '/contacts', label: 'Contact', icon: 'ContactsIcon' },
        { key: 'explore', path: '/explore', label: 'Explorer', icon: 'MapIcon' },
        { key: 'note', path: '/notes', label: 'Note', icon: 'NotesIcon' },
      ],
    }
  },
  methods: {
    handleItemClick(item) {
      this.$emit('update:modelValue', item.key)
      router.push(item.path)
    },
  },
}
</script>
