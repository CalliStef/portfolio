<template>
  <div
    class="typewriter__container"
    :class="isHomeAnimated && 'animation-disabled'"
  >
    <Transition appear :style="{ animationDelay: delay }">
      <p
        class="typewriter__text"
        :class="isHomeAnimated && 'animation-disabled'"
        ref="type__text"
      >
        {{ textProp }}
      </p>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Type-writer",
  props: {
    delay: { type: String, default: null },
    textProp: { type: String, required: true },
    isHomeAnimated: { type: Boolean },
  },
  computed: {},
  methods: {},
  data() {
    return {
      textContent: this.textProp,
      characterIndex: 0,
    };
  },
});
</script>

<style scoped lang="scss">
.typewriter {
  &__container &__text {
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    animation: typing 1.5s steps(20, end) backwards;
  }
}
</style>
