<template>
  <p class="typewriter__text" ref="type__text" ></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Type-writer",
  props: {
    delay: { type: String, default: null },
    textProp: { type: String, required: true },
    skipAnimation: { type: Boolean },
  },
  mounted() {
    console.log('skip', this.delay)
    if (!this.skipAnimation) {
      let delayTime = parseInt(this.delay) * 1000;
      setTimeout(this.animate, delayTime);
    } else {
      this.animate();
    }
  },
  watch: {
    skipAnimation: function (newState, prevState) {
      if (newState === true) {
        this.$forceUpdate();
      }
    },
  },
  methods: {
    animate() {
      const lines = this.textContent.split("\n");
      const currentLine = lines[this.lineIndex];
      const escapeSequence = /\\n/g;
      let match = escapeSequence.exec(currentLine);

      if (this.characterIndex < currentLine.length && !this.skipAnimation) {
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
      } else if (this.lineIndex < lines.length - 1 && !this.skipAnimation) {
        (this.$refs.type__text as HTMLElement).innerHTML += "<br>";
        this.lineIndex++;
        this.characterIndex = 0;
        setTimeout(this.animate, 50);
      } else if (this.skipAnimation) {
        // If skipping is true, immediately show the entire remaining string
        const remainingText = lines
          .slice(this.lineIndex)
          .join("<br>")
          .substring(this.characterIndex)
          .replace(/\n/g, "<br>");
        (this.$refs.type__text as HTMLElement).innerHTML += remainingText;
        this.characterIndex = currentLine.length;
      }
    },
    skipAnimate() {
      (this.$refs.type__text as HTMLElement).innerHTML = "";
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

<style scoped lang="scss"></style>
