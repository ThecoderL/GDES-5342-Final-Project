<script setup>
import Facilities from "../pages/Facilities.vue";

</script>

<template>
  <div class="navigation">
      <router-link :to="{ name: 'Home' }" class="router-link">
        <div class="router-link-container">
          <img src="../assets/home.svg" alt="Home" />
          Home
        </div>
      </router-link>

      <router-link :to="{ name: 'Facilities' }" class="router-link">
        <div class="router-link-container">
          <img src="../assets/construction.svg" alt="Construction" />
          Facilities
        </div>
      </router-link>


      <router-link :to="{ name: 'About' }" class="router-link">
        <div class="router-link-container">
          <img src="../assets/list.svg" alt="Home" />
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
  background-color: #FFF3CE;
  border-radius: .5rem;
  padding: .5rem;
}

.active-link {
  border: 1px solid maroon
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
  background-color: #FFF3CE;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  padding: 1rem;
}

.router-link:hover {
  //border-color: maroon;
  box-shadow: rgb(0, 0, 0) 0px 10px 40px -10px;
}

span.material-icons {
  font-size: 1.25rem;
}

/* Desktop styles */
@media (min-width: 768px) {
  .navigation {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
