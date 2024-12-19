<script setup>
import Facilities from "./Facilities.vue";

</script>

<template>
<div class="facilities">
  <button class="button">
    <span class="material-icons">home</span>
    <router-link :to="{ name: 'Home' }">
      Home
    </router-link>
  </button>

  <button class="button">
    <span class="material-icons">construction</span>
    <router-link :to="{ name: 'Facilities' }">
      Facilities
    </router-link>
  </button>

  <button class="button">
    <span class="material-icons">list</span>
    <router-link :to="{ name: 'About' }">
      About
    </router-link>
  </button>
</div>

</template>

<style scoped>

.facilities{
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.button{
  display: flex;
  gap: .5rem;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: black;
  background-color: white;
}

</style>