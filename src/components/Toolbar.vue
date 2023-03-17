<template>
  <Transition appear :style="{ animationDelay: delay }">
    <div class="toolbar__container">
      <Vue3Marquee :duration="20" v-if="toolArr.length > 10">
        <Icon
          v-for="(tool, index) in toolArr"
          :key="index"
          class="toolbar__icon"
          :icon="tool.toolIcon"
          :height="toolbarSize"
          :width="toolbarSize"
          :attributes="{ title: tool.toolName }"
        />
      </Vue3Marquee>
      <template v-else>
        <Icon
          v-for="(tool, index) in toolArr"
          :key="index"
          class="toolbar__icon"
          :icon="tool.toolIcon"
          :height="toolbarSize - 10"
          :width="toolbarSize - 10"
          :alt="tool.toolName"
          :attributes="{ title: tool.toolName }"
        />
      </template>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Toolbar",
  components: {
    Icon,
    Vue3Marquee,
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 992) {
        this.toolbarSize = 30;
      } else {
        this.toolbarSize = 20;
      }
    },
  },
  mounted() {
    this.toolArr = JSON.parse(JSON.stringify(this.toolList));
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    if (this.windowWidth >= 992) {
      this.toolbarSize = 30;
    } else {
      this.toolbarSize = 20;
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  props: {
    toolList: { type: Array, required: true },
    delay: { type: String, default: null },
  },
  data() {
    return {
      toolbarSize: 20,
      windowWidth: window.innerWidth,
      toolArr: [] as { toolName: string; toolIcon: string }[],
    };
  },
});
</script>

<style scoped lang="scss">
.toolbar {
  &__container {
    position: relative;
    display: flex;
    margin: 0.5rem 0;
    width: 15rem;
    height: 2rem;
    align-self: center;
    overflow: hidden;
    transition: all 0.2s;
    animation: fadeIn 1s ease-in-out backwards;

    @include respond(tablets-landscape) {
      width: 20rem;
      height: 2rem;
    }

    @include respond(laptops) {
      width: 25rem;
    }
  }

  &__icon {
    margin: 0 2px;
  }
}
</style>
