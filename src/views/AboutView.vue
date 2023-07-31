<template>
  <div class="about-page">
    <avatar-info class="avatar-info" @animation-done="animationDone" />
    <short-description
      :value="aboutMe"
      :animation="animationSteps.description"
      class="short-description"
    />
    <contact-block
      :value="contactItem"
      :animation="animationSteps.description"
      class="contact-block"
    />
    <experience-list :value="experienceItems" class="experience-list" />
    <education-block :value="educationItems" class="education-block" />
    <projects-description class="projects-description" />
    <skills-list class="skills-list" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, Ref, ref } from 'vue'
import {
  AboutMeBlockItem,
  AboutResponse,
  ContactItem,
  EducationItem,
  ExperienceItem
} from '@/models/api'

const EducationBlock = defineAsyncComponent(
  () => import('@/components/AboutView/EducationBlock.vue')
)
const ContactBlock = defineAsyncComponent(() => import('@/components/AboutView/ContactBlock.vue'))
const AvatarInfo = defineAsyncComponent(() => import('@/components/AboutView/AvatarInfo.vue'))
const ProjectsDescription = defineAsyncComponent(
  () => import('@/components/AboutView/ProjectsDescription.vue')
)
const SkillsList = defineAsyncComponent(() => import('@/components/AboutView/SkillsList.vue'))
const ShortDescription = defineAsyncComponent(
  () => import('@/components/AboutView/ShortDescription.vue')
)
const ExperienceList = defineAsyncComponent(
  () => import('@/components/AboutView/ExperienceList.vue')
)

const experienceItems: Ref<ExperienceItem[]> = ref([])
const educationItems: Ref<EducationItem[]> = ref([])
const contactItem: Ref<ContactItem> = ref({})
const aboutMe: Ref<AboutMeBlockItem> = ref({})

const animationSteps = ref({
  avatar: false,
  description: false,
  contact: false,
  experience: false
})

const animationDone = ({ prev, next }) => {
  if (prev) animationSteps.value[prev] = false
  if (next) animationSteps.value[next] = true
}

const fetchAboutMe = async () => {
  try {
    const data = await fetch('/api/about_me', {
      cache: 'force-cache'
    })
    const [response] = (await data.json()) as AboutResponse

    experienceItems.value = response.experience.L
    educationItems.value = response.education.L
    contactItem.value = response.contact.M
    aboutMe.value = response.about_me.M

    console.log('response: ', response)
  } catch (e) {
    console.error('fetchSkills error: ', e)
  }
}

onMounted(() => {
  fetchAboutMe()
})
</script>

<style lang="scss">
.about-page {
  display: grid;
  grid-template-columns: 60% 1fr;
  grid-template-rows: repeat(5, auto);
  grid-gap: var(--space-xs);
  max-width: 1024px;
  margin: var(--space-l) auto 0;

  .avatar-info,
  .projects-description,
  .skills-list {
    grid-column: 1/3;
  }

  & > section {
    padding: var(--space-s);
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-flow: column;
  }
}
</style>
