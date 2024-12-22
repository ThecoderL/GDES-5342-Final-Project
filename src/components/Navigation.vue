<script setup>
import Facilities from "../pages/Facilities.vue";
</script>

<template>
  <div class="navigation">
      <router-link :to="{ name: 'Home' }" class="router-link">
        <div class="router-link-container">
          <span class="material-icons">home</span>
          Home
        </div>
      </router-link>

      <router-link :to="{ name: 'Facilities' }" class="router-link">
        <div class="router-link-container">
          <span class="material-icons">construction</span>
          Facilities
        </div>
      </router-link>


      <router-link :to="{ name: 'About' }" class="router-link">
        <div class="router-link-container">
          <span class="material-icons">list</span>
          About
        </div>
      </router-link>

  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  border-radius: .5rem;
  padding: 1rem;
}

.active-link {
  color: maroon;
  border-color: maroon;
}

.exact-active-link {
  font-weight: 700;
  border: 2px solid maroon !important;
}

.router-link-container{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
}
.router-link{
  display: flex;
  justify-content: center;
  align-items: center;
  color: maroon;
  text-decoration: none;
  background-color: white;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.router-link:hover {
  background-color: #fffefe; /* Add hover effect */
  border-color: maroon;
}

span.material-icons {
  font-size: 1.25rem;
}

/* Desktop styles */
@media (min-width: 768px) {
  .navigation {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
