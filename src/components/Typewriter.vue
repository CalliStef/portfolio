<template>
  <p ref="type__text"></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Type-writer",
  props: {
    textProp: { type: String, required: true },
  },
  mounted() {
    console.log("this", this.textContent);
    this.animate();
  },
  methods: {
    animate() {
      if (this.characterIndex < this.textContent.length) {
        (this.$refs.type__text as HTMLElement).innerHTML +=
          this.textContent.charAt(this.characterIndex);
        this.characterIndex++;
        setTimeout(this.animate, 50);
      } else {
        this.$emit("typewriting-done");
      }
    },
  },
  data() {
    return {
      textContent: this.textProp,
      characterIndex: 0,
    };
  },
});
</script>

<style scoped lang="scss"></style>
