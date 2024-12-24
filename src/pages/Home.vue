<!--<script setup lang="ts">-->
<!--import CardComponent from "./CardComponent.vue";-->
<!--import Building from"./Building.vue"-->
<!--import BuildingSearcher from "./BuildingSearcher.vue";-->
<!--import BuildingSearcher2 from "./BuildingSearcher2.vue";-->
<!--import BathroomSearcher from "./BathroomSearcher.vue";-->
<!--import Navigation from "./Navigation.vue";-->
<!--</script>-->

<!--<template>-->
<!--  <div>-->

<!--    <div>-->
<!--      <Navigation/>-->
<!--      <h1>Gopher Bathrooms</h1>-->
<!--    </div>-->
<!--    <div class="home">-->
<!--      <div>-->
<!--        <img class="half-image" src="../assets/umnmaps.jpg" alt="">-->
<!--      </div>-->
<!--      <div class="bathroom-cards">-->
<!--        <BuildingSearcher/>-->
<!--&lt;!&ndash;        <BathroomSearcher/>&ndash;&gt;-->
<!--        <Building/>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->


<!--</template>-->

<!--<style scoped>-->
<!--H1{-->
<!--  text-align: left;-->
<!--}-->
<!--.home{-->
<!--  display: flex;-->
<!--  flex-direction: row;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  width: 100%;-->
<!--  gap: 4rem;-->
<!--}-->

<!--.half-image{-->
<!--  width: 50%;-->
<!--}-->

<!--.bathroom-cards{-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  height: 500px;-->
<!--  overflow-y: scroll;-->
<!--  gap: .5rem;-->
<!--  width: 100%;-->
<!--  padding: .25rem;-->
<!--}-->

<!--::-webkit-scrollbar {-->
<!--  width: 0;-->
<!--  background: transparent; /* make scrollbar transparent */-->
<!--}-->

<!--@media (max-width:768px) {-->
<!--  .home{-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    justify-content: center;-->
<!--    align-items: center;-->
<!--    width: 100%;-->
<!--  }-->

<!--  .bathroom-cards{-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    height: 500px;-->
<!--    overflow-y: scroll;-->
<!--    gap: 1rem;-->
<!--  }-->
<!--}-->
<!--</style>-->


<script setup lang="ts">
// import CardComponent from "../components/CardComponent.vue";
// import Building from "../components/Building.vue";
import BuildingSearcher from "../components/BuildingSearcher.vue";
// import BathroomSearcher from "../components/BathroomSearcher.vue";
import Navigation from "../components/Navigation.vue";
</script>

<template>
  <div>
    <Navigation />
    <div>
      <h1>Gopher Bathrooms</h1>
    </div>
    <div class="home">
      <div class="img-div">
        <img class="full-image" src="../assets/umnmaps.jpg" alt="University of Minnesota Map" />
      </div>
      <div class="bathroom-cards">
        <BuildingSearcher />
<!--        <CardComponent number="1"/>-->
        <router-view :key="Array.isArray($route.params.buildingID) ? $route.params.buildingID.join(',') : $route.params.buildingID" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.full-image {
  width: 100%;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.bathroom-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 500px;
  overflow-y: auto;
  padding: 0.5rem;
}

/* Hide scrollbar */
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

/* Styles for larger screens */
@media (min-width: 768px) {
  .home {
    flex-direction: row;
    align-items: start;
    justify-content: center;
    gap: 2rem;
  }

  .img-div{
    display: flex;
  }
  .full-image {
    width: 100%;
    margin-bottom: 0;
  }

  .bathroom-cards {
    //max-width: 50%;
    height: auto;
  }
}
</style>
