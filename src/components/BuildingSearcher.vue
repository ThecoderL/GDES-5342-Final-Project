<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

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
    console.log(response.data);
    buildings.value = response.data;
  } catch (error) {
    console.error("Error fetching buildings:", error);
  }
};

const navigateToBuilding = (id) => {
  router.push(`/buildings/${id}`);
};

</script>

<template>
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
      <p>ID:{{ building.BuildingID }}</p>
    </div>
  <router-view></router-view>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: .25rem;
  align-content: center;
  border: 2px rgba(128, 0, 0, 0.5) solid;
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
  width: 100%;
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

.card {
  display: flex;
  gap: .5rem;
  margin-top: -.25rem;
  margin-bottom: -.25rem;
  align-items: center;
  padding: .25rem .5rem .25rem 2rem;
  border: 1px solid #ccc;
  border-radius: .75rem;
  color: grey;
  background-color: white;
  text-align: left;
  cursor: pointer;
}

.card:hover {
  color: maroon;

}
</style>
