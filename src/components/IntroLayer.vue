<template>
  <!-- <div class="intro__layer"> -->
  <div ref="panzoom__element" class="intro__body">
    <div class="intro__content">
      <div class="intro__header-container">
        <Typewriter
          class="intro__header"
          textProp="Welcome to my portfolio"
          delay="1s"
        />
        <Transition
          appear
          name="intro__emoji"
          :style="{ transitionDelay: '3s' }"
        >
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png"
            alt="Waving Hand"
            width="30"
            height="30"
        /></Transition>
      </div>
      <DoorComponent
        ref="door"
        class="intro__door"
        @door-open="zoomToHome"
      ></DoorComponent>
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import DoorComponent from "./Door.vue";
import Typewriter from "./Typewriter.vue";
import Panzoom from "@panzoom/panzoom";

export default {
  name: "Intro-layer",
  components: {
    DoorComponent,
    Typewriter,
  },
  methods: {
    zoomToHome() {
      const elem = this.$refs.panzoom__element as HTMLElement;
      const panzoom = Panzoom(elem, {
        maxScale: 20,
        disablePan: true,
        cursor: "auto",
      });
      panzoom.zoom(20, {
        animate: true,
        duration: 1000,
        easing: "ease-in-out",
      });
      panzoom.zoomIn;
      this.$emit("show-home");
    },
  },
  data() {
    return {
      // createHeader: false,
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
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    position: absolute;
    /* background-color: $color-beige; */
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: auto;
    height: auto;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in;

    /* @include respond(tab-land) {
      flex-direction: row;
    } */
  }

  &__header {
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-medium;
    text-align: center;

    @include respond(tab-land) {
      font-size: $font-size-big;
    }

    &-container {
      display: flex;
      gap: 0.2rem;
      align-items: flex-end;

      @include respond(tab-land) {
        /* order: 2; */
      }
    }
  }

  &__emoji-enter-active,
  &__emoji-leave-active {
    transition: opacity 0.5s ease;
  }

  &__emoji-enter-from,
  &__emoji-leave-to {
    opacity: 0;
  }

  &__door {
    animation: popOut 1s ease-in-out backwards;
  }
}
</style>
