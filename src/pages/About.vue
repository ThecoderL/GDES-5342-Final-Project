<script setup lang="ts">
import Navigation from "../components/Navigation.vue";
</script>

<template>
  <div class="about">
    <Navigation/>
    <h1>About</h1>
    <h2>Gopher Bathrooms is your go-to location for all things bathrooms here at the University of Minnesota Twin Cities</h2>
    <p>This website is maintained (you hope) by:</p>

    <div>
      <div class="profile-image">
        <img src="" alt="">
      </div>
      <div class="description">
        <h3></h3>
        <p>Lennon Macharia - a 4th year design and computer science student</p>
      </div>
    </div>
  </div>


</template>

<style scoped>
.about{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  text-align: left;
}

</style>