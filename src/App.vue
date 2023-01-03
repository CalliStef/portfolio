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
        />
        <TextBubble
          class="text-bubble_about"
          headerText="About Me"
          tailDirection="bottom-right"
        />
        <TextBubble
          class="text-bubble_projects"
          headerText="Projects"
          tailDirection="top-left"
        />
      </template>

      <CharacterComponent class="home__scene"></CharacterComponent>
    </div>
    <Intro
      ref="intro__layer"
      @show-home="zoomHomeLayer"
      v-if="!showHome"
    ></Intro>
  </div>
</template>

<script lang="ts">
import Intro from "@/components/IntroLayer.vue";
import CharacterComponent from "@/components/Character.vue";
import TextBubble from "@/components/TextBubble.vue";
import Panzoom from "@panzoom/panzoom";
import Typewriter from "./components/Typewriter.vue";
import Toolbar from "./components/Toolbar.vue";

export default {
  name: "App",
  components: {
    Intro,
    CharacterComponent,
    TextBubble,
    Typewriter,
    Toolbar,
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
      const homeLayerElem = this.$refs.home_layer as HTMLElement;
      const panzoom = Panzoom(homeLayerElem, {
        disablePan: true,
        cursor: "auto",
      });
      panzoom.zoom(1, { animate: true, duration: 800, easing: "ease-in-out" });
      panzoom.zoomIn;
      setTimeout(() => {
        this.showHome = true;
      }, 1000);
    },
  },
  data() {
    return {
      showHome: false,
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

.stagger-enter-active .home__header--blue {
  color: red;
  transition-delay: 2s;
}

.home {
  &__header {
    font-family: "FuzzyBubbles-Regular";
    font-size: $font-size-medium;

    &--transition {
      &-enter-active {
        transition-delay: 1s;
      }
    }

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
    animation: fadeIn 1s ease-in-out forwards;
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
  &_contact {
    left: 2rem;
    top: 25rem;
  }

  &_about {
    left: 8rem;
    top: 20rem;
  }

  &_projects {
    right: 1rem;
    top: 30rem;
  }
}
</style>
