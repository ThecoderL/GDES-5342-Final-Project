<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import Gopherbathrooms  from '../Gopherbathrooms.json';  // Adjust the path to your JSON file

const router = useRouter();

interface Building {
  BuildingID: number;
  BuildingName: string;
}

const searchQuery = ref("");
const buildings = ref<Building[]>([]);

const clearSearch = () => {
  searchQuery.value = "";
  buildings.value = [];
};

// Fetch buildings based on search
const fetchBuildings = () => {
  if (searchQuery.value.trim() === "") {
    buildings.value = [];
    return;
  }

  // Filter buildings from imported data
  buildings.value = Gopherbathrooms.buildings.filter((building: Building) =>
      building.BuildingName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const navigateToBuilding = (id: number) => {
  router.push(`/buildings/${id}`);
};
</script>

<template>
  <div :class="['search-bar', { 'search-bar--results': buildings.length > 0 }]">
    <span class="material-icons">search</span>
    <input
        v-model="searchQuery"
        @input="fetchBuildings"
        placeholder="Search Buildings"
        class="search-bar-input"
    />
    <span v-if="searchQuery.length > 0" class="clear-icon" @click="clearSearch">&#x2716;</span>
  </div>
  <div v-for="(building, index) in buildings" :key="index" class="card" @click="navigateToBuilding(building.BuildingID)">
    <span class="material-icons">home</span>
    <p>{{ building.BuildingName }}</p>
  </div>
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
  box-shadow: rgb(256, 0, 0) 0px 10px 40px -10px;

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
  position: relative;
  left: 0;
  right: 0;
  z-index: 50; /* Ensure the results appear on top of other content */
}

.card:hover {
  color: maroon;
}

.clear-icon {
  cursor: pointer;
  //position: absolute;
  right: 1rem;
}</style>
