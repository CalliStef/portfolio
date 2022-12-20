<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import DoorComponent from "@/components/DoorComponent.vue"
// import CharacterComponent from "@/components/CharacterComponent.vue"
</script>

<template>

  <div class="intro__body">
    <h1 class="intro__header">Welcome to my portfolio 👋</h1>
    <DoorComponent></DoorComponent>
  </div>
</template>

<style scoped lang="scss">

@font-face {
  font-family: "FuzzyBubbles-Regular";
  src: local("FuzzyBubbles"),
    url('/assets/fonts/FuzzyBubbles-Regular.ttf') format("truetype");
}

@font-face {
  font-family: "FuzzyBubbles-Bold";
  src: local("FuzzyBubbles"),
    url('/assets/fonts/FuzzyBubbles-Bold.ttf') format("truetype");
}

.intro{


  &__body{

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: $color-beige;

  }

  &__header{
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-medium;
    bottom: 2rem;
  }
  
}
</style>
