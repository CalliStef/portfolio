<template>
  <div class="about__section" ref="about_section">
    <TextBubble
      class="about__text-bubble"
      :tailDirection="windowWidth >= 576 ? 'top-left' : 'top-right'"
    >
      <template #header>
        <Typewriter
          class="about__header"
          textProp="About Me"
          delay="1s"
          :skipAnimation="skipAnimation"
        />
      </template>
      <template #tools>
        <Transition appear style="animation-delay: 2s">
          <a
            :class="skipAnimation && 'animation-fadeIn'"
            class="about__link"
            @click.prevent="
              linkClick(
                'https://docs.google.com/document/d/14MfHKtOMJofq5K8wylBVjPLYxPO6FPBbbVpJT0lWIQ0/edit?usp=sharing'
              )
            "
          >
            RESUME
          </a>
        </Transition>
      </template>
      <template #content>
        <div class="about__content">
          <Typewriter
            textProp="I'm Stefanie, a Full-Stack web developer from Jakarta, now in Vancouver, Canada. My pronouns are she/her. 
          
          I've started my programming journey since 2021. I love to build interfaces that will showcase my love for web development as well as designing my work. 

          I value in continous learning, experience, collaboration, and quality.
          
          Nice to meet you! :)"
            delay="2s"
            :skipAnimation="skipAnimation"
          />
        </div>
      </template>
    </TextBubble>
    <Icon
      class="about__button"
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
  name: "AboutSection",
  components: {
    TextBubble,
    Typewriter,
    Icon,
  },
  computed: {
    // getFileUrl(){
    //   const newFile = new Blob('')
    // }
  },
  methods: {
    linkClick(url: string) {
      window.open(url, "_blank");
    },
    skipAnimationListener() {
      console.log("skip animation listener", this.skipAnimation); // should always false
      this.skipAnimation = true;
      this.aboutSection?.removeEventListener(
        "click",
        this.skipAnimationListener,
        false
      );
    },
    navigateHome() {
      this.$emit("navigateHome", { sectionName: "about" });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      this.homeIconSize = 30;
    },
  },
  mounted() {
    this.aboutSection = this.$refs.about_section as HTMLElement;
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });

    this.skipAnimation = false;
    this.aboutSection?.addEventListener(
      "click",
      this.skipAnimationListener,
      false
    );

    this.homeIconSize = 30;
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
    this.aboutSection?.removeEventListener(
      "click",
      this.skipAnimationListener,
      false
    );
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      homeIconSize: 20,
      skipAnimation: false,
      aboutSection: null as HTMLElement | null,
    };
  },
});
</script>

<style scoped lang="scss">
.about {
  &__section {
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
    z-index: 2;
  }

  &__header {
    padding-top: 0.3rem;
    font-size: $font-size-small;
  }

  &__content {
    display: flex;
    padding: 0 0.5rem 0.5rem 0.5rem;
    width: 8rem;
    height: 4rem;
    text-align: center;
    font-size: $font-size-xs-small;

    @include respond(laptops) {
      width: 13rem;
    }
  }

  &__link {
    text-decoration: none;
    display: flex;
    font-family: FuzzyBubbles-Bold;
    font-size: $font-size-xs-small;
    color: white;
    background-color: $color-turquoise;
    border: none;
    border-radius: 4rem;
    justify-self: center;
    transition: all 0.2s ease-in-out;
    margin-bottom: 0.2rem;
    padding: 0.1rem 0.3rem;
    animation: fadeIn 0.5s ease-in-out backwards;
    cursor: pointer;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0px 1px 1px $color-white-variant;
    }

    &:active {
      transform: translateY(-0.5px);
      box-shadow: 0px 1px 1px $color-white-variant;
    }
  }

  &__text-bubble {
    left: 43%;
    bottom: 23%;
    gap: 0.2rem;
    z-index: 5;
    width: 10.5rem;
    height: 8.5rem;
    padding: 1rem;
    display: flex;
    justify-content: start;
    align-items: center;

    @include respond(small-phones) {
      left: 48%;
    }

    @include respond(phones) {
      left: 55%;
    }

    @include respond(tablets-portrait) {
      left: 63%;
      bottom: 27%;
    }

    @include respond(tablets-landscape) {
      left: 78%;
      bottom: 40%;
    }

    @include respond(laptops) {
      left: 78%;
      width: 17vw;
      height: 12vw;
      justify-content: center;
    }
  }

  &__button {
    position: absolute;
    bottom: 22%;
    right: 32%;
    z-index: 5;
    animation: moveUpDown 1s ease-in-out infinite;
    transform: translateX(-50%);

    @include respond(small-phones) {
      right: 25%;
    }

    @include respond(phones) {
      right: 33%;
      bottom: 20%;
    }

    @include respond(tablets-portrait) {
      right: 34%;
    }

    @include respond(tablets-landscape) {
      right: 20%;
      bottom: 38%;
    }

    @include respond(laptops) {
      right: 21%;
    }
  }
}
</style>
