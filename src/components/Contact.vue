<template>
  <div class="contact__section">
    <TextBubble
      class="contact__text-bubble"
      headerText="Contact me!"
      :contentText="textContent"
      tailDirection="bottom-right"
    />
    <Icon
      class="contact__button"
      :icon="'material-symbols:keyboard-double-arrow-down-rounded'"
      :color="'#0AC4B2'"
      :height="30"
      @click="navigateHome"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";
import TextBubble from "./TextBubble.vue";

export default defineComponent({
  name: "ContactSection",
  components: {
    Icon,
    TextBubble,
  },
  methods: {
    navigateHome() {
      this.$emit("navigateHome", { sectionName: "contact" });
    },
  },
  data() {
    return{}
  }
});
</script>

<style scoped lang="scss">
.contact {
  &__section{
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  &__text-bubble {
    /* left: 8%;
    top: -10%; */
    top: 30%;
    /* transform: translate(-50%, -50%); */
  }

  &__button {
    position: absolute;
    bottom: 35%;
    left: 25%;
    z-index: 3;
  }
}
</style>
