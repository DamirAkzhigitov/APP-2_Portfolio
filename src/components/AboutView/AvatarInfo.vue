<template>
  <section class="avatar-container">
    <div class="d-flex justify-between">
      <ul class="avatar-soft-skill items-end">
        <li v-for="skill in skillsLeft" :key="skill" class="avatar-soft-skill__item text-nowrap">
          <div v-show="skill.loading" class="item-title v-skeleton-loader__bone"></div>
          <div v-show="!skill.loading">
            <img :src="skill?.icon" class="item-icon"  alt=""/>
            <span class="item-title">{{ skill?.title }}</span>
          </div>
        </li>
      </ul>
      <div class="profile-container d-flex justify-center items-center flex-column">
        <figure class="profile-picture__container">
          <img src="/profile_pic.jpg" class="profile-picture__image" alt="" />
          <figcaption class="profile-picture__tag text-bold-large text-nowrap">
            Frontend Engineer
          </figcaption>
        </figure>
        <div class="profile__name text-bold-large">Damir Akzhigitov</div>
        <div class="profile__location">Limassol, Cyprus</div>
      </div>
      <ul class="avatar-soft-skill items-end">
        <li v-for="skill in skillsRight" :key="skill" class="avatar-soft-skill__item text-nowrap">
          <div v-show="skill.loading" class="item-title v-skeleton-loader__bone"></div>
          <div v-show="!skill.loading">
            <img :src="skill?.icon" alt="" class="item-icon"/>
            <span class="item-title">{{ skill?.title }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="avatar-hard-skills items-start">
      <div
        v-for="skill in hardSkills"
        :key="skill.name"
        class="avatar-hard-skills__item animate__animated animate__slideInDown"
        :style="`background-color: ${skill.color}`"
      >
        <img
          :src="skill.logo"
          :title="skill.name"
          height="24"
          width="24"
          class="hard-skills__logo"
          :alt="skill.name"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import { format, getIcon } from '@/utils/formatters'
import type { SkillItem, SkillResponse } from '@/models/api'
import { getSkills } from '@/api/profile'

const ANIMATION_SPEED = 350

const emit = defineEmits(['animationDone'])

const loadingsSkills = [
  {
    loading: true
  },
  {
    loading: true
  },
  {
    loading: true
  }
]

const skillsLeft: Ref<SkillItem[]> = ref(loadingsSkills)
const skillsRight: Ref<SkillItem[]> = ref(loadingsSkills)
const hardSkills = ref([])
const skillsResponse: Ref<SkillResponse | null> = ref(null)

const addIcons = (icons: { name: string; color: string; logo: string }[]) => {
  let iconCount = icons.length

  iconCount = iconCount - 1

  hardSkills.value.push(icons[iconCount])

  const pushIcon = () => {
    if (iconCount <= 0) {
      emit('animationDone', { next: 'description', prev: 'avatar' })

      return
    }

    setTimeout(() => {
      iconCount = iconCount - 1

      if (icons[iconCount]) {
        hardSkills.value.push(icons[iconCount])
        pushIcon()
      }
    }, ANIMATION_SPEED)
  }

  pushIcon()
}

const fetchSkills = async () => {
  const data = await getSkills()

  if (!data) return

  skillsResponse.value = data
}
const setSkills = () => {
  const response = skillsResponse.value

  if (!response) return

  const { SS: skillList } = response.skills
  const { L: hardSkillResponse } = response.hardSkills

  const rightSide = skillList.map((item: string) => {
    const iconName = format(item)

    return {
      title: item,
      icon: getIcon(iconName)
    }
  })

  addIcons(
    hardSkillResponse.map((item) => {
      return {
        name: item.M.name.S,
        color: `rgba(${item.M.color.S});`,
        logo: item.M.logo.S
      }
    })
  )

  skillsLeft.value = rightSide.splice(0, 3)
  skillsRight.value = rightSide
}

onMounted(async () => {
  await fetchSkills()
  setSkills()
})
</script>

<style lang="scss">
.avatar-container {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;

  .profile-container {
    border-radius: var(--space-m);
    padding: var(--space-m);

    .profile-picture {
      &__image {
        height: 180px;
        width: auto;
        border-radius: 15px;
      }
      &__container {
        position: relative;
      }
      &__tag {
        position: absolute;
        bottom: -10px;
        right: 50%;
        transform: translate(50%, -50%);
        background: linear-gradient(135deg, #26cbff 0%, #1b67d9 64.06%, #0f44ff 100%);
        border-radius: var(--space-xs);
        text-align: center;
        color: #ffffff;
        padding: 0 var(--space-xs);
      }
    }

    @media screen and (max-width: 600px) {
      .profile-picture__image {
        height: 140px;
      }
    }
  }

  .avatar-soft-skill {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    font-family: 'JetBrains Mono', monospace;
    user-select: none;
    width: 25%;

    .item-icon {
      width: 20px;
      height: 20px;
      margin-right: var(--space-s);
    }
    &__item {
      width: fit-content;
      padding: var(--space-sm) var(--space-m);
      display: flex;
      align-items: center;
      transition: all 0.5s ease-out;

      border-radius: var(--space-xs);
      margin: var(--space-s);

      background-color: #fff;
    }
    .item-title.v-skeleton-loader__bone {
      width: 100px;
      height: 20px;
    }

    @media screen and (max-width: 600px) {
      .item-title {
        display: none;
      }
      .item-icon {
        margin-right: 0;
      }
    }
  }

  .avatar-hard-skills {
    grid-column: 1/4;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
    overflow-y: auto;

    &__item {
      width: 60px;
      height: 60px;
      background: #f4eefb;
      border-radius: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      pointer-events: none;
      justify-self: center;
    }
  }
}
</style>
