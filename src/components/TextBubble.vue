<template>
  <Transition appear :style="{ animationDelay: delay }">
    <div class="text-bubble">
      <div :class="['text-bubble__tail', getTailDirection]"></div>
      <div class="text-bubble__header">
        <slot name="header"> </slot>
      </div>
      <div class="text-bubble__tools">
        <slot name="tools"> </slot>
      </div>
      <div class="text-bubble__content">
        <slot name="content"> </slot>
      </div>
    </div>
  </Transition>
</template>

<!-- bottom left, bottom right, top left, top right -->

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "text-bubble",
  components: {},
  props: {
    delay: { type: String, default: null },
    headerText: { type: String, default: null },
    tailDirection: { type: String, default: null },
    contentText: { type: String, default: null },
    toolArr: { type: Array, default: null },
  },
  methods: {},
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
  animation: popOut 1s ease-in-out backwards;

  @include respond(tablets-landscape) {
    min-width: 8rem;
    min-height: 5rem;
  }

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
      bottom: -1.3rem;
      right: 0;
      transform: rotateZ(65deg);
    }

    &--top-left {
      top: 0.5rem;
      left: 2rem;
      transform: rotateZ(-348deg);
    }

    &--top-right {
      top: 0.5rem;
      right: 1.5rem;
      transform: rotateZ(-304deg);
    }
  }

  &__header {
    text-align: center;
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-small;

    @include respond(tablets-landscape) {
      font-size: $font-size-medium;
    }
  }

  &__tools,
  &__content {
    font-family: "FuzzyBubbles-Regular";
    font-size: $font-size-xs-small;

    @include respond(tablets-landscape) {
      font-size: $font-size-small;
    }
  }

  &__content {
    overflow-y: scroll;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }

  &__content::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
}
</style>
