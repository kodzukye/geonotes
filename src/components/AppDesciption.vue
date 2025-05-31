<template>
  <div class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-4xl mx-auto">
      <!-- App Name and Tagline -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-blue-600 sm:text-5xl">GeoNotes</h1>
        <p class="mt-3 text-xl text-gray-700 sm:mt-4">
          Votre solution innovante pour créer et organiser des notes géolocalisées avec précision.
        </p>
      </div>

      <!-- Main Description Section -->
      <div class="bg-white shadow-xl rounded-lg p-8 md:p-10">
        <div class="md:flex md:items-start">
          <div class="flex-shrink-0 mx-auto md:mx-0 md:mr-8 mb-6 md:mb-0">
            <!-- Placeholder for an app icon or relevant graphic -->
            <div
              class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto"
            >
              <!-- Heroicon: MapPinIcon as a placeholder -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                class="w-12 h-12"
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
          <div>
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              Centralisez et structurez vos informations sur le terrain
            </h2>
            <p class="text-gray-600 mb-3">
              GeoNotes est une application conçue pour les professionnels qui permet de documenter
              et suivre des activités grâce à des notes enrichies attachées à des lieux spécifiques.
            </p>
            <p class="text-gray-600">
              Profitez d'une carte interactive intuitive pour géolocaliser vos notes manuellement ou
              automatiquement, même dans des zones à faible précision GPS. Organisez vos données
              avec des dossiers, des tags et des catégories pour une recherche et un filtrage
              efficaces.
            </p>
          </div>
        </div>

        <!-- Key Features Section -->
        <div class="mt-10">
          <h3 class="text-xl font-semibold text-gray-900 mb-6 text-center">Fonctionnalités Clés</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Heroicon: DocumentTextIcon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7 text-blue-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">Notes Enrichies</h4>
                <p class="mt-1 text-gray-600">
                  Texte formaté, photos, vidéos, et enregistrements audio.
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Heroicon: MagnifyingGlassIcon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7 text-blue-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">Recherche Avancée</h4>
                <p class="mt-1 text-gray-600">
                  Filtrez par localisation, catégorie, date, ou mots-clés.
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Heroicon: ArrowPathIcon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7 text-blue-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">Synchronisation et Export</h4>
                <p class="mt-1 text-gray-600">
                  Intégration avec calendriers, emails et export PDF/CSV.
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Heroicon: ShieldCheckIcon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7 text-blue-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">Sécurité et Confidentialité</h4>
                <p class="mt-1 text-gray-600">Conformité RGPD pour la protection de vos données.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-12 text-center">
          <a
            href="/login"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Découvrir GeoNotes
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
