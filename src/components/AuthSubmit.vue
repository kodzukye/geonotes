<template>
  <button
    type="submit"
    class="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-white font-semibold uppercase tracking-wide hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
  >
    <span>{{ text }}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ml-3 h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'SE CONNECTER',
  },
})
</script>
