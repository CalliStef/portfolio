<template>
  <div ref="projects_page" class="projects__page">
    <Icon
      v-if="!showProjectContent"
      class="projects__button"
      :icon="'material-symbols:keyboard-double-arrow-left-rounded'"
      :color="'#0AC4B2'"
      :height="projectIconSize"
      :width="projectIconSize"
      @click="navigateHome"
    />
    <div class="projects__floor"></div>
    <div class="projects__content">
      <div class="projects__content--child animate-fadeInBottom">
        <div class="artifact__container">
          <h2 class="artifact__header text-left">Trash Queens</h2>
          <img
            class="artifact__thumbnail artifact__thumbnail--1 artifact__thumbnail--hover-animated"
            src="/assets/project-thumbnails/thumbnail-trashQueen.png"
            @click="getProjectContent('trashQueens', $event)"
          />
        </div>

        <div class="artifact__container">
          <h2 class="artifact__header text-right">Love is War</h2>
          <img
            class="artifact__thumbnail artifact__thumbnail--2 artifact__thumbnail--hover-animated"
            src="/assets/project-thumbnails/thumbnail-loveIsWar.png"
            @click="getProjectContent('loveIsWar', $event)"
          />
        </div>
      </div>

      <div class="projects__content--child animate-fadeInTop">
        <div class="artifact__container">
          <img
            class="artifact__thumbnail artifact__thumbnail--3 artifact__thumbnail--hover-animated"
            src="/assets/project-thumbnails/thumbnail-pathfinder.png"
            @click="getProjectContent('pathfinder', $event)"
          />
          <h2 class="artifact__header text-left">Pathfinder</h2>
        </div>

        <div class="artifact__container">
          <img
            class="artifact__thumbnail artifact__thumbnail--4 artifact__thumbnail--hover-animated"
            src="/assets/project-thumbnails/thumbnail-innota.png"
            @click="getProjectContent('innota', $event)"
          />
          <h2 class="artifact__header text-right">Innota Tech</h2>
        </div>
      </div>
    </div>

    <template v-if="showProjectContent">
      <TextBubble
        class="artifact__text-bubble"
        :class="`artifact__text-bubble--${currentProject?.dataName}`"
        delay="1s"
        tailDirection="bottom-left"
      >
        <template #header>
          <Typewriter
            class="artifact__name"
            :textProp="currentProject?.name!"
            delay="2s"
            :skipAnimation="skipAnimation"
          />
        </template>
        <template #tools>
          <div
            v-if="currentProject?.githubLink && currentProject?.productionLink"
            class="media__container"
          >
            <Transition
              appear
              :style="{ animationDelay: !skipAnimation ? '3s' : '' }"
            >
              <Icon
                icon="mdi:github"
                class="media__icon"
                :height="mediaIconSize"
                :width="mediaIconSize"
              />
            </Transition>
            <a
              class="media__link"
              :href="currentProject?.githubLink!"
              target="_blank"
            >
              <Typewriter
                textProp="Github site"
                delay="4s"
                :skipAnimation="skipAnimation"
              />
            </a>
            <Transition
              appear
              :style="{ animationDelay: !skipAnimation ? '5s' : '' }"
            >
              <Icon
                icon="ph:globe"
                class="media__icon"
                :height="mediaIconSize"
                :width="mediaIconSize"
              />
            </Transition>
            <a
              class="media__link"
              :href="currentProject?.productionLink!"
              target="_blank"
            >
              <Typewriter
                textProp="Live site"
                delay="6s"
                :skipAnimation="skipAnimation"
              />
            </a>
          </div>
          <div class="artifact__tools-container">
            <Typewriter
              textProp="Tools used:"
              :delay="
                (!currentProject?.githubLink &&
                  !currentProject?.productionLink &&
                  '3s') ||
                '7s'
              "
              :skipAnimation="skipAnimation"
            />
            <Toolbar
              class="artifact__toolbar"
              :toolList="currentProject?.tools!"
              :delay="
                (!currentProject?.githubLink &&
                  !currentProject?.productionLink &&
                  !skipAnimation &&
                  '4s') ||
                (!skipAnimation && '8s') ||
                '0s'
              "
            />
          </div>
        </template>
        <template #content>
          <Typewriter
            class="artifact__description text-center"
            :textProp="currentProject?.description!"
            :skipAnimation="skipAnimation"
            :delay="
              (!currentProject?.githubLink &&
                !currentProject?.productionLink &&
                '5s') ||
              '9s'
            "
          />
        </template>
      </TextBubble>

      <Icon
        class="artifact__button"
        :icon="'material-symbols:keyboard-double-arrow-down-rounded'"
        :color="'#0AC4B2'"
        :height="mediaIconSize + 10"
        :width="mediaIconSize + 10"
        @click.prevent="hideProjectContent(currentProject?.dataName!)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { Icon } from "@iconify/vue";
import type { Project } from "@/models";
import projectsData from "@/data/projects_data.json";
import TextBubble from "./TextBubble.vue";
import Toolbar from "./Toolbar.vue";
import Typewriter from "./Typewriter.vue";

interface ProjectsProps {
  [projectName: string]: Project;
}

export default defineComponent({
  name: "ProjectsSection",
  components: {
    Icon,
    TextBubble,
    Typewriter,
    Toolbar,
  },
  data() {
    return {
      projectIconSize: 50,
      windowWidth: window.innerWidth,
      projectsData: projectsData as ProjectsProps,
      currentProject: null as Project | null,
      showProjectContent: false,
      mediaIconSize: 10,
      skipAnimation: false,
      selectedThumbnail: null as HTMLElement | null,
    };
  },
  methods: {
    skipAnimationListener() {
      console.log("skip animation listener", this.skipAnimation); // should always false
      this.skipAnimation = true;
      window.removeEventListener("click", this.skipAnimationListener, false);
    },
    navigateHome() {
      this.$emit("navigateHome", { sectionName: "projects" });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 992) {
        this.projectIconSize = 70;
        this.mediaIconSize = 20;
      } else {
        this.projectIconSize = 50;
        this.mediaIconSize = 10;
      }
    },
    hideProjectContent(projectName: string) {
      this.skipAnimation = false;
      const projectPageNode = this.$refs.projects_page as HTMLElement;

      // if show other projects
      this.showProjectContent = false;
      const hiddenProjects = projectPageNode.querySelectorAll(".pointer-none");

      hiddenProjects.forEach((project) => {
        project.classList.remove("animate-fadeOut", "pointer-none");
      });

      this.selectedThumbnail?.classList.add(
        "artifact__thumbnail--hover-animated"
      );

      projectPageNode.classList.remove("zoom--" + projectName);
    },
    getProjectContent(projectName: string, event: MouseEvent) {
      const projectPageNode = this.$refs.projects_page as HTMLElement;
      this.selectedThumbnail = event.target as HTMLElement;

      const parentThumbnail = this.selectedThumbnail.parentNode as HTMLElement;

      const artifaceHeader = parentThumbnail.querySelector(
        ".artifact__header"
      ) as HTMLElement;

      artifaceHeader.classList.add("animate-fadeOut", "pointer-none");
      this.selectedThumbnail.classList.remove(
        "artifact__thumbnail--hover-animated"
      );
      parentThumbnail.classList.add("pointer-none");

      const artifactContainers = projectPageNode.querySelectorAll(
        ".artifact__container"
      );

      artifactContainers.forEach((container) => {
        if (container !== this.selectedThumbnail?.parentElement) {
          container.classList.add("animate-fadeOut", "pointer-none");
        }
      });

      projectPageNode.classList.add("zoom--" + projectName);

      this.currentProject = toRaw(this.projectsData[projectName]);
      this.showProjectContent = true;
      this.skipAnimation = false;
      setTimeout(() => {
        window.addEventListener("click", this.skipAnimationListener, false);
        const artifactButton = projectPageNode.querySelector(
          ".artifact__button"
        ) as HTMLElement;
        artifactButton.classList.add("artifact__button--" + projectName);
      }, 1000);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    if (this.windowWidth >= 992) {
      this.projectIconSize = 70;
      this.mediaIconSize = 20;
    } else {
      this.projectIconSize = 50;
      this.mediaIconSize = 10;
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
});
</script>

<style lang="scss" scoped>
.projects {
  &__page {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    transform: scale(1);
    top: 0;
    left: 0;
    background-color: $color-beige;
    transition: all 1s ease-in-out;
    transition-property: transform, top, left;
  }

  &__button {
    position: absolute;
    top: 50%;
    left: 2%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 80%;
    gap: 0.5rem;
    left: 50%;
    top: 37%;
    transform: translate(-50%, -50%);

    @include respond(tablets-portrait) {
      width: 50%;
      gap: 1rem;
    }

    &--child {
      display: flex;
      min-width: auto;
      height: 100%;
      gap: 0.5rem;

      @include respond(tablets-portrait) {
        gap: 1rem;
      }

      &:nth-child(1) {
        align-items: end;
      }

      &:nth-child(2) {
        align-items: start;
      }
    }
  }

  &__floor {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 120%;
    height: 15.5vw;
    background-color: $color-soft-orange;
  }
}

.zoom {
  &--trashQueens {
    transform: scale(2);
    left: 40%;
    top: 10%;

    @include respond(phones) {
      transform: scale(2);
      top: 15%;
    }

    @include respond(tablets-portrait) {
      // still vertical
      transform: scale(2);
      left: 25%;
      top: 15%;
    }

    @include respond(tablets-landscape) {
      // horizontal
      transform: scale(1.5);
      left: -5%;
      top: 30%;
    }

    @include respond(laptops) {
      left: -5%;
      top: 35%;
    }
  }

  &--loveIsWar {
    transform: scale(2);
    left: -40%;
    top: 10%;

    @include respond(tablets-portrait) {
      transform: scale(2);
      left: -25%;
      top: 15%;
    }

    @include respond(tablets-landscape) {
      transform: scale(1.5);
      left: -45%;
      top: 30%;
    }
  }

  &--pathfinder {
    transform: scale(2);
    left: 42%;
    top: -15%;

    @include respond(tablets-portrait) {
      transform: scale(2);
      left: 25%;
      top: -15%;
    }

    @include respond(tablets-landscape) {
      transform: scale(1.5);
      left: -5%;
      top: 0%;
    }

    @include respond(laptops) {
      left: -5%;
      top: -5%;
    }
  }

  &--innota {
    transform: scale(2);
    left: -42%;
    top: -10%;

    @include respond(tablets-portrait) {
      transform: scale(2);
      left: -25%;
      top: -10%;
    }

    @include respond(tablets-landscape) {
      transform: scale(1.5);
      left: -45%;
      top: 0%;
    }
  }
}

.artifact {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  &__text-bubble {
    width: 10rem;
    height: 8.5rem;
    padding: 1rem;

    @include respond(phones) {
      width: 40%;
      height: 10rem;
    }

    @include respond(tablets-portrait) {
      width: 30%;
      height: 10rem;
    }

    @include respond(tablets-landscape) {
      height: 15rem;
      padding: 2rem;
    }

    @include respond(laptops) {
      height: 20rem;
      padding: 2rem;
    }

    // TEXT BUBBLE PLACEMENT
    &--trashQueens {
      left: 8%;
      top: 40%;

      @include respond(phones) {
        left: 10%;
        top: 40%;
      }

      @include respond(tablets-portrait) {
        left: 22%;
        top: 40%;
      }

      @include respond(tablets-landscape) {
        left: 53%;
        top: 10%;
      }

      @include respond(laptops) {
        top: 5%;
      }
    }

    &--loveIsWar {
      left: 48%;
      top: 40%;

      @include respond(phones) {
        left: 50%;
      }

      @include respond(tablets-portrait) {
        left: 48%;
        top: 40%;
      }

      @include respond(tablets-landscape) {
        left: 80%;
        top: 15%;
      }

      @include respond(laptops) {
        left: 80%;
        top: 5%;
      }
    }

    &--pathfinder {
      left: 7.5%;
      top: 53%;

      @include respond(phones) {
        left: 10%;
        top: 55%;
      }

      @include respond(tablets-portrait) {
        left: 22%;
        top: 55%;
      }

      @include respond(tablets-landscape) {
        left: 53%;
        top: 33%;
      }
    }

    &--innota {
      left: 49%;
      top: 49%;

      @include respond(phones) {
        left: 50%;
        top: 53%;
      }

      @include respond(tablets-portrait) {
        left: 48%;
        top: 52%;
      }

      @include respond(tablets-landscape) {
        left: 80%;
        top: 33%;
      }

      @include respond(laptops) {
        left: 80%;
        top: 25%;
      }
    }
  }

  &__tools-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 1rem;

    @include respond(tablets-landscape) {
      margin: 0.5rem 0;
    }

    & > p {
      white-space: nowrap;
    }
  }

  &__toolbar {
    width: auto;
    height: 100%;
    align-items: center;
    overflow: visible;
    padding-right: 0.5rem;
  }

  &__header {
    width: 100%;
    margin: 0.5rem 0;
    font-family: "FuzzyBubbles-Bold";
    font-size: $font-size-small;
    color: $color-black;
  }

  &__description {
    padding: 0 0.5rem 0.5rem 0.5rem;
  }

  &__thumbnail {
    width: 100%;
    height: 100%;
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.2);
    /* object-fit: contain; */
    object-fit: fill;

    &--hover-animated {
      &:hover {
        animation: tilt-shaking 0.5s ease-in;
      }
    }
  }

  &__button {
    position: absolute;
    z-index: 2;
    animation: moveUpDown 1s ease-in-out infinite;

    &--trashQueens {
      left: 27%;
      bottom: 40%;

      @include respond(phones) {
        bottom: 38%;
        left: 28%;
      }

      @include respond(tablets-portrait) {
        bottom: 38%;
        left: 35%;
      }

      @include respond(tablets-landscape) {
        bottom: 45%;
        left: 52%;
      }
    }

    &--loveIsWar {
      left: 67%;
      top: 57%;

      @include respond(phones) {
        left: 68%;
        top: 60%;
      }

      @include respond(tablets-portrait) {
        left: 61%;
        top: 60%;
      }

      @include respond(tablets-landscape) {
        left: 78%;
        top: 50%;
      }
    }

    &--pathfinder {
      left: 26%;
      bottom: 27%;

      @include respond(phones) {
        left: 27%;
        bottom: 23%;
      }

      @include respond(tablets-portrait) {
        left: 36%;
        bottom: 23%;
      }

      @include respond(tablets-landscape) {
        left: 52%;
        bottom: 28%;
      }

      @include respond(laptops) {
        left: 52%;
        bottom: 20%;
      }
    }

    &--innota {
      left: 68%;
      top: 68%;

      @include respond(phones) {
        left: 68%;
        top: 72%;
      }

      @include respond(tablets-portrait) {
        left: 61%;
        top: 72%;
      }

      @include respond(tablets-landscape) {
        left: 78%;
        top: 70%;
      }
    }
  }
}

.media {
  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin: 0.2rem 0;
  }

  &__icon {
    animation: fadeIn 0.5s ease-in backwards;
  }

  &__link {
    text-decoration: none;
    color: $color-turquoise;
    font-size: 0.5rem;

    @include respond(tablets-landscape) {
      font-size: $font-size-small;
    }
  }
}
</style>
