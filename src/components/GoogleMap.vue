<template>
  <GMapMap
    :center="{ lat: 14.6131171, lng: -60.9941574 }"
    :zoom="14"
    map-type-id="terrain"
    :options="{
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: true,
    }"
  />
</template>
