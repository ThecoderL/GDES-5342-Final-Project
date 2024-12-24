<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import FloorToggleBar from "../components/FloorToggleBar.vue";
import Gopherbathrooms from '../Gopherbathrooms.json';  // Adjust the path to your JSON file

interface Building {
  BuildingName: string;
  [key: string]: any;
}

interface Floor {
  FloorID: number;
  FloorNumber: number;
  [key: string]: any;
}

interface Bathroom {
  BathroomID: number;
  [key: string]: any;
}

interface Review {
  BathroomID: number;
  ReviewerName: string;
  Rating: number;
  ReviewText: string;
}

const route = useRoute();
const building = ref<Building | null>(null);
const floors = ref<Floor[]>([]);
const selectedFloor = ref<number | null>(null);
const bathrooms = ref<Bathroom[]>([]);
const selectedBathroom = ref<number | null>(null);
const reviews = ref<Review[]>([]);

const fetchBuildingDetail = () => {
  const buildingId = route.params.id as string; // Ensure buildingId is a string

  // Get the building details from imported data
  const buildingData = Gopherbathrooms.buildings.find((b: Building) => b.BuildingID === Number(buildingId));
  if (buildingData) {
    building.value = buildingData;

    // Get floors for the building
    floors.value = Gopherbathrooms.floors.filter((f: Floor) => f.BuildingID === Number(buildingId));
    // Default to the first floor if available
    if (floors.value.length > 0) {
      selectedFloor.value = floors.value[0].FloorNumber;
      fetchBathroomsForFloor(selectedFloor.value);
    }
  }
};

// Fetch bathrooms for a floor
const fetchBathroomsForFloor = (floorId: number) => {
  bathrooms.value = Gopherbathrooms.bathrooms.filter((bathroom: Bathroom) =>
      bathroom.FloorID === floorId
  );
  // Default to the first bathroom if available
  if (bathrooms.value.length > 0) {
    selectedBathroom.value = bathrooms.value[0].BathroomID;
    fetchReviewsForBathroom(selectedBathroom.value);
  }
};

// Fetch reviews for a bathroom
const fetchReviewsForBathroom = (bathroomId: number) => {
  reviews.value = Gopherbathrooms.reviews.filter((review: Review) =>
      review.BathroomID === bathroomId
  );
  console.log("Reviews fetched for bathroom ID", bathroomId, reviews.value);
  console.log("Reviews count:", reviews.value.length); // Log the length

};

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
  console.log("Selected Bathroom ID:", newBathroomId);  // Check the selected bathroom ID
  if (newBathroomId !== null) {
    fetchReviewsForBathroom(newBathroomId);
  }
});

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
          Bathroom {{ bathroom.BathroomID }}
        </li>
      </ul>
    </div>

    <!-- Reviews for the selected bathroom -->
    <div class="bathroom-review">
      <h3>Reviews:</h3>
      <div v-for="review in reviews" :key="review.BathroomID">
        <h4>{{ review.ReviewerName }}</h4>
        ⭐ Rating: {{ review.Rating }}
        <p>"{{ review.ReviewText }}"</p>
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
}</style>
