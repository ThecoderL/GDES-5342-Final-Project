<script setup lang="ts">
import // Data
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const paramID = route.params.id
const bathroom = bathroomData.data.filter(bathroom => bathroom.id === parmID)[0]

onMounted(()=>{
  if(!bathroom){
    router.push({
      name: "Home"
    });
  }
})

</script>

<template>



</template>

<style scoped>

</style>