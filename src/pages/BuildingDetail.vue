<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import FloorToggleBar from "../components/FloorToggleBar.vue";

// Define types
interface Building {
  BuildingName: string;
  [key: string]: any;
}

interface Floor {
  FloorNumber: number;
  [key: string]: any;
}

interface Bathroom {
  BathroomID: number;
  [key: string]: any;
}

interface Review {
  review_id: number;
  reviewer_name: string;
  rating: number;
  review_text: string;
}

// Reactive variables with types
const route = useRoute();
const building = ref<Building | null>(null);
const floors = ref<Floor[]>([]);
const selectedFloor = ref<number | null>(null);
const bathrooms = ref<Bathroom[]>([]);
const selectedBathroom = ref<number | null>(null);
const reviews = ref<Review[]>([]);

// Fetch building details
const fetchBuildingDetail = async () => {
  const buildingId = route.params.id as string; // Ensure buildingId is a string
  try {
    // Fetch building details
    const response = await axios.get(`http://localhost:3300/api/buildings/${buildingId}`);
    building.value = response.data;

    // Fetch floors for the building
    const floorResponse = await axios.get(`http://localhost:3300/api/buildings/${buildingId}/floors`);
    floors.value = floorResponse.data;

    // Default to the first floor if available
    if (floors.value.length > 0) {
      selectedFloor.value = floors.value[0].FloorNumber;
      fetchBathroomsForFloor(selectedFloor.value);
    }
  } catch (error) {
    console.error("Error fetching building details:", error);
  }
};

// Fetch bathrooms for a floor
const fetchBathroomsForFloor = async (floorId: number) => {
  try {
    const response = await axios.get(`http://localhost:3300/api/floors/${floorId}/bathrooms`);
    bathrooms.value = response.data;

    // Default to the first bathroom if available
    if (bathrooms.value.length > 0) {
      selectedBathroom.value = bathrooms.value[0].BathroomID;
      fetchReviewsForBathroom(selectedBathroom.value);
    }
  } catch (error) {
    console.error("Error fetching bathrooms:", error);
  }
};

// Fetch reviews for a bathroom
const fetchReviewsForBathroom = async (bathroomId: number) => {
  try {
    const response = await axios.get(`http://localhost:3300/api/bathrooms/${bathroomId}/reviews`);
    reviews.value = response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

// Watchers
watch(
    () => route.params.id,
    (newBuildingId) => {
      if (newBuildingId) {
        fetchBuildingDetail();
      }
    }
);

watch(selectedFloor, (newFloorId) => {
  if (newFloorId !== null) {
    fetchBathroomsForFloor(newFloorId);
  }
});

watch(selectedBathroom, (newBathroomId) => {
  if (newBathroomId !== null) {
    fetchReviewsForBathroom(newBathroomId);
  }
});

// Initial fetch
onMounted(fetchBuildingDetail);
</script>

<template>
  <div v-if="building" class="building-detail">
    <h2>{{ building.BuildingName }}</h2>

    <!-- Floor toggle bar -->
    <FloorToggleBar :floors="floors" v-model:selectedFloor="selectedFloor" />

    <!-- Bathrooms for the selected floor -->
    <div v-if="selectedFloor && bathrooms.length">
      <h3>Bathrooms on Floor {{ selectedFloor }}:</h3>
      <ul>
        <li v-for="bathroom in bathrooms" :key="bathroom.BathroomID">
          {{ bathroom.BathroomID }}
        </li>
      </ul>
    </div>

    <!-- Reviews for the selected bathroom -->
    <div v-if="selectedBathroom && reviews.length" class="bathroom-review">
      <h3>Reviews:</h3>
      <div v-for="review in reviews" :key="review.review_id">
        <h4>{{ review.reviewer_name }}</h4>
        ⭐ Rating: {{ review.rating }}
        <p>"{{ review.review_text }}"</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.25rem;
}

.bathroom-review {
  color: black;
  border: 1px solid #fffefe;
  border-radius: 0.75rem;
  padding: 1rem;
  background: #fff3ce;
}

.building-detail {
  text-align: left;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
</style>
