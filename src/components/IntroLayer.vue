<template>
  <div ref="introLayerRef" class="intro__body">
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
          :style="{ transitionDelay: '2.3s' }"
        >
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png"
            alt="Waving Hand"
            width="30"
            height="30"
          />
        </Transition>
      </div>
      <DoorComponent ref="door" class="intro__door" @door-open="zoomToHome" />
      <p class="intro__warning">👉 Click anywhere to skip the animations 👈</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DoorComponent from "./Door.vue";
import Typewriter from "./Typewriter.vue";
import Panzoom from "@panzoom/panzoom";

export default defineComponent({
  name: "Intro-layer",
  components: {
    DoorComponent,
    Typewriter,
  },
  setup(_, context) {
    const introLayerRef = ref<HTMLElement | null>(null);
    const doorRef = ref<InstanceType<typeof DoorComponent> | null>(null);


    const zoomToHome = () => {
      const elem = introLayerRef.value as HTMLElement;
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
      context.emit("show-home");
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        (doorRef.value as InstanceType<typeof DoorComponent>).doorOpen(); 
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        (doorRef.value as InstanceType<typeof DoorComponent>).doorOpen(); 
      }
    };

    // Attaching event listeners on mounted
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("wheel", handleWheel);

    return {
      doorRef,
      introLayerRef,
      zoomToHome,
    };
  },
});
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
    transition: all 0.2s ease-in;
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

    /* @include respond(tablets-landscape) {
      flex-direction: row;
    } */
  }

  &__warning {
    font-size: $font-size-small;
    font-family: "FuzzyBubbles-Bold";
    color: $color-soft-orange;
    white-space: nowrap;
    text-align: center;
    top: 60vh;
    position: absolute;

    @include respond(tablets-portrait) {
      font-size: $font-size-medium;
    }
  }

  &__header {
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-small;
    text-align: center;

    @include respond(tablets-portrait) {
      font-size: $font-size-medium;
    }

    &-container {
      display: flex;
      gap: 0.2rem;
      align-items: flex-end;

      @include respond(tablets-portrait) {
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
