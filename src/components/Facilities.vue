<script setup lang="ts">
import Navigation from "./Navigation.vue";

</script>

<template>
  <div class="facilities">
    <Navigation/>
    <h1>Facilities</h1>
    <h2>To Request Routine Services, Call, Email or use our Non-Emergency Online Self Service</h2>
    <div class="call">
      <span class="material-icons">phone</span>
      <h3> (612) 624-2900</h3>
    </div>
  </div>
</template>

<style scoped>
h1{
  text-align: left;
}

.facilities{
  text-align: left;
  height: 100%;
}

.call{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border: .25rem solid white;
  border-radius: .5rem;
  width: 50%;
}



</style>