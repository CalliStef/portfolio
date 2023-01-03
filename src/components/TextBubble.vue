<template>
  <div class="text-bubble">
    <div :class="['text-bubble__tail', getTailDirection]"></div>
    <h1 v-if="headerText">
      <Typewriter class="text-bubble__header" :textProp="headerText" />
    </h1>
    <main>
      <div v-if="toolArr" class="text-bubble__tools">
        <Typewriter class="text-bubble__tools" textProp="Tools used:" />
      </div>

      <div v-if="contentText">
        <Typewriter class="text-bubble__content" :textProp="contentText" />
      </div>
    </main>
  </div>
</template>

<!-- bottom left, bottom right, top left, top right -->

<script lang="ts">
import { defineComponent } from "vue";
import Typewriter from "./Typewriter.vue";

export default defineComponent({
  name: "text-bubble",
  components: {
    Typewriter,
  },
  props: {
    headerText: { type: String, default: null },
    tailDirection: { type: String, default: null },
    contentText: { type: String, default: null },
    toolArr: { type: Array, default: null },
  },
  methods: {
    name() {},
  },
  computed: {
    getTailDirection(): string {
      return this.tailDirection === "bottom-left"
        ? "text-bubble__tail--bottom-left"
        : this.tailDirection === "bottom-right"
        ? "text-bubble__tail--bottom-right"
        : this.tailDirection === "top-left"
        ? "text-bubble__tail--top-left"
        : this.tailDirection === "top-right"
        ? "text-bubble__tail--top-right"
        : "text-bubble__tail";
    },
  },
  data() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.text-bubble {
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-width: 6rem;
  min-height: 3.5rem;
  padding: 1rem;
  border-radius: 100%;
  background-color: $color-white;
  z-index: 2;
  animation: fadeIn 1s ease-in-out forwards;

  &__tail {
    display: block;
    position: absolute;
    width: 4rem;
    height: 2rem;
    background-color: $color-white;
    clip-path: polygon(0 0, 10% 100%, 50% 0);

    &--bottom-left {
      bottom: -0.5rem;
    }

    &--bottom-right {
      bottom: -1.8rem;
      right: 0;
      transform: rotateZ(65deg);
    }

    &--top-left{
      top: 0.5rem;
      transform: rotateZ(-335deg);
    }
  }

  &__header {
    text-align: center;
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-small;
  }

  &__tools,
  &__content {
    font-family: "FuzzyBubbles-Regular";
    font-size: $font-size-small;
  }
}
</style>
