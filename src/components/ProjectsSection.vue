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
          <h2 class="artifact__header text-right">Pathfinder</h2>
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
          />
        </template>
        <template #tools>
          <div class="media__container">
            <Transition appear :style="{ animationDelay: '3s' }">
              <Icon
                icon="mdi:github"
                class="media__icon"
                :height="mediaIconSize"
                :width="mediaIconSize"
              />
            </Transition>
            <a class="media__link" :href="currentProject?.githubLink!">
              <Typewriter textProp="Github site" delay="4s" />
            </a>
            <Transition appear :style="{ animationDelay: '5s' }">
              <Icon
                icon="ph:globe"
                class="media__icon"
                :height="mediaIconSize"
                :width="mediaIconSize"
              />
            </Transition>
            <a class="media__link" :href="currentProject?.productionLink!">
              <Typewriter textProp="Live site" delay="6s" />
            </a>
          </div>
          <div class="artifact__tools-container">
            <Typewriter textProp="Tools used:" delay="7s" />
            <Toolbar
              class="artifact__toolbar"
              :toolList="currentProject?.tools!"
              delay="8s"
            />
          </div>
        </template>
        <template #content>
          <Typewriter
            class="artifact__description text-center"
            :textProp="currentProject?.description!"
            delay="9s"
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
    };
  },
  methods: {
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
      const projectPageNode = this.$refs.projects_page as HTMLElement;

      // if show other projects
      this.showProjectContent = false;
      const hiddenProjects = projectPageNode.querySelectorAll(".pointer-none");

      hiddenProjects.forEach((project) => {
        project.classList.remove("animate-fadeOut", "pointer-none");
      });

      projectPageNode.classList.remove("zoom--" + projectName);
    },
    getProjectContent(projectName: string, event: MouseEvent) {
      const projectPageNode = this.$refs.projects_page as HTMLElement;
      const selectedThumbnail = event.target as HTMLElement;

      const parentThumbnail = selectedThumbnail.parentNode as HTMLElement;

      console.log("selectedThumbnail", selectedThumbnail);

      const artifaceHeader = parentThumbnail.querySelector(
        ".artifact__header"
      ) as HTMLElement;

      artifaceHeader.classList.add("animate-fadeOut", "pointer-none");
      selectedThumbnail.classList.remove("artifact__thumbnail--hover-animated");
      parentThumbnail.classList.add("pointer-none");

      const artifactContainers = projectPageNode.querySelectorAll(
        ".artifact__container"
      );

      artifactContainers.forEach((container) => {
        if (container !== selectedThumbnail.parentElement) {
          container.classList.add("animate-fadeOut", "pointer-none");
        }
      });

      console.log("artifactContainers", artifactContainers);

      projectPageNode.classList.add("zoom--" + projectName);

      this.currentProject = toRaw(this.projectsData[projectName]);
      this.showProjectContent = true;
      console.log("this.currentProject", toRaw(this.projectsData[projectName]));
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
    width: 100%;
    height: 14rem;
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
      left: 40%;
      bottom: 20%;
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
      width: 12rem;
      height: 10rem;
    }

    &--trashQueens {
      left: 8%;
      top: 40%;

      @include respond(phones) {
        left: 10%;
        top: 40%;
      }
    }
  }

  &__tools-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1rem;

    & > p {
      white-space: nowrap;
      margin-left: 0.5rem;
    }
  }

  &__toolbar {
    width: 100%;
    height: 100%;
    align-items: center;
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

    &--3 {
      width: 60%;
      height: 100%;
    }
  }

  &__button {
    position: absolute;
    z-index: 2;
    left: 27%;
    bottom: 40%;
    animation: moveUpDown 1s ease-in-out infinite;

    @include respond(phones) {
      bottom: 35%;
      left: 28%;
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
