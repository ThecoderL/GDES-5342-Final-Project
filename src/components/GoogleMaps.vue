<template>
  <div v-if="apiLoaded" ref="mapContainer" class="map-container"></div>
  <p v-else>Loading map...</p>
</template>

<script lang="ts">

let map: google.maps.Map;
async function initMap(): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();
// import { defineComponent, onMounted, ref } from 'vue';
//
// export default defineComponent({
//   name: 'GoogleMap',
//   setup() {
//     const mapContainer = ref<HTMLDivElement | null>(null);
//     const apiLoaded = ref(false);
//
//     const loadGoogleMapsAPI = (): Promise<void> => {
//       return new Promise((resolve, reject) => {
//         if (window.google && window.google.maps) {
//           resolve(); // API already loaded
//         } else {
//           const script = document.createElement('script');
//           script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIqgh6wikVwOO0hmngNVge4E0xs4utY6c`;
//           script.async = true;
//           script.defer = true;
//
//           script.onload = () => resolve();
//           script.onerror = () => reject(new Error('Google Maps API failed to load'));
//
//           document.head.appendChild(script);
//         }
//       });
//     };
//
//     onMounted(async () => {
//       try {
//         await loadGoogleMapsAPI();
//         apiLoaded.value = true;
//
//         if (mapContainer.value) {
//           const map = new google.maps.Map(mapContainer.value, {
//             center: { lat: 37.7749, lng: -122.4194 },
//             zoom: 12,
//           });
//           // new google.maps.Marker({
//           //   position: { lat: 37.7749, lng: -122.4194 },
//           //   map,
//           //   title: 'San Francisco',
//           // });
//         }
//       } catch (error) {
//         console.error('Error loading Google Maps API:', error);
//       }
//     });
//
//     return {
//       mapContainer,
//       apiLoaded,
//     };
//   },
// });
</script>

<style>
.map-container {
  width: 500px;
  height: 500px;
}
</style>
