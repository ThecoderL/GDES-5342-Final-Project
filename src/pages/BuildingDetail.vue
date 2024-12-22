<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router"; // To access route parameters
import axios from "axios";

const route = useRoute(); // Access the current route
const building = ref(null); // Store building details

// Fetch building details when the component is mounted
const fetchBuildingDetail = async () => {
  const buildingId = route.params.id; // Get the building ID from the route
  try {
    const response = await axios.get(`http://localhost:3300/api/buildings/${buildingId}`);
    building.value = response.data;
  } catch (error) {
    console.error("Error fetching building details:", error);
  }
};

onMounted(fetchBuildingDetail);
</script>

<template>
  <div v-if="building" class="building-detail">
    <h2>{{ building.BuildingName }}</h2>
    <p>{{ building.Description }}</p>
    <p>Location: {{ building.Location }}</p>
    <!-- Add more details as needed -->
  </div>
</template>

<style scoped>
.building-detail {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
}
</style>
