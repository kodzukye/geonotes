<template>
  <div class="bg-white py-12 px-4 flex flex-col items-center font-sans">
    <!-- Header Text -->
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">Comment ça marche ?</h2>
      <p class="text-gray-600 text-md">
        Découvrez comment GeoNotes simplifie la prise de notes géolocalisées.
      </p>
    </div>

    <!-- Steps Container -->
    <div class="w-full max-w-md">
      <!-- Step 1: Connexion / Créer un compte -->
      <div class="bg-blue-600 p-6 rounded-xl shadow-lg text-white mb-6">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-xl font-semibold">Connexion / Créer un compte</h3>
          <div class="bg-white p-2 rounded-full flex-shrink-0 ml-4">
            <!-- Heroicon: UserCircleIcon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>
        <p class="text-sm text-blue-50">
          Accédez à votre espace personnel ou inscrivez-vous rapidement pour commencer.
        </p>
      </div>

      <!-- Arrow Separator -->
      <div class="flex justify-center items-center my-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="currentColor"
          class="w-8 h-8 text-gray-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m0 0l-4-4m4 4l4-4" />
        </svg>
      </div>

      <!-- Step 2: Rechercher un lieu -->
      <div class="bg-blue-600 p-6 rounded-xl shadow-lg text-white mb-6">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-xl font-semibold">Rechercher un lieu</h3>
          <div class="bg-white p-2 rounded-full flex-shrink-0 ml-4">
            <!-- Heroicon: MapPinIcon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </div>
        </div>
        <p class="text-sm text-blue-50">
          Utilisez la carte interactive pour trouver ou définir l'emplacement exact de votre note.
        </p>
      </div>

      <!-- Arrow Separator -->
      <div class="flex justify-center items-center my-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="currentColor"
          class="w-8 h-8 text-gray-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m0 0l-4-4m4 4l4-4" />
        </svg>
      </div>

      <!-- Step 3: Écrire une nouvelle note pour le lieu sélectionné -->
      <div class="bg-blue-600 p-6 rounded-xl shadow-lg text-white">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-xl font-semibold">Écrire une nouvelle note pour le lieu sélectionné</h3>
          <div class="bg-white p-2 rounded-full flex-shrink-0 ml-4">
            <!-- Heroicon: DocumentPlusIcon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
        </div>
        <p class="text-sm text-blue-50">
          Enrichissez votre note avec du texte, des photos, vidéos ou audios pour capturer tous les
          détails.
        </p>
      </div>
    </div>

    <!-- Action Button -->
    <div class="mt-10">
      <RouterLink to="/login"
        ><button
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Commencer avec GeoNotes
        </button>
      </RouterLink>
    </div>
  </div>
</template>
