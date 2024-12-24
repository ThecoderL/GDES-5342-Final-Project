<script setup lang="ts">
import Navigation from "../components/Navigation.vue";
import Lennon from "../assets/Lennon.jpg"
</script>

<template>
  <div class="about">
    <Navigation/>
    <h1>About</h1>
    <h2>This is your go-to location for all things bathrooms here @ the University of Minnesota Twin Cities</h2>
    <p>This website is maintained (you hope) by:</p>

    <div class="profile">
      <div class="profile-image">
        <img :src="Lennon" alt="">
      </div>
      <div class="description">
        <h2>Lennon Macharia</h2>
        <p>A 4th year design and computer science student</p>
        <br>
        <p>You can find him on LinkedIn: <a href="https://www.linkedin.com/in/lennon-macharia/">lennonmacharia</a></p>
        <p>You can reach him via Email: <a href="mailto:lennonmacharia@gmail.com">lennonmacharia@gmail.com</a></p>
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

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 2px solid white;
  border-radius: 0.5rem;
}

.profile-image img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
}

@media (min-width: 768px) {
  .profile {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }

  .profile-image img {
    width: 250px;
    height: 250px;
  }
}

</style>