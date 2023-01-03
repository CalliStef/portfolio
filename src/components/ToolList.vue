<template>
  <div class="toolbar__container">
    <!-- <Trasition class="toolbar__list" tag="ul"> -->
    <Vue3Marquee :duration="10">
      <TransitionGroup name="toolbar__icon" >
        <Icon
          v-for="(tool, index) in toolArr"
          :key="index"
          class="toolbar__icon"
          :icon="tool.toolIcon"
          :height="20"
        />
      </TransitionGroup>
    </Vue3Marquee>
    <!-- </Trasition> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";
import { Vue3Marquee } from "vue3-marquee";
import 'vue3-marquee/dist/style.css';

export default defineComponent({
  name: "ToolList",
  components: {
    Icon,
    Vue3Marquee,
  },
  methods: {},
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
    position: relative;
    display: flex;
    margin: 0.5rem 0;
    width: 15rem;
    height: 2rem;
    align-self: center;
    overflow: hidden;
  }

  &__icon{
    margin: 0 2px;
  }
}
</style>
