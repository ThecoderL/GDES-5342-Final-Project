<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const uniqueBuildings = new Set();

// Reactive variable to store building data
const buildings = ref([]);

// Fetch data from the backend
const fetchBuildings = async () => {
  try {
    const response = await axios.get("http://localhost:3300/api/buildings");
    const uniqueBuildings = new Set();
    buildings.value = response.data.filter(building => {
      const isUnique = !uniqueBuildings.has(building.BuildingName);
      uniqueBuildings.add(building.BuildingName);
      return isUnique;
    });
    buildings.value = response.data;
  } catch (error) {
    console.error("Error fetching buildings:", error);
  }
};

// Fetch data when the component mounts
onMounted(fetchBuildings);

</script>

<template>
<div v-for="(building, index) in buildings" :key="index" class="card">
  <div class="card-text">
    <p>{{ building.BuildingName }}</p>
  </div>
  <span class="material-icons">chevron_right</span>
</div>
</template>

<style scoped>

.card{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px white solid;
  border-radius: .5rem;
  padding: .1rem 1rem .1rem 1rem;
}

</style>