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
import CardComponent from "../components/CardComponent.vue";
import Building from "./Building.vue";
import BuildingSearcher from "../components/BuildingSearcher.vue";
import BathroomSearcher from "../components/BathroomSearcher.vue";
import Navigation from "../components/Navigation.vue";
</script>

<template>
  <div>
    <Navigation />
    <div>
      <h1>Gopher Bathrooms</h1>
    </div>
    <div class="home">
      <img class="full-image" src="../assets/umnmaps.jpg" alt="University of Minnesota Map" />
      <div class="bathroom-cards">
        <BuildingSearcher />
        <router-view />
<!--        <Building />-->
        <CardComponent number="1"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: left;
  font-size: 1.5rem;
  margin-top: 4rem;
}

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
  max-width: 600px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.bathroom-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
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
  h1 {
    text-align: left;
    font-size: 2.5rem;
    margin-top: 4rem;
  }

  .home {
    flex-direction: row;
    align-items: start;
    gap: 2rem;
  }

  .full-image {
    width: 50%;
    margin-bottom: 0;
  }

  .bathroom-cards {
    max-width: 50%;
    height: auto;
  }
}
</style>
