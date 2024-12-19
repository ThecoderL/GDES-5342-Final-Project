<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

// Reactive variables
const searchQuery = ref("");
const bathrooms = ref([]);

// Fetch bathrooms based on search
const fetchBathrooms = async () => {
  try {
    const response = await axios.get("http://localhost:3300/api/bathrooms/search", {
      params: { query: searchQuery.value }
    });
    bathrooms.value = response.data;
  } catch (error) {
    console.error("Error fetching bathrooms:", error);
  }
};
</script>

<template>
  <div>
    <!-- Search Bar -->
    <input
        v-model="searchQuery"
        @input="fetchBathrooms"
        placeholder="Search Bathrooms or Amenities"
        class="search-bar"
    />

    <!-- Display Search Results -->
    <div v-for="(bathroom, index) in bathrooms" :key="index" class="card">
      <p><strong>Building:</strong> {{ bathroom.BuildingName }}</p>
      <p><strong>Floor:</strong> {{ bathroom.FloorNumber }}</p>
      <p><strong>Type:</strong> {{ bathroom.BathroomType }}</p>
      <p><strong>Amenity:</strong> {{ bathroom.AmenityName }} ({{ bathroom.Quantity }})</p>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
.card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
