<template>
  <GMapMap
    ref="mapRef"
    :center="mapCenter"
    :zoom="mapZoom"
    map-type-id="terrain"
    :options="{
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: true,
      clickableIcons: true,
    }"
    @click="handleMapClick"
  >
    <!-- Custom InfoWindow -->
    <GMapInfoWindow
      v-if="selectedPlace"
      :options="{
        position: selectedPlace.position,
        maxWidth: 400,
      }"
      :opened="showInfoWindow"
      @closeclick="closeInfoWindow"
    >
      <CustomInfoWindow
        :place="selectedPlace"
        :notes="placeNotes"
        :contacts="placeContacts"
        @create-note="handleCreateNote"
      />
    </GMapInfoWindow>
  </GMapMap>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import CustomInfoWindow from './CustomInfoWindow.vue'
import router from '@/router'

const mapRef = ref(null)
const selectedPlace = ref(null)
const showInfoWindow = ref(false)
const placeNotes = ref([])
const placeContacts = ref([])
const locationId = ref(null)
const mapCenter = ref({ lat: 14.6131171, lng: -60.9941574 })
const mapZoom = ref(14)

// Handle map clicks on POIs
const handleMapClick = async (event) => {
  if (event.placeId) {
    event.stop() // Prevent default InfoWindow
    await loadPlaceDetails(event.placeId, event.latLng)
  }
}

// Show place from search results
const showPlaceFromSearch = async (placeId) => {
  const service = new google.maps.places.PlacesService(mapRef.value.$mapObject)

  const request = {
    placeId: placeId,
    fields: [
      'name',
      'formatted_address',
      'website',
      'formatted_phone_number',
      'place_id',
      'geometry',
    ],
  }

  service.getDetails(request, async (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }

      mapCenter.value = position
      mapZoom.value = 16

      selectedPlace.value = {
        ...place,
        position: new google.maps.LatLng(position.lat, position.lng),
      }

      await loadPlaceData(place.place_id)
      showInfoWindow.value = true
    }
  })
}

// Load place details from Google Places API
const loadPlaceDetails = async (placeId, position) => {
  const service = new google.maps.places.PlacesService(mapRef.value.$mapObject)

  const request = {
    placeId: placeId,
    fields: ['name', 'formatted_address', 'website', 'formatted_phone_number', 'place_id'],
  }

  service.getDetails(request, async (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      selectedPlace.value = {
        ...place,
        position: position,
      }

      // Load notes and contacts for this place
      await loadPlaceData(place.place_id)
      showInfoWindow.value = true
    }
  })
}

// Load notes and contacts from Supabase
const loadPlaceData = async (googlePlaceId) => {
  try {
    // Get or create location
    let { data: location } = await supabase
      .from('locations')
      .select('id')
      .eq('google_id', googlePlaceId)
      .single()

    if (!location) {
      // Create location if it doesn't exist
      const { data: newLocation } = await supabase
        .from('locations')
        .insert({
          google_id: googlePlaceId,
          latitude: selectedPlace.value.position.lat(),
          longitude: selectedPlace.value.position.lng(),
          name: selectedPlace.value.name,
          address: selectedPlace.value.formatted_address,
          phone: selectedPlace.value.formatted_phone_number,
          website: selectedPlace.value.website,
        })
        .select('id')
        .single()

      location = newLocation
      locationId.value = newLocation?.id
    } else {
      locationId.value = location.id
    }

    if (location) {
      // Load notes for this location
      const { data: notes } = await supabase
        .from('notes')
        .select(
          `
          id,
          title,
          content,
          created_at,
          note_contacts (
            contacts (
              id,
              full_name
            )
          )
        `,
        )
        .eq('location_id', location.id)
        .order('created_at', { ascending: false })

      placeNotes.value = notes || []

      // Get unique contacts from notes
      const contactIds = new Set()
      notes?.forEach((note) => {
        note.note_contacts?.forEach((nc) => {
          if (nc.contacts) {
            contactIds.add(nc.contacts.id)
          }
        })
      })

      if (contactIds.size > 0) {
        const { data: contacts } = await supabase
          .from('contacts')
          .select('id, full_name, email, phone')
          .in('id', Array.from(contactIds))

        placeContacts.value = contacts || []
      } else {
        placeContacts.value = []
      }
    }
  } catch (error) {
    console.error('Error loading place data:', error)
    placeNotes.value = []
    placeContacts.value = []
  }
}

const closeInfoWindow = () => {
  showInfoWindow.value = false
  selectedPlace.value = null
  placeNotes.value = []
  placeContacts.value = []
}

const handleCreateNote = () => {
  router.push({
    path: '/notes/new/',
    query: {
      locationId: locationId.value,
      placeName: selectedPlace.value.name,
    },
  })
}

// Expose method to parent component
defineExpose({
  showPlaceFromSearch,
})
</script>
