<script setup lang="ts">
const props = defineProps<{
  number: number;
}>();
</script>

<template>

  <div class="bathroom-card">
    <div class="bathroom-card-img">
      <img src="../assets/Bathroom.jpg" alt="">
    </div>
    <div class="bathroom-card-content">
      <h3>Bathroom {{ props.number }}</h3>
      <div class="bathroom-card-ratings">
        <p class="p-transparent">4.6</p>
        <div class="bathroom-card-stars">
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
        </div>
        <p class="p-transparent">(64)</p>
      </div>
      <div class="bathroom-card-amenities-section">
        <div class="best-building-bathroom">
          <span class="material-icons maroon">stars</span>
          <p><span class="red">Best building bathroom</span></p>
        </div>
        <div class="bathroom-card-amenities-list">
          <span class="material-icons">soap</span>
          <span class="material-icons">meeting_room</span>
          <span class="material-icons">meeting_room</span>
<!--          <span class="material-icons">print_connect</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

h1, h2, h3, h4, p{
  margin: 0;
}

h3{
  font-size: 1.25rem;
}
p{
  font-size: .75rem;
}

.bathroom-card{
  display: flex;
  flex-direction: row;
  color: black;
  background-color: white;
  border: 2px gray solid;
  border-radius: .5rem;
  width: 100%;
}

.bathroom-card-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  border: 1px gray solid;
  padding-bottom: .5rem;
  padding-right: .5rem;
  padding-left: 1rem;
  gap: .25rem;
  width: 100%;

}

img {
  //width: 100%;
  height: 100%;
  max-width: 160px; /* For larger screens */
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.best-building-bathroom{
  display: flex;
  align-items: center;
  gap: 2px;
  background: #eddee1;
  padding: .25rem .25rem .125rem .125rem;
  border-radius: .25rem;

}

.bathroom-card-ratings{
  display: flex;
  align-items: center;
  gap: .5rem;
}

.bathroom-card-stars{
  display: flex;
  align-items: center;
}

.bathroom-card-amenities-section{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
}

.red{
  color: maroon;
}

.p-transparent{
  color: #474747;
}


@media (max-width: 768px) {
  .bathroom-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .bathroom-card-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    border: 0px;
  }
  .best-building-bathroom{
    display: flex;
    align-items: center;
    gap: 2px;
    background: #eddee1;
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: .25rem;
  }

  .bathroom-card-ratings{
    display: flex;
    align-items: center;
    gap: .5rem;
  }

  .bathroom-card-stars{
    display: flex;
    align-items: center;
  }

  .bathroom-card-amenities-section{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
  }

  img {
    max-width: none;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .material-icons {
    font-size: 18px;
  }

  h3{
    font-size: 1rem;
  }
  p{
    font-size: .5rem;
  }
}

.material-icons.md-12 { font-size: 12px; }
.material-icons.md-16 { font-size: 16px; }
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }

.material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
.material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }
.material-icons.md-light { color: rgba(255, 255, 255, 1); }
.material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }
.material-icons.maroon { color: #7A0019; }

.material-icons.maroon { color: #7A0019; }
</style>