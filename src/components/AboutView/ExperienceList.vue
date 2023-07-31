<template>
  <section class="experience-container">
    <h3 class="experience__title">Professional experience</h3>
    <ul class="experience__list">
      <li v-for="item in experienceList" :key="item.role_name.S" class="experience__list_item">
        <div class="experience__list-background" :style="getImagePath(item)"></div>
        <div class="experience__date-range">
          {{ item.start_date.S }} - {{ item.end_date.S === '0' ? 'Present' : item.end_date.S }}
        </div>
        <div class="experience__name">{{ item.role_name.S }}</div>
        <div class="experience__description">{{ item.role_description.S }}</div>
        <div>{{ item.role_location.S }}</div>
        <div class="experience__link">
          <a :href="item.company_web.S" target="_blank">{{ item.company_title.S }}</a>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { computed, PropType } from 'vue'
import { ExperienceItem } from '@/models/api'

export default {
  props: {
    value: {
      type: Array as PropType<ExperienceItem[]>,
      default() {
        return []
      }
    },
    animation: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const experienceList = computed(() => {
      return props?.value?.map((item) => item.M)
    })

    const getImagePath = (item) => {
      let src = ''

      if (item && item.image) {
        src = `background-image: url('${item.image.S}')`
      }

      return src
    }

    return {
      experienceList,
      getImagePath
    }
  }
}
</script>

<style lang="scss">
.experience__list {
  padding: 0;
  margin: 0;

  .experience__list_item {
    list-style: none;
    padding: 10px;
    border-radius: 10px;
    position: relative;

    &:not(:first-child) {
      margin-top: 15px;
    }
    &:first-child {
      margin-top: 20px;
    }
    & > div:not(.experience__list-background) {
      position: relative;
      z-index: 2;
    }

    .experience__name {
      font-weight: 700;
    }
    .experience__description {
      font-weight: 600;
    }

    .experience__list-background {
      z-index: 1;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.1;

      position: absolute;
      left: 0;
      top: 0;

      border-radius: 10px;

      width: 100%;
      height: 100%;
    }
  }
}
</style>
