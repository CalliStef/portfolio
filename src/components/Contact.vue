<template>
  <div class="contact__section" @click.prevent="skipAnimate">
    <TextBubble class="contact__text-bubble" tailDirection="bottom-right">
      <template #header>
        <Typewriter
          class="contact__header"
          textProp="Contact Me"
          delay="1s"
          :skip-animation="skipAnimation"
        />
      </template>
      <template #content>
        <div class="media__list">
          <a
            class="media__link"
            @click.prevent="linkClick('mailto:callistastefanie@gmail.com')"
          >
            <div class="media__container">
              <Transition
                appear
                :style="{ animationDelay: !skipAnimation ? '2s' : '' }"
              >
                <Icon
                  icon="logos:google-gmail"
                  class="media__icon"
                  :height="mediaIconSize"
                  :width="mediaIconSize"
                />
              </Transition>

              <Typewriter
                textProp="Send Email"
                delay="2s"
                :skip-animation="skipAnimation"
              />
            </div>
          </a>
          <a
            class="media__link"
            @click.prevent="linkClick('https://www.linkedin.com/in/callistef/')"
          >
            <div class="media__container">
              <Transition
                appear
                :style="{ animationDelay: !skipAnimation ? '3s' : '' }"
              >
                <Icon
                  icon="logos:linkedin-icon"
                  class="media__icon"
                  :height="mediaIconSize"
                  :width="mediaIconSize"
                />
              </Transition>

              <Typewriter
                textProp="Linkedin"
                delay="3s"
                :skip-animation="skipAnimation"
              />
            </div>
          </a>
          <a
            class="media__link"
            @click.prevent="linkClick('https://github.com/CalliStef')"
          >
            <div class="media__container">
              <Transition
                appear
                :style="{ animationDelay: !skipAnimation ? '4s' : '' }"
              >
                <Icon
                  icon="mdi:github"
                  class="media__icon"
                  :height="mediaIconSize"
                  :width="mediaIconSize"
                  color="#000000"
                />
              </Transition>
              <Typewriter
                textProp="Github"
                delay="4s"
                :skip-animation="skipAnimation"
              />
            </div>
          </a>
        </div>
      </template>
    </TextBubble>
    <Icon
      class="contact__button"
      :icon="'material-symbols:keyboard-double-arrow-down-rounded'"
      :color="'#0AC4B2'"
      :height="homeIconSize"
      :width="homeIconSize"
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
    linkClick(url: string) {
      window.open(url, "_blank");
    },
    skipAnimate() {
      this.skipAnimation = true;
    },
    navigateHome() {
      this.$emit("navigateHome", { sectionName: "contact" });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 992) {
        this.mediaIconSize = 20;
        this.homeIconSize = 40;
      } else {
        this.mediaIconSize = 10;
        this.homeIconSize = 30;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    if (this.windowWidth >= 992) {
      this.mediaIconSize = 20;
      this.homeIconSize = 40;
    } else {
      this.mediaIconSize = 10;
      this.homeIconSize = 30;
    }

    this.skipAnimation = false;
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      mediaIconSize: 10,
      homeIconSize: 20,
      skipAnimation: false,
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
    left: 10%;
    top: 40%;
    gap: 0.2rem;
    width: 10rem;
    justify-content: center;
    align-items: center;

    @include respond(small-phones) {
      left: 8%;
      top: 43%;
    }

    @include respond(phones) {
      left: 20%;
      top: 43%;
    }

    @include respond(tablets-portrait) {
      left: 20%;
    }

    @include respond(tablets-landscape) {
      left: 20%;
      top: 40%;
      width: 17vw;
      height: 12vw;
    }

    @include respond(laptops) {
      left: 25%;
    }
  }

  &__button {
    position: absolute;
    bottom: 24%;
    left: 26%;
    animation: moveUpDown 1s ease-in-out infinite;
    transform: translateX(-50%);
    z-index: 5;
    cursor: pointer;

    @include respond(taller-devices) {
      bottom: 20%;
    }

    @include respond(small-phones) {
      left: 26%;
    }

    @include respond(phones) {
      left: 33%;
    }

    @include respond(tablets-portrait) {
      left: 32%;
    }

    @include respond(tablets-landscape) {
      left: 40%;
    }

    @include respond(laptops) {
      left: 42%;
    }
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
    align-items: center;
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
    font-size: 0.5rem;
    cursor: pointer;

    @include respond(tablets-landscape) {
      font-size: $font-size-small;
    }
  }
}
</style>
