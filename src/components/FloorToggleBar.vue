<!-- FloorToggleBar.vue -->
<script setup lang="ts">
import { defineProps, ref } from 'vue';

// Define props to accept floor data from the parent component
const props = defineProps({
  floors: Array, // Array of floors to render
  selectedFloor: Number // The currently selected floor
});

// Reactive variable to store the selected floor
const selectedFloor = ref(props.selectedFloor);

</script>

<template>
  <div class="floor-toggle-bar">
    <button
        v-for="floor in floors"
        :key="floor.FloorID"
        :class="{ 'active': selectedFloor === floor.FloorNumber }"
        @click="selectedFloor = floor.FloorNumber"
        class="floor-btn"
    >
      Floor {{ floor.FloorNumber }}
    </button>
  </div>
</template>

<style scoped>
.floor-toggle-bar {
  display: flex;
  gap: .75rem;
  background-color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.floor-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: maroon;
  text-decoration: none;
  background-color: white;
  border: 1px solid white;
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.floor-btn.active {
  background-color: maroon;
  color: white;
}

.floor-btn:hover {
  box-shadow: rgb(0, 0, 0) 0px 10px 40px -10px;
}
</style>
