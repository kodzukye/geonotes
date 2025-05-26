<template>
  <div class="space-y-4">
    <!-- Forgot Password Link -->
    <div class="flex justify items-center">
      <a
        href="#"
        class="flex items-center text-indigo-400 hover:text-indigo-600 font-medium text-base select-none"
      >
        Mot de passe oublié ?
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
