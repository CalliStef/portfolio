<template>
  <div class="projects__page">
    <div class="projects__floor"></div>
    <h1 class="projects__header">Projects</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectsSection",
});
</script>

<style lang="scss" scoped>
.projects {
  &__header {
    position: absolute;
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-small;
    color: $color-black;
  }

  &__page {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: $color-beige;
  }

  &__floor {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 17rem;
    background-color: $color-soft-orange;
  }
}
</style>
