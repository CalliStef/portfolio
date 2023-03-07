<template>
  <p
    class="typewriter__text"
    :class="isHomeAnimated && 'animation-fadeIn'"
    ref="type__text"
  ></p>
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
  mounted() {
    if (!this.isHomeAnimated) {
      let delayTime = parseInt(this.delay) * 1000;
      setTimeout(this.animate, delayTime);
    } else {
      this.skipAnimate();
    }
  },
  methods: {
    animate() {
      const lines = this.textContent.split("\n");
      const currentLine = lines[this.lineIndex];
      const escapeSequence = /\\n/g;
      let match = escapeSequence.exec(currentLine);

      if (this.characterIndex < currentLine.length) {
        if (match !== null && match.index === this.characterIndex) {
          (this.$refs.type__text as HTMLElement).innerHTML += "<br>";
          this.lineIndex++;
          this.characterIndex = 0;
          match = escapeSequence.exec(currentLine);
        }

        (this.$refs.type__text as HTMLElement).innerHTML += currentLine.charAt(
          this.characterIndex
        );
        this.characterIndex++;
        setTimeout(this.animate, 50);
      } else if (this.lineIndex < lines.length - 1) {
        (this.$refs.type__text as HTMLElement).innerHTML += "<br>";
        this.lineIndex++;
        this.characterIndex = 0;
        setTimeout(this.animate, 50);
      }
    },
    skipAnimate() {
      (this.$refs.type__text as HTMLElement).innerHTML = this.textContent;
    },
  },
  data() {
    return {
      textContent: this.textProp,
      characterIndex: 0,
      lineIndex: 0,
    };
  },
});
</script>

<style scoped lang="scss">

</style>
