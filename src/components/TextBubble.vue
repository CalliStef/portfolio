<template>
  <div class="textBubble">
    <h1>
      <slot name="header">
        <Typewriter
          class="textBubble__header"
          textProp="Project Name"
        ></Typewriter>
      </slot>
    </h1>
    <main>
      <slot name="tools">
        <Typewriter
          class="textBubble__tools"
          textProp="Tools used:"
        ></Typewriter>
      </slot>
      <slot name="content">
        <Typewriter
          class="textBubble__content"
          textProp="Text Bubble Content"
        ></Typewriter>
      </slot>
    </main>
  </div>
</template>

<!-- down left, down right, top left, top right -->

<script lang="ts">
import { defineComponent } from "vue";
import Typewriter from "./Typewriter.vue";

export default defineComponent({
  name: "TextBubble",
  components: {
    Typewriter,
  },
  props: {},
  methods: {
    name() {},
  },
  data() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.textBubble {

  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-width: 6rem;
  min-height: 3.5rem;
  padding: 2rem;
  border-radius: 100%;
  overflow: hidden;
  background-color: $color-white;

  &__header {
    text-align: center;
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-medium;
  }

  &__tools {
    font-family: "FuzzyBubbles-Regular";
    font-size: $font-size-small;
  }

  &__content {
    font-family: "FuzzyBubbles-Regular";
    font-size: $font-size-small;
  }
}
</style>
