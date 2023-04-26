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
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import { Icon } from "@iconify/vue";
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";

interface Tool {
  toolName: string;
  toolIcon: string;
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Toolbar",
  components: {
    Icon,
    Vue3Marquee,
  },
  props: {
    toolList: { type: Array, required: true },
    delay: { type: String, default: null },
  },
  setup(props) {
    const toolbarSize = ref(20);
    const windowWidth = ref(window.innerWidth);
    const toolArr = ref([] as Tool[]);

    const onResize = () => {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value >= 768) {
        toolbarSize.value = 30;
      } else {
        toolbarSize.value = 20;
      }
    };

    onMounted(() => {
      toolArr.value = JSON.parse(JSON.stringify(props.toolList));
      window.addEventListener("resize", onResize);
      if (windowWidth.value >= 768) {
        toolbarSize.value = 30;
      } else {
        toolbarSize.value = 20;
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", onResize);
    });

    return {
      toolbarSize,
      windowWidth,
      toolArr,
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
      width: 25vw;
      height: 2vw;
    }
  }

  &__icon {
    margin: 0 2px;
  }
}
</style>
