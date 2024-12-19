<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

// Reactive variables
const searchQuery = ref("");
const buildings = ref([]);

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

const navigateToBuilding = (buildingId) => {
  router.push(`/buildings/${buildingId}`);
};

</script>

<template>
  <div>
    <div :class="['search-bar', { 'search-bar--results': buildings.length > 0 }]"
    >
      <span class="material-icons">search</span>
      <input
          v-model="searchQuery"
          @input="fetchBuildings"
          placeholder="Search Buildings"
          class="search-bar-input"
      />
    </div>
    <div v-for="(building, index) in buildings" :key="index" class="card" @click="navigateToBuilding(building.BuildingID)"
    >
      <span class="material-icons">home</span>
      <p>{{ building.BuildingName }}</p>
    </div>
  </div>

</template>

<style scoped>
.search-bar {
  display: flex;
  gap: .25rem;
  align-content: center;
  border: 2px maroon solid;
  background-color: white;
  padding: 1rem;
  border-radius: 10rem 10rem 10rem 10rem;
  color: maroon;
}

.search-bar--results{
  display: flex;
  gap: .25rem;
  align-content: center;
  border: 2px maroon solid;
  background-color: white;
  padding: 1rem;
  border-radius: 1.75rem 1.75rem 0 0;
  color: maroon;
}

.search-bar-input{
  //width: 100%;
  display: flex;
  border: none;
  outline: none;
  background-color: white;
  border-radius: 10rem;
  color: maroon;
  font-family: "Plus Jakarta Sans", sans-serif;
}

.search-bar-input::placeholder{
  color: rgba(128, 0, 0, 0.5);
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: bold;
}

.search-bar-input::text{
  color: rgba(13, 0, 128, 0.5);
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: bold;
}


.card {
  display: flex;
  gap: .5rem;
  margin: -.25rem;
  align-items: center;
  padding: .25rem 1rem .25rem 2rem;
  border: 1px solid #ccc;
  border-radius: .75rem;
  color: grey;
  background-color: white;
  text-align: left;
  //position: relative;
}

</style>
