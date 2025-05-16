<template>
  <div class="space-y-4">
    <!-- Forgot Password Link -->
    <div class="flex justify-end items-center">
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

    <!-- Remember Me Checkbox -->
    <label class="flex items-center space-x-2 cursor-pointer select-none">
      <input type="checkbox" class="hidden peer" v-model="rememberMe" />
      <span
        class="w-6 h-6 flex items-center justify-center rounded-full border-2 border-indigo-400 peer-checked:bg-white peer-checked:border-indigo-400"
      >
        <svg
          v-if="rememberMe"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span class="text-black text-lg font-normal">Se souvenir de moi</span>
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const rememberMe = ref(true)
</script>
