<template>
  <div class="main__layer">
    <div ref="home_layer" class="home__layer">
      <div class="home__layer--wall"></div>
      <div class="home__layer--floor"></div>
      <template v-if="showHome">
        <div class="home__header-container">
          <Typewriter
            class="home__header home__header--black"
            textProp="My name is Callista Stefanie Taswin, Full-Stack Web Developer"
          ></Typewriter>
          <!-- <Typewriter
              class="home__header home__header--blue"
              textProp="Full-Stack Web Developer"
            >
            </Typewriter> -->
          <Toolbar class="home__toolbar" :toolList="toolArr" />
        </div>
        <TextBubble
          class="text-bubble_contact"
          headerText="Contact"
          tailDirection="bottom-right"
          @click="getSection(90, -40, 'contact')"
        />
        <TextBubble
          class="text-bubble_about"
          headerText="About Me"
          tailDirection="bottom-right"
          @click="getSection(-60, -100, 'about')"
        />
        <TextBubble
          class="text-bubble_projects"
          headerText="Projects"
          tailDirection="top-left"
        />
      </template>
      <div class="home__sub-section" v-if="showContact || showAbout">
        <template v-if="showContact">
          <TextBubble
            class="contact__text-bubble"
            headerText="Contact"
            contentText="email,phonenumber"
          />
        </template>
        <template v-if="showAbout"> </template>
        <Icon
          class="home__button"
          :icon="'material-symbols:keyboard-double-arrow-down-rounded'"
          :color="'#0AC4B2'"
          :height="30"
          @click="navigateHome('contact')"
        />
      </div>

      <CharacterComponent ref="home_something" class="home__scene" />
    </div>
    <Intro
      ref="intro__layer"
      @show-home="zoomHomeLayer"
      v-if="!hideIntro"
    ></Intro>
  </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
import Intro from "@/components/IntroLayer.vue";
import CharacterComponent from "@/components/Character.vue";
import TextBubble from "@/components/TextBubble.vue";
import Panzoom from "@panzoom/panzoom";
import Typewriter from "@/components/Typewriter.vue";
import Toolbar from "@/components/Toolbar.vue";

export default {
  name: "App",
  components: {
    Intro,
    CharacterComponent,
    TextBubble,
    Typewriter,
    Toolbar,
    Icon,
  },
  mounted() {
    const homeLayerElem = this.$refs.home_layer as HTMLElement;
    Panzoom(homeLayerElem, {
      startScale: 0,
      startY: 60,
      disablePan: true,
      cursor: "auto",
    });
  },
  methods: {
    zoomHomeLayer() {
      this.homeLayerElem = this.$refs.home_layer as HTMLElement;
      this.panzoom = Panzoom(this.homeLayerElem, {
        disablePan: true,
        cursor: "auto",
      });
      this.panzoom.zoom(1, {
        animate: true,
        duration: 800,
        easing: "ease-in-out",
      });
      this.panzoom.zoomIn;
      setTimeout(() => {
        this.showHome = true;
        this.hideIntro = true;
      }, 1000);
    },
    navigateHome(sectionName: string) {
      // this.panzoom.pan(0, 0, { force: true, relative: true });

      // this.panzoom.zoom(1, {
      //   animate: true,
      //   duration: 800,
      //   easing: "ease-in-out",
      // });
      this.panzoom.reset({
        animate: true,
        duration: 800,
        easing: "ease-in-out",
      });

      sectionName === "contact"
        ? (this.showContact = false)
        : (this.showAbout = false);

      // this.panzoom.zoomOut;
      this.showHome = true;
    },
    getSection(x: number, y: number, sectionName: string) {
      this.panzoom.pan(x, y, { force: true, relative: true });
      this.panzoom.zoom(2, {
        animate: true,
        duration: 800,
        easing: "ease-in-out",
      });
      this.panzoom.zoomIn;
      this.showHome = false;
      sectionName === "contact"
        ? (this.showContact = true)
        : sectionName === "about"
        ? (this.showAbout = true)
        : this.getProjectPage();
    },
    getProjectPage() {},
  },
  data() {
    return {
      hideIntro: false,
      showHome: false,
      showContact: false,
      showAbout: false,
      panzoom: null as any,
      homeLayerElem: null as any as HTMLElement,
      toolArr: [
        {
          toolName: "HTML",
          toolIcon: "vscode-icons:file-type-html",
        },
        {
          toolName: "CSS",
          toolIcon: "vscode-icons:file-type-css",
        },
        {
          toolName: "SASS",
          toolIcon: "logos:sass",
        },
        {
          toolName: "Javascript",
          toolIcon: "logos:javascript",
        },
        {
          toolName: "React",
          toolIcon: "logos:react",
        },
        {
          toolName: "Next.js",
          toolIcon: "logos:nextjs-icon",
        },
        {
          toolName: "Vue",
          toolIcon: "logos:vue",
        },
        {
          toolName: "Node.js",
          toolIcon: "logos:nodejs-icon",
        },
        {
          toolName: "MySQL",
          toolIcon: "logos:mysql-icon",
        },
        {
          toolName: "Prisma",
          toolIcon: "vscode-icons:file-type-light-prisma",
        },
        {
          toolName: "Storybook",
          toolIcon: "logos:storybook-icon",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: "FuzzyBubbles-Regular";
  src: local("FuzzyBubbles"),
    url("/assets/fonts/FuzzyBubbles-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "FuzzyBubbles-Bold";
  src: local("FuzzyBubbles"),
    url("/assets/fonts/FuzzyBubbles-Bold.ttf") format("truetype");
}

.main__layer {
  width: 100vw;
  height: 100vh;
  background-color: $color-beige;
  touch-action: manipulation;
}

.wait {
  &-enter-active {
    transition-delay: 2s;
  }
}

.home {
  &__header {
    font-family: "FuzzyBubbles-Regular";
    font-size: $font-size-medium;

    &-container {
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 20rem;
      height: 10rem;
      text-align: center;
      left: 50%;
      top: 20%;
      transform: translate(-50%, 0);
    }

    &--black {
      color: $color-black;
    }

    &--blue {
      color: $color-turquoise;
    }
  }

  &__toolbar {
    animation: fadeIn 1s ease-in-out 3s backwards;
  }

  &__layer {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: $color-beige;
    position: absolute;

    &--wall {
      display: flex;
      width: 100%;
      height: 36rem;
      background-color: $color-beige;
    }

    &--floor {
      display: flex;
      width: 100%;
      height: 17rem;
      background-color: $color-soft-orange;
    }
  }

  &__scene {
    width: 21rem;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, 0);
  }
}

.text-bubble {
  /* &__nav:hover{
    animation: scaleUpDown 1.5s ease 0s infinite backwards;
  } */

  &_contact {
    left: 2rem;
    top: 25rem;
    animation-delay: 4s;
  }

  &_about {
    left: 8rem;
    top: 20rem;
    animation-delay: 5s;
  }

  &_projects {
    right: 1rem;
    top: 30rem;
    animation-delay: 6s;
  }
}
</style>
