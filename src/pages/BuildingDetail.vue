<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router"; // To access route parameters
import axios from "axios";
import FloorToggleBar from "../components/FloorToggleBar.vue";
import { watch } from 'vue';


const route = useRoute(); // Access the current route
const building = ref(null); // Store building details
const floors = ref([]); // Store floors data
const selectedFloor = ref(null); // Store the selected floor
const bathrooms = ref([]); // Store bathrooms data for the selected floor
const selectedBathroom = ref(null); // Store the selected bathroom
const reviews = ref([]); // Store reviews for the selected bathroom

// Fetch building details when the component is mounted
const fetchBuildingDetail = async () => {
  const buildingId = route.params.id; // Get the building ID from the route
  try {
    // Fetch building details
    const response = await axios.get(`http://localhost:3300/api/buildings/${buildingId}`);
    building.value = response.data;

    // Fetch floors for the building
    const floorResponse = await axios.get(`http://localhost:3300/api/buildings/${buildingId}/floors`);
    floors.value = floorResponse.data;

    // Fetch bathrooms for the first floor by default
    if (floors.value.length > 0) {
      selectedFloor.value = floors.value[0].FloorNumber;
      fetchBathroomsForFloor(selectedFloor.value);
    }
  } catch (error) {
    console.error("Error fetching building details:", error);
  }
};

// Fetch bathrooms for the selected floor
const fetchBathroomsForFloor = async (floorId: number) => {
  const buildingId = route.params.id; // Get the building ID from the route
  try {
    const response = await axios.get(`http://localhost:3300/api/floors/${floorId}/bathrooms`);
    bathrooms.value = response.data;
    // Set the first bathroom as selected by default
    if (bathrooms.value.length > 0) {
      selectedBathroom.value = bathrooms.value[0].BathroomID;
      fetchReviewsForBathroom(selectedBathroom.value);
    }
  } catch (error) {
    console.error("Error fetching bathrooms:", error);
  }
};

// Fetch reviews for a specific bathroom
const fetchReviewsForBathroom = async (bathroomId: number) => {
  try {
    const response = await axios.get(`http://localhost:3300/api/bathrooms/${bathroomId}/reviews`);
    reviews.value = response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

watch(
    () => route.params.id,
    (newBuildingId) => {
      if (newBuildingId) {
        fetchBuildingDetail(newBuildingId);
      }
    }
);

// Watch for changes in selected floor and fetch bathroom data accordingly
watch(selectedFloor, (newFloorId) => {
  if (newFloorId) {
    fetchBathroomsForFloor(newFloorId);
  }
});

// Watch for changes in selected bathroom and fetch reviews accordingly
watch(selectedBathroom, (newBathroomId) => {
  if (newBathroomId) {
    fetchReviewsForBathroom(newBathroomId);
  }
});

onMounted(fetchBuildingDetail);
</script>

<template>
  <div v-if="building" class="building-detail">
    <h2>{{ building.BuildingName }}</h2>

    <!-- Render the FloorToggleBar component, passing floor data and selected floor -->
    <FloorToggleBar :floors="floors" v-model:selectedFloor="selectedFloor" />

    <!-- Display bathrooms for the selected floor -->
    <div v-if="selectedFloor && bathrooms.length">
      <h3>Reviews on Floor {{ selectedFloor }}:</h3>
    </div>

    <!-- Display reviews for the selected bathroom -->
    <div v-if="selectedBathroom && reviews.length" class="bathroom-review">
        <div v-for="review in reviews" :key="review.review_id">
          <p>{{  }}</p>
          <h2>{{ review.reviewer_name }}</h2>
          ⭐ Rating: {{ review.rating }}
          <p>"{{ review.review_text }}"</p>
        </div>
    </div>
  </div>
</template>
<style scoped>
h2{
  font-size: 1.25rem;
}

.bathroom-review{
  color: black;
  border: 1px solid #fffefe;
  border-radius: .75rem;
  padding: 1rem;
  background: #FFF3CE;
}
.building-detail {
  text-align: left;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

</style>
