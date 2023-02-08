<template>
  <div class="contact__section">
    <TextBubble class="contact__text-bubble" tailDirection="bottom-right">
      <template #header>
        <Typewriter class="contact__header" textProp="Contact Me" delay="1s" />
      </template>
      <template #content>
        <div class="media__list">
          <div class="media__container">
            <Transition appear :style="{ animationDelay: '2s' }">
              <Icon
                icon="logos:google-gmail"
                class="media__icon"
                :height="mediaIconSize"
                :width="mediaIconSize"
              />
            </Transition>
            <a class="media__link" href="mailto:callistastefanie@gmail.com">
              <Typewriter textProp="Send Email" delay="2s" />
            </a>
          </div>
          <div class="media__container">
            <Transition appear :style="{ animationDelay: '3s' }">
              <Icon
                icon="logos:linkedin-icon"
                class="media__icon"
                :height="mediaIconSize"
                :width="mediaIconSize"
              />
            </Transition>
            <a
              class="media__link"
              href="https://www.linkedin.com/in/callistef/"
            >
              <Typewriter textProp="Linkedin" delay="3s" />
            </a>
          </div>
          <div class="media__container">
            <Transition appear :style="{ animationDelay: '4s' }">
              <Icon
                icon="mdi:github"
                class="media__icon"
                :height="mediaIconSize"
                :width="mediaIconSize"
              />
            </Transition>
            <a class="media__link" href="https://github.com/CalliStef">
              <Typewriter textProp="Github" delay="4s" />
            </a>
          </div>
        </div>
      </template>
    </TextBubble>
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
import Typewriter from "./Typewriter.vue";

export default defineComponent({
  name: "ContactSection",
  components: {
    Icon,
    TextBubble,
    Typewriter,
  },
  methods: {
    navigateHome() {
      this.$emit("navigateHome", { sectionName: "contact" });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 1200) {
        this.mediaIconSize = 30;
      } else {
        this.mediaIconSize = 10;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    if (this.windowWidth >= 1200) {
      this.windowWidth = 30;
    } else {
      this.windowWidth = 10;
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      mediaIconSize: 10,
    };
  },
});
</script>

<style scoped lang="scss">
.contact {
  &__header {
    padding-top: 0.5rem;
  }

  &__section {
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  &__text-bubble {
    left: 15%;
    top: 40%;
    gap: 0.2rem;
    width: 10rem;
  }

  &__button {
    position: absolute;
    bottom: 24%;
    left: 30.5%;
    z-index: 3;
    animation: moveUpDown 1s ease-in-out infinite;
  }
}

.media {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding-bottom: 0.5rem;
  }

  &__container {
    display: flex;
    gap: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  &__icon {
    animation: fadeIn 0.5s ease-in backwards;
  }

  &__link {
    text-decoration: none;
    color: $color-turquoise;
  }
}
</style>
