<template>
  <div>
    <Icon icon="" />
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
  props: {
    toolArr: { type: Array, required: true },
  },
  data() {
    return {};
  },
});
</script>

<style scoped lang="scss">
</style>
