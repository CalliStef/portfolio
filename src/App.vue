<template>
  <div class="main__layer">
      <Intro
        ref="intro__layer"
        @show-home="zoomHomeLayer"
        v-if="!hideIntro"
      ></Intro>
    <div ref="home_layer" class="home__layer">
      <div class="home__layer--wall"></div>
      <div class="home__layer--floor"></div>
      <template v-if="showHome">
        <div class="home__header-container">
          <Typewriter
            class="home__header home__header--black"
            textProp="My name is Callista Stefanie Taswin,"
          />
          <Typewriter
            class="home__header home__header--blue"
            textProp="Full-Stack Web Developer"
            delay="2s"
          />
          <Toolbar class="home__toolbar" :toolList="toolArr" />
        </div>
        <TextBubble
          class="text-bubble--contact"
          delay="4s"
          tailDirection="bottom-right"
          @click="getSection(90, -40, 'contact')"
        >
          <template #header>
            <Typewriter textProp="Contact" delay="1s" />
          </template>
        </TextBubble>

        <TextBubble
          class="text-bubble--about"
          delay="5s"
          tailDirection="bottom-right"
          @click="getSection(-60, -100, 'about')"
        >
          <template #header>About</template>
        </TextBubble>

        <TextBubble
          class="text-bubble--projects"
          delay="6s"
          tailDirection="top-left"
        >
          <template #header>Projects</template>
        </TextBubble>
      </template>
      <div v-if="showContact || showAbout">
        <template v-if="showContact">
          <ContactSection @navigateHome="onNavigateHome" />
        </template>
        <template v-else-if="showAbout"> </template>
      </div>

      <CharacterComponent class="home__scene" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Intro from "@/components/IntroLayer.vue";
import CharacterComponent from "@/components/Character.vue";
import TextBubble from "@/components/TextBubble.vue";
import Panzoom from "@panzoom/panzoom";
import Typewriter from "@/components/Typewriter.vue";
import Toolbar from "@/components/Toolbar.vue";
import ContactSection from "./components/Contact.vue";

export default defineComponent({
  name: "App",
  components: {
    Intro,
    CharacterComponent,
    TextBubble,
    Typewriter,
    Toolbar,
    ContactSection,
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
        duration: 1000,
        easing: "ease-in-out",
      });
      this.panzoom.zoomIn;
      setTimeout(() => {
        this.showHome = true;
        this.hideIntro = true;
      }, 1000);
    },
    onNavigateHome(sectionName: string) {
      console.log("section name", sectionName);

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
          toolName: "Express.js",
          toolIcon: "logos:express",
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
        {
          toolName: "Docker",
          toolIcon: "logos:docker-icon",
        },
        {
          toolName: "MongoDB",
          toolIcon: "skill-icons:mongodb",
        },
        {
          toolName: "Socket.IO",
          toolIcon: "logos:socket-io",
        },
        {
          toolName: "Typescript",
          toolIcon: "logos:typescript-icon",
        },
        {
          toolName: "PHP",
          toolIcon: "logos:php",
        },
        {
          toolName: "C#",
          toolIcon: "logos:c-sharp",
        },
        {
          toolName: ".NET",
          toolIcon: "skill-icons:dotnet",
        },
      ],
    };
  },
});
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


.home {
  &__header {
    font-family: "FuzzyBubbles-Regular";
    font-size: $font-size-medium;

    @include respond(tab-land) {
      font-size: $font-size-big;
    }

    &-container {
      position: absolute;
      display: flex;
      flex-direction: column;
      min-width: auto;
      /* width: 20rem; */
      height: 10rem;
      text-align: center;
      left: 50%;
      top: 20%;
      transform: translate(-50%, 0);

      @include respond(tab-land) {
        left: 30%;
        top: 40%;
        text-align: left;
      }
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
    animation: fadeIn 1s ease-in-out 3s backwards;


    &--wall {
      display: flex;
      width: 100%;
      height: 36rem;
      background-color: $color-beige;
    }

    &--floor {
      display: flex;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 17rem;
      background-color: $color-soft-orange;
    }
  }

  &__sub-section {
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  &__scene {
    width: 21rem;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, 0);

    @include respond(tab-land) {
      width: 30rem;
      left: 65%;
      top: 25%;
    }
  }
}

.text-bubble {
  /* &__nav:hover{
    animation: scaleUpDown 1.5s ease 0s infinite backwards;
  } */

  &--contact {
    left: 2rem;
    top: 25rem;
    transition: all 0.2s;

    @include respond(tab-land) {
      left: 42rem;
      top: 18rem;
    }
  }

  &--about {
    left: 8rem;
    top: 20rem;

    @include respond(tab-land) {
      left: 50rem;
      top: 12rem;
    }
  }

  &--projects {
    right: 1rem;
    top: 30rem;

    @include respond(tab-land) {
      right: 15rem;
      top: 25rem;
    }
  }
}
</style>
