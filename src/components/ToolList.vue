<template>
  <div class="toolbar__container">
    <Icon
      v-for="(tool, index) in toolArr"
      :key="index"
      class="toolbar__icon"
      :icon="tool.toolIcon"
      :height="20"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "ToolList",
  components: {
    Icon,
  },
  mounted() {
    this.toolArr = JSON.parse(JSON.stringify(this.toolList));
  },
  props: {
    toolList: { type: Array, required: true },
  },
  data() {
    return {
      toolArr: [] as { toolName: string; toolIcon: string }[],
    };
  },
});
</script>

<style scoped lang="scss">
.toolbar {
  &__container {
    display: flex;
    margin: 0.5rem 0;
    width: 15rem;
    height: 2rem;
    justify-content: space-between;
    align-self: center;
    overflow: hidden;
    animation: move 4s infinite right linear;
  }
}
</style>
