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
import { defineComponent, ref, onBeforeUnmount } from "vue";
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
  setup(_, context) {
    const windowWidth = ref(window.innerWidth);
    const mediaIconSize = ref(windowWidth.value >= 992 ? 20 : 10);
    const homeIconSize = ref(windowWidth.value >= 992 ? 40 : 30);
    const skipAnimation = ref(false);

    const linkClick = (url: string) => {
      window.open(url, "_blank");
    };

    const skipAnimate = () => {
      skipAnimation.value = true;
    };

    const navigateHome = () => {
      context.emit("navigateHome", { sectionName: "contact" });
    };

    const onResize = () => {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value >= 992) {
        mediaIconSize.value = 20;
        homeIconSize.value = 40;
      } else {
        mediaIconSize.value = 10;
        homeIconSize.value = 30;
      }
    };

    window.addEventListener("resize", onResize);

    onBeforeUnmount(() => {
      window.removeEventListener("resize", onResize);
    });

    return {
      windowWidth,
      mediaIconSize,
      homeIconSize,
      skipAnimation,
      linkClick,
      skipAnimate,
      navigateHome,
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
