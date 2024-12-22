<script setup lang="ts">
import Navigation from "../components/Navigation.vue";
</script>

<template>
  <div class="facilities">
    <Navigation />
    <h1>Facilities</h1>
    <h2>
      To Request Routine Services, Call, Email or use our Non-Emergency Online
      Self Service
    </h2>
    <div class="call">
      <span class="material-icons">phone</span>
      <h3>(612) 624-2900</h3>
    </div>
  </div>
</template>

<style scoped>
.facilities {
  text-align: left;
  height: 100%;
}

h2 {
  font-size: 1rem;
  margin-top: 0.5rem;
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
}

span.material-icons {
  font-size: 1.5rem;
}

/* Desktop styles */
@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  .call {
    display: flex;
    justify-content: center;
  }
}
</style>
