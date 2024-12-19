<script setup lang="ts">
import CardComponent from "./CardComponent.vue";
import Building from"./Building.vue"
import BuildingSearcher from "./BuildingSearcher.vue";
import BuildingSearcher2 from "./BuildingSearcher2.vue";
import BathroomSearcher from "./BathroomSearcher.vue";
import Navigation from "./Navigation.vue";
</script>

<template>
  <div>

    <div>
      <Navigation/>
      <h1>Gopher Bathrooms</h1>
    </div>
    <div class="home">
      <div>
        <img class="half-image" src="../assets/umnmaps.jpg" alt="">
      </div>
      <div class="bathroom-cards">
        <BuildingSearcher/>
<!--        <BathroomSearcher/>-->
        <Building/>
      </div>
    </div>
  </div>


</template>

<style scoped>
H1{
  text-align: left;
}
.home{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4rem;
}

.half-image{
  width: 50%;
}

.bathroom-cards{
  display: flex;
  flex-direction: column;
  height: 500px;
  overflow-y: scroll;
  gap: .5rem;
  width: 100%;
  padding: .25rem;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent; /* make scrollbar transparent */
}

@media (max-width:768px) {
  .home{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .bathroom-cards{
    display: flex;
    flex-direction: column;
    height: 500px;
    overflow-y: scroll;
    gap: 1rem;
  }
}
</style>