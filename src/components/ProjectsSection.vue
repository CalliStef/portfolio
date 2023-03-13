<template>
  <div class="projects__page">
    <div class="projects__floor"></div>
    <div class="projects__content">
      <div class="projects__content--child animate-fadeInBottom">
        <div class="artifact__container">
          <h2 class="artifact__header text-left">Trash Queens</h2>
          <img
            class="artifact__thumbnail artifact__thumbnail--1"
            src="/assets/project-thumbnails/thumbnail-trashQueen.png"
          />
        </div>

        <div class="artifact__container">
          <h2 class="artifact__header text-right">Love is War</h2>
          <img
            class="artifact__thumbnail artifact__thumbnail--2"
            src="/assets/project-thumbnails/thumbnail-loveIsWar.png"
          />
        </div>
      </div>

      <div class="projects__content--child animate-fadeInTop">
        <div class="artifact__container">
          <img
            class="artifact__thumbnail artifact__thumbnail--3"
            src="/assets/project-thumbnails/thumbnail-pathfinder.png"
          />
          <h2 class="artifact__header text-left">Pathfinder</h2>
        </div>

        <div class="artifact__container">
          <img
            class="artifact__thumbnail artifact__thumbnail--4"
            src="/assets/project-thumbnails/thumbnail-innota.png"
          />
          <h2 class="artifact__header text-right">Innota Tech</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectsSection",
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.projects {
  &__page {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: $color-beige;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 20rem;
    gap: 0.5rem;
    left: 50%;
    top: 37%;
    transform: translate(-50%, -50%);

    &--child {
      display: flex;
      min-width: auto;
      height: 100%;
      /* flex-direction: column; */
      /* justify-content: center;
      align-items: center; */
      gap: 0.5rem;

      &:nth-child(1){
        align-items: end;
      }
    }
  }

  &__floor {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 14rem;
    background-color: $color-soft-orange;
  }
}

.artifact {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  &__header {
    width: 100%;
    margin: 0.5rem 0;
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-small;
    color: $color-black;


    
  }

  &__thumbnail {
    /* width: 100%;
    height: 100%; */
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.2);
    /* object-fit: contain; */
    object-fit: fill;

    &--1 {
      width: 10rem;
      height: 100%;
    }

    &--2 {
      width: 10rem;
      height: 100%;
    }

    &--3 {
      width: 7rem;
      height: 5rem;
    }

    &--4 {
      width: 10rem;
      height: 100%;
    }
  }
}
</style>
