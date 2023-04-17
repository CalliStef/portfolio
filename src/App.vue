<template>
  <div class="main__layer">
    <Intro
      ref="intro__layer"
      @show-home="zoomHomeLayer"
      v-if="!hideIntro"
    ></Intro>
    <Transition
      enter-active-class="animate-moveInLeft"
      leave-active-class="animate-moveOutLeft"
    >
      <div
        ref="home_layer"
        class="home__layer"
        v-show="!showProjects"
        @click.prevent="skipAnimation = true"
      >
        <div class="home__layer--wall"></div>
        <div class="home__layer--floor"></div>
        <template v-if="showHome">
          <div class="home__header-container">
            <Typewriter
              class="home__header home__header--black"
              :skipAnimation="skipAnimation"
              textProp="My name is Callista Stefanie Taswin,"
            />
            <Typewriter
              class="home__header home__header--blue"
              :skipAnimation="skipAnimation"
              textProp="Full-Stack Web Developer"
              :delay="skipAnimation ? '0s' : '2s'"
            />
            <Toolbar
              class="home__toolbar"
              :class="skipAnimation && 'animation-fadeIn'"
              :toolList="toolArr"
              delay="3s"
            />
          </div>
          <TextBubble
            class="text-bubble--contact home__text-bubble"
            :class="skipAnimation && 'animation-fadeIn'"
            delay="4s"
            tailDirection="bottom-right"
            @click="getSection('contact')"
          >
            <template #header>Contact</template>
          </TextBubble>

          <TextBubble
            class="text-bubble--about home__text-bubble"
            :class="skipAnimation && 'animation-fadeIn'"
            delay="5s"
            tailDirection="bottom-right"
            @click.prevent="getSection('about')"
          >
            <template #header>About</template>
          </TextBubble>

          <TextBubble
            class="text-bubble--projects home__text-bubble"
            :class="skipAnimation && 'animation-fadeIn'"
            delay="6s"
            tailDirection="top-left"
            @click.prevent="getSection('projects')"
          >
            <template #header>Projects</template>
          </TextBubble>
        </template>
        <div v-if="showContact || showAbout">
          <template v-if="showContact">
            <ContactSection @navigateHome="onNavigateHome" />
          </template>
          <template v-else-if="showAbout">
            <AboutSection @navigateHome="onNavigateHome" />
          </template>
        </div>

        <CharacterComponent class="home__scene" />
      </div>
    </Transition>

    <Transition
      enter-active-class="animate-moveInRight"
      leave-active-class="animate-moveOutRight"
    >
      <template v-if="showProjects">
        <ProjectsView @navigateHome="onNavigateHome" />
      </template>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import toolbar_data from "@/data/app_toolbar_data.json";
import Intro from "@/components/IntroLayer.vue";
import CharacterComponent from "@/components/Character.vue";
import TextBubble from "@/components/TextBubble.vue";
import Panzoom from "@panzoom/panzoom";
import Typewriter from "@/components/Typewriter.vue";
import Toolbar from "@/components/Toolbar.vue";
import ContactSection from "./components/Contact.vue";
import AboutSection from "./components/About.vue";
import ProjectsView from "./components/ProjectsSection.vue";

export default defineComponent({
  name: "App",
  components: {
    Intro,
    CharacterComponent,
    TextBubble,
    Typewriter,
    Toolbar,
    ContactSection,
    AboutSection,
    ProjectsView,
  },
  // mounted() {
  //   setTimeout(() => {
  //     if(!this.skipAnimation){ // if the user has not skipped the animation
  //       this.warning = true;
  //     }
  //   }, 2000);
  // },
  methods: {
    zoomHomeLayer() {
      this.homeLayerElem = this.$refs.home_layer as HTMLElement;
      this.homeLayerElem.classList.add("home__layer--zoom-in");
      this.panzoom = Panzoom(this.homeLayerElem, {
        disablePan: true,
        disableZoom: true,
        cursor: "auto",
      });
      setTimeout(() => {
        this.showHome = true;
        this.hideIntro = true;
      }, 1000);
    },
    onNavigateHome(sectionObject: { sectionName: string }) {
      const { sectionName } = sectionObject;

      this.skipAnimation = true;

      switch (sectionName) {
        case "contact":
          this.homeLayerElem.classList.add("home__layer--zoom-reset");
          this.homeLayerElem.classList.remove("home__layer--zoom-contact");
          this.showContact = false;
          break;
        case "about":
          this.homeLayerElem.classList.add("home__layer--zoom-reset");
          this.homeLayerElem.classList.remove("home__layer--zoom-about");
          this.showAbout = false;
          break;
        case "projects":
          this.homeLayerElem.classList.remove("home__layer--zoom-in");
          this.showProjects = false;
          break;
      }

      this.showHome = true;
    },
    getSection(sectionName: string) {
      this.homeLayerElem.classList.remove(
        "home__layer--zoom-in",
        "home__layer--zoom-reset"
      );
      switch (sectionName) {
        case "contact":
          this.homeLayerElem.classList.add("home__layer--zoom-contact");
          this.showContact = true;
          break;
        case "about":
          this.homeLayerElem.classList.add("home__layer--zoom-about");
          this.showAbout = true;
          break;
        case "projects":
          this.showProjects = true;
          break;
      }

      this.showHome = false;
    },
  },
  data() {
    return {
      skipAnimation: false,
      hideIntro: false,
      showHome: false,
      showContact: false,
      showAbout: false,
      showProjects: false,
      panzoom: null as any,
      warning: false,
      homeLayerElem: null as any as HTMLElement,
      toolArr: toolbar_data,
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
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: $color-beige;
  position: fixed;
}

.home {
  &__header {
    font-family: "FuzzyBubbles-Regular";
    font-size: 4.5vw;
    white-space: nowrap;

    @include respond(phones) {
      font-size: 3vw;
    }

    @include respond(tablets-portrait) {
      font-size: 2.5vw;
    }

    @include respond(tablets-landscape) {
      font-size: $font-size-big;
    }

    &-container {
      position: absolute;
      display: flex;
      flex-direction: column;
      min-width: auto;
      /* width: 20rem; */
      height: 100vw;
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

  /* &__toolbar {
    animation: fadeIn 1s ease-in-out 3s backwards;
  } */

  &__layer {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: $color-beige;
    position: absolute;
    transition: all 1s ease-in-out;
    transform: scale(0);
    /* left: 0;
    top: 0; */

    &--zoom-in {
      transition: all 1s ease-in-out;
      transition-property: transform, top, left, right;
      animation: zoomToFull 1s ease-in-out forwards;
      top: 0;
      left: 0;
      right: 0;
    }

    &--zoom-reset {
      transition: all 1s ease-in-out;
      animation: zoomToReset 1s ease-in-out forwards;
      /* transform: scale(1);
      top: 0;
      left: 0; */
    }

    &--zoom-contact {
      animation: zoomToContactOriginal 1s ease-in-out forwards;

      @include respond(phones) {
        animation: zoomToContactPhones 1s ease-in-out forwards;
      }

      @include respond(tablets-portrait) {
        animation: zoomToContactPortrait 1s ease-in-out forwards;
      }

      @include respond(tablets-landscape) {
        animation: zoomToContactLandscape 1s ease-in-out forwards;
      }

      @include respond(laptops) {
        animation: zoomToContactLaptops 1s ease-in-out forwards;
      }
    }

    &--zoom-about {
      animation: zoomToAboutOriginal 1s ease-in-out forwards;

      @include respond(phones) {
        animation: zoomToAboutPhones 1s ease-in-out forwards;
      }

      @include respond(tablets-portrait) {
        /* animation: zoomToAboutPortrait 1s ease-in-out forwards; */
      }

      @include respond(tablets-landscape) {
        animation: zoomToAboutLandscape 1s ease-in-out forwards;
      }

      @include respond(laptops) {
        /* animation: zoomToAboutLaptops 1s ease-in-out forwards; */
      }
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
      height: 60vw;
      background-color: $color-soft-orange;

      @include respond(phones) {
        height: 12rem;
      }

      @include respond(laptops) {
        height: 15.5vw;
      }
    }
  }

  &__sub-section {
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  &__text-bubble {
    width: 20vw;
    height: 5vw;
    cursor: pointer;

    @include respond(phones) {
      width: 15vw;
    }

    @include respond(tablets-landscape) {
      width: 10vw;
    }
  }

  &__scene {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 43%;
    transform: translate(-50%, 0);

    @include respond(phones) {
      width: 60%;
    }

    @include respond(tablets-portrait) {
      width: 50%;
    }

    @include respond(tablets-landscape) {
      width: 45%;
      left: 65%;
      top: 30%;
    }

    @include respond(laptops) {
      width: 35%;
    }

    @include respond(large-laptop-desktops) {
      width: 35%;
    }
  }
}

.text-bubble {
  &--contact {
    left: 10%;
    top: 52%;
    transition: all 0.2s;

    @include respond(phones) {
      left: 15%;
    }

    @include respond(tablets-portrait) {
      left: 25%;
    }

    @include respond(tablets-landscape) {
      left: 47%;
      top: 17rem;
    }

    @include respond(laptops) {
      top: 45%;
    }
  }

  &--about {
    left: 30%;
    top: 42%;

    @include respond(phones) {
      left: 35%;
    }

    @include respond(tablets-portrait) {
      left: 40%;
    }

    @include respond(tablets-landscape) {
      left: 55%;
      top: 12rem;
    }

    @include respond(laptops) {
      top: 30%;
    }
  }

  &--projects {
    right: 5%;
    top: 58%;

    @include respond(phones) {
      right: 10%;
      top: 60%;
    }

    @include respond(tablets-portrait) {
      right: 20%;
    }

    @include respond(tablets-landscape) {
      right: 15%;
      top: 55%;
    }
  }
}
</style>
