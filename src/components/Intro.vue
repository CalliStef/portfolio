<template>
  <!-- <div class="intro__layer"> -->
  <div ref="panzoom__element" class="intro__body">
    <Typewriter
      v-if="createHeader"
      class="intro__header"
      textProp="Welcome to my portfolio 👋"
    ></Typewriter>
    <DoorComponent
      class="intro__door"
      @door-open="zoomToHome"
      @door-rendered="callHeader"
    ></DoorComponent>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import DoorComponent from "./DoorComponent.vue";
import Typewriter from "./Typewriter.vue";
import Panzoom from "@panzoom/panzoom";
import { NONAME } from "dns";

export default {
  name: "Intro-layer",
  components: {
    DoorComponent,
    Typewriter,
  },
  methods: {
    callHeader() {
      console.log;
      setTimeout(() => {
        this.createHeader = true;
        this.$emit("render-home")
      }, 1500);
    },
    zoomToHome() {
      const elem = this.$refs.panzoom__element as HTMLElement;
      const panzoom = Panzoom(elem, { maxScale: 10 });
      panzoom.zoom(10, { animate: true, duration: 1000, easing: "ease-in-out" });
      panzoom.zoomIn;
      this.$emit("show-home");
    },
  },
  data() {
    return {
      createHeader: false,
    };
  },
};
</script>

<style scoped lang="scss">
.intro {
  /* &__layer{
    transition: all .2s ease-in;
  } */

  &__body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 2;
  }

  &__header {
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-medium;
  }

  &__door {
    animation: popOut 1s ease-in-out backwards;
  }
}
</style>
