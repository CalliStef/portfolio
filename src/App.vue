<template>
  <div ref="panzoom__element" class="intro__body">
    <Typewriter
      v-if="createHeader"
      class="intro__header"
      textProp="Welcome to my portfolio 👋"
    ></Typewriter>

    <DoorComponent
      class="intro__door"
      @door-open="zoomToHome"
      @door-rendered="onAfterEnter"
    ></DoorComponent>
  </div>
</template>

<script lang="ts">
import DoorComponent from "@/components/DoorComponent.vue";
import Typewriter from "./components/Typewriter.vue";
import Panzoom from "@panzoom/panzoom";

export default {
  name: "App",
  components: {
    DoorComponent,
    Typewriter,
  },
  methods: {
    onAfterEnter() {
      console.log;
      setTimeout(() => {
        this.createHeader = true;
      }, 1500);
    },
    zoomToHome() {
      const elem = this.$refs.panzoom__element as HTMLElement;
      const panzoom = Panzoom(elem, { maxScale: 7 });
      panzoom.zoom(7, { animate: true, duration: 1000, easing: "ease-in-out" });
      panzoom.zoomIn;
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
@font-face {
  font-family: "FuzzyBubbles-Regular";
  src: local("FuzzyBubbles"),
    url("/assets/fonts/FuzzyBubbles-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "FuzzyBubbles-Bold";
  src: local("FuzzyBubbles"),
    url("/assets/fonts/FuzzyBubbles-Bold.ttf") format("truetype");
}

.intro {
  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: $color-beige;
  }

  &__header {
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-medium;
    bottom: 2rem;
  }

  &__door {
    animation: popOut 1s ease-in-out backwards;
  }
}
</style>
