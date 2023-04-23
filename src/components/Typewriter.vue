<template>
  <p class="typewriter__text" ref="typeTextRef"></p>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "TypeWriter",
  props: {
    delay: { type: String, default: null },
    textProp: { type: String, required: true },
    skipAnimation: { type: Boolean },
  },
  setup(props) {
    const textContent = ref(props.textProp);
    const characterIndex = ref(0);
    const lineIndex = ref(0);
    const typeTextRef = ref<HTMLElement | null>(null);

    const startAnimation = () => {
      if (props.skipAnimation && typeTextRef.value) {
        typeTextRef.value.innerHTML = textContent.value;
        return;
      }
      let delayTime = parseInt(props.delay) * 1000;
      setTimeout(animate, delayTime);
    };

    const animate = () => {
      const lines = textContent.value.split("\n");
      const currentLine = lines[lineIndex.value];
      const escapeSequence = /\\n/g;
      let match = escapeSequence.exec(currentLine);

      if (characterIndex.value < currentLine.length && !props.skipAnimation ) {
        if (match !== null && match.index === characterIndex.value) {
          (typeTextRef.value as HTMLElement).innerHTML += "<br>";
          lineIndex.value++;
          characterIndex.value = 0;
          match = escapeSequence.exec(currentLine);
        }

        (typeTextRef.value as HTMLElement).innerHTML += currentLine.charAt(
          characterIndex.value
        );
        characterIndex.value++;
        setTimeout(animate, 50);
      } else if (lineIndex.value < lines.length - 1 && !props.skipAnimation) {
        (typeTextRef.value as HTMLElement).innerHTML += "<br>";
        lineIndex.value++;
        characterIndex.value = 0;
        setTimeout(animate, 50);
      }
    };

    const textElement = ref(null);

    watch(
      () => props.skipAnimation,
      (newState, prevState) => {
        if (newState !== prevState) {
          // If skipping is true, immediately show the entire remaining string
          const remainingText = textContent.value
            .substring(characterIndex.value)
            .replace(/\n/g, "<br>");
          (typeTextRef.value as HTMLElement).innerHTML += remainingText;
          characterIndex.value = textContent.value.length;
        }
      }
    );

    startAnimation();

    return {
      textElement,
      typeTextRef,
    };
  },
});
</script>

<style scoped lang="scss"></style>
