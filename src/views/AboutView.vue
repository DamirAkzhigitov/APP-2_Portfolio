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
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import type { AboutMeBlockItem, ContactItem, EducationItem, ExperienceItemMap } from '@/models/api'

import { getAboutMe } from '@/api/profile'


const ContactBlock = defineAsyncComponent(() => import('@/components/AboutView/ContactBlock.vue'))
const AvatarInfo = defineAsyncComponent(() => import('@/components/AboutView/AvatarInfo.vue'))
const ShortDescription = defineAsyncComponent(
  () => import('@/components/AboutView/ShortDescription.vue')
)
const ExperienceList = defineAsyncComponent(
  () => import('@/components/AboutView/ExperienceList.vue')
)

const experienceItems: Ref<ExperienceItemMap[]> = ref([])
const educationItems: Ref<EducationItem[]> = ref([])
const contactItem: Ref<ContactItem | undefined> = ref(undefined)
const aboutMe: Ref<AboutMeBlockItem | undefined> = ref(undefined)

const animationSteps = ref({
  avatar: false,
  description: false,
  contact: false,
  experience: false
})

const animationDone = ({ prev, next }: { prev: string; next: string }) => {
  if (prev) animationSteps.value[prev] = false
  if (next) animationSteps.value[next] = true
}

const fetchAboutMe = async () => {
  const data = await getAboutMe()

  if (!data) return

  experienceItems.value = data.experience.L
  educationItems.value = data.education.L
  contactItem.value = data.contact.M
  aboutMe.value = data.about_me.M
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
