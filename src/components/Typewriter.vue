<template>
  <div class="typewriter__container">
    <Transition appear :style="{ animationDelay: delay }">
      <p class="typewriter__text" ref="type__text">{{ textProp }}</p>
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
    animation: typing 2s steps(30, end) backwards;
  }
}
</style>
