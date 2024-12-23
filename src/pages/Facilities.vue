<script setup lang="ts">
import Navigation from "../components/Navigation.vue";
</script>

<template>
  <div class="facilities">
    <Navigation />
    <h1>Facilities</h1>
    <h2>
      To request routine services, call, or email the umn facilities team
    </h2>
    <div class="call">
      <span class="material-icons">phone</span>
      <h3><a href= “tel:612624-2900”>(612) 624-2900</a></h3>
    </div>
    <div class="call">
      <span class="material-icons">email</span>
      <h3><a href= "mailto:name@email.com">fmcc@umn.edu</a></h3>
    </div>
  </div>
</template>

<style scoped>
.facilities {
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: left;
}

a{
  text-decoration: none;
  color: white;
}

.call {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  border: 2px solid white;
  border-radius: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;
}

span.material-icons {
  font-size: 1.5rem;
}

/* Desktop styles */
@media (min-width: 768px) {

  .call {
    display: flex;
    justify-content: center;
  }
}
</style>
