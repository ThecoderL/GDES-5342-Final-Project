<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Define a type for floors
interface Floor {
  FloorID: number;
  FloorNumber: number;
}

// Define props with types
const props = defineProps<{
  floors: Floor[]; // Array of floors
  selectedFloor: number | null; // Currently selected floor
}>();

// Emit event to notify parent of floor selection
const emit = defineEmits(["update:selectedFloor"]);

console.log(props.floors);

// Handle floor selection
const handleFloorClick = (floorNumber: number) => {
  emit("update:selectedFloor", floorNumber);
};
</script>

<template>
  <div class="floor-toggle-bar">
    <button
        v-for="floor in floors"
        :key="floor.FloorID"
        :class="{ 'active': selectedFloor === floor.FloorNumber }"
        @click="handleFloorClick(floor.FloorNumber)"
        class="floor-button"
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

.floor-button {
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

.floor-button.active {
  background-color: maroon;
  color: white;
}

.floor-button:hover {
  box-shadow: rgb(0, 0, 0) 0px 10px 40px -10px;
}
</style>
