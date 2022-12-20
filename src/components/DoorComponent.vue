<template>
  <svg
    id="door"
    data-name="door"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 423.21 493.41"
  >
    <g id="door_group" data-name="door group">
      <ellipse
        id="door__shadow"
        class="cls-3"
        cx="211.61"
        cy="485.16"
        rx="211.61"
        ry="8.25"
      />
      <g id="door__body" data-name="door body" @click="doorOpen()">
        <polygon
          id="door__frame"
          class="cls-4"
          points="90.67 482.91 90.67 0 321.72 0 321.72 482.91 309.23 482.91 310.62 10.41 101.77 11.8 102.47 482.91 90.67 482.91"
        />

        <g id="door__inner" :class="{ doorOpened: isOpen }">
          <rect
            class="cls-1"
            x="101.77"
            y="10.41"
            width="208.85"
            height="472.51"
          />
          <rect
            class="cls-5"
            x="143.51"
            y="49.09"
            width="43.24"
            height="197.57"
          />
          <rect
            class="cls-5"
            x="229.11"
            y="49.09"
            width="43.24"
            height="197.57"
          />
          <rect
            class="cls-5"
            x="143.51"
            y="313.34"
            width="43.24"
            height="134.67"
          />
          <rect
            class="cls-5"
            x="229.11"
            y="313.34"
            width="43.24"
            height="134.67"
          />
          <circle id="door__knob" class="cls-2" cx="290" cy="280.63" r="10" />
        </g>
        <!-- </transition> -->
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DoorComponent",
  methods: {
    doorOpen: function () {
      this.isOpen = true;
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
});
</script>

<style scoped>
svg {
  width: 11.065rem;
}

#door__body {
  position: relative;
}

#door__inner {
  width: 87.37px;
  height: 197.67px;
  position: absolute;
  transform-origin: 101.77px 10.41px;
  transform: perspective(500px);
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out;
}

#door__body:hover #door__inner {
  transform: rotateY(-20deg);
}

.doorOpened {
  transform: rotateY(-150deg) !important;
}

.cls-1 {
  fill: #00a99d;
}

.cls-2 {
  fill: #fceeaa;
}

.cls-3 {
  fill: #b3b3b3;
}

.cls-4 {
  fill: #0ac4b2;
}

.cls-5 {
  fill: none;
  stroke: #1c8c83;
  stroke-miterlimit: 10;
  stroke-width: 13px;
}
</style>
