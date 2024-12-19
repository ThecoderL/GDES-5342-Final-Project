<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

// Reactive variables
const searchQuery = ref("");
const buildings = ref([]);
const focused = ref(false);

// Fetch buildings based on search
const fetchBuildings = async () => {
  // Do not fetch if the search query is empty
  if (searchQuery.value.trim() === "") {
    buildings.value = [];
    return;
  }
  try {
    const response = await axios.get("http://localhost:3300/api/buildings/search", {
      params: { name: searchQuery.value }
    });
    buildings.value = response.data;
  } catch (error) {
    console.error("Error fetching buildings:", error);
  }
};

</script>

<template>
  <div>
    <!-- Search Bar -->
    <input
        v-model="searchQuery"
        @input="fetchBuildings"
        placeholder="Search Buildings"
        class="search-bar"
    />

    <!-- Display Search Results -->
    <div v-for="(building, index) in buildings" :key="index" class="card">
      <p>{{ building.BuildingName }}</p>
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
