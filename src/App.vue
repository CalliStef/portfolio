<template>
  <div class="main__layer" @touchmove.prevent.stop>
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
import { useMeta } from "vue-meta";
import Intro from "@/components/IntroLayer.vue";
import CharacterComponent from "@/components/Character.vue";
import TextBubble from "@/components/TextBubble.vue";
import Panzoom from "@panzoom/panzoom";
import Typewriter from "@/components/Typewriter.vue";
import Toolbar from "@/components/Toolbar.vue";
import ContactSection from "./components/Contact.vue";

export default defineComponent({
  name: "App",
  setup() {
    useMeta({
      title: "Callista Stefanie Taswin",
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    });
  },
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
    // Panzoom(homeLayerElem, {
    //   startScale: 0,
    //   startY: 60,
    //   disablePan: true,
    //   cursor: "auto",
    // });
  },
  methods: {
    preventMove(e: any) {
      console.log("HELLO", e);
      e.preventDefault();
      e.stopPropagation();
    },
    zoomHomeLayer() {
      this.homeLayerElem = this.$refs.home_layer as HTMLElement;
      this.homeLayerElem.classList.add('home__layer--zoom-in');
      this.panzoom = Panzoom(this.homeLayerElem, {
        disablePan: true,
        cursor: "auto",
      });
      // this.panzoom.zoom(1, {
      //   animate: true,
      //   duration: 1000,
      //   easing: "ease-in-out",
      //   force: true,
      // });
      // this.panzoom.zoomIn;
      setTimeout(() => {
        this.showHome = true;
        this.hideIntro = true;
      }, 1000);
    },
    onNavigateHome(sectionObject: { sectionName: string }) {
      const { sectionName } = sectionObject;

      switch(sectionName){
        case 'contact':
          this.homeLayerElem.classList.remove('home__layer--zoom-contact');
          this.showContact = false;
          break;
        case 'about':
          this.homeLayerElem.classList.remove('home__layer--zoom-about');
          this.showAbout = false;
          break;
      }

      this.showHome = true;
      this.homeLayerElem.classList.add('home__layer--zoom-reset');
    
    },
    getSection(x: number, y: number, sectionName: string) {
      this.showHome = false;
      switch(sectionName) {
        case 'contact':
          this.homeLayerElem.classList.remove('home__layer--zoom-in');
          this.homeLayerElem.classList.add('home__layer--zoom-contact');
          this.showContact = true;
          break;
        case 'about':
          this.showAbout = true;
          break;
        case 'projects':
          this.getProjectPage();
      }
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
  position:relative;
  width: 100vw;
  height: 100vh;
  background-color: $color-beige;
  touch-action: manipulation;
  position: fixed;
}

.home {
  &__header {
    font-family: "FuzzyBubbles-Regular";
    font-size: $font-size-medium;

    @include respond(tablets-landscape) {
      font-size: $font-size-medium;
    }

    @include respond(laptops) {
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

      @include respond(tablets-landscape) {
        left: 25%;
        top: 40%;
        text-align: left;
      }

      @include respond(laptops) {
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
    transition: all 1s ease-in-out;
    /* animation: fadeIn 1s ease-in-out 3s backwards; */
    transform: scale(0);

    &--zoom-in{
      animation: zoomToFull 1s ease-in-out forwards;
      top: 0;
      left: 0;
    }

    &--zoom-reset{
      transform: scale(0);
      top: 0;
      left: 0;
    }

    &--zoom-contact{
      animation: zoomToContact 1s ease-in-out forwards;
    }

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

    @include respond(tablets-landscape) {
      width: 25rem;
      left: 65%;
      top: 25%;
    }

    @include respond(laptops) {
      width: 30rem;
    }
  }
}

.text-bubble {
  /* &__nav:hover{
    animation: scaleUpDown 1.5s ease 0s infinite backwards;
  } */

  &--contact {
    left: 25%;
    top: 25rem;
    transition: all 0.2s;
    transform: translateX(-50%);

    @include respond(tablets-portrait) {
      left: 30%;
    }

    @include respond(tablets-landscape) {
      left: 50%;
      top: 18rem;
    }
  }

  &--about {
    left: 40%;
    top: 20rem;
    transform: translateX(-50%);

    @include respond(tablets-portrait) {
      left: 40%;
    }

    @include respond(tablets-landscape) {
      left: 60%;
      top: 12rem;
    }
  }

  &--projects {
    right: 5%;
    top: 30rem;
    transform: translateX(-50%);

    @include respond(tablets-portrait) {
      right: 20%;
    }

    @include respond(tablets-landscape) {
      right: 3%;
      top: 25rem;
    }
  }
}
</style>
