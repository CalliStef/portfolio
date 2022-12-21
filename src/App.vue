<template>
  <div class="main__layer">
    <div ref="home_layer" class="home__layer">
      <div class="home__layer--wall"></div>
      <div class="home__layer--floor"></div>
      <CharacterComponent class="home__scene"></CharacterComponent>
    </div>
    <Intro
      ref="intro__layer"
      @show-home="zoomHomeLayer"
      v-if="!showHome"
    ></Intro>
  </div>
</template>

<script lang="ts">
import Intro from "@/components/Intro.vue";
import CharacterComponent from "@/components/CharacterComponent.vue";
import Panzoom from "@panzoom/panzoom";

export default {
  name: "App",
  mounted() {
    const homeLayerElem = this.$refs.home_layer as HTMLElement;
    Panzoom(homeLayerElem, {
      startScale: 0,
      startY: 60,
      disablePan: true,
      cursor: "auto",
    });
  },
  methods: {
    zoomHomeLayer() {
      const homeLayerElem = this.$refs.home_layer as HTMLElement;
      const panzoom = Panzoom(homeLayerElem, {
        disablePan: true,
        cursor: "auto",
      });
      panzoom.zoom(1, { animate: true, duration: 800, easing: "ease-in-out" });
      panzoom.zoomIn;
      setTimeout(() => {
        this.showHome = true;
      }, 1000);
    },
  },
  components: {
    Intro,
    CharacterComponent,
  },
  data() {
    return {
      showHome: false,
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

.main__layer {
  width: 100vw;
  height: 100vh;
  background-color: $color-beige;
  touch-action: manipulation;
}

.home {
  &__layer {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: $color-beige;
    position: absolute;

    &--wall {
      display: flex;
      width: 100%;
      height: 36rem;
      background-color: $color-beige;
    }

    &--floor {
      display: flex;
      width: 100%;
      height: 17rem;
      background-color: $color-soft-orange;
    }
  }

  &__scene {
    width: 21rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 95%);
  }
}
</style>
