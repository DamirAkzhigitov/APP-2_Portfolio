<template>
  <section class="description">
    <div
      v-if="ready"
      class="description__text animate__animated animate__fadeInLeft"
      :class="{
        'is-expanded': expanded
      }"
      @click="onClickExpand"
    >
      <p v-for="(paragraph, index) in description" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, PropType, ref, watch } from 'vue'
import { AboutMeBlockItem } from '@/models/api'

export default {
  props: {
    value: {
      type: Object as PropType<AboutMeBlockItem>,
      default() {
        return {}
      }
    },
    animation: {
      type: Boolean,
      default: false
    }
  },
  emits: ['animationDone'],
  setup(props, { emit }) {
    const ready = ref(false)
    const expanded = ref(false)

    const description = computed(() => {
      const list = props.value?.description?.L

      if (list) {
        return list
          .map((item) => item.M)
          .sort((a, b) => a.order.N - b.order.N)
          .map(({ text }) => text.S)
      }

      return []
    })

    const availability = computed(() => {
      const available = props.value?.availability?.BOOL

      return available ? 'Available' : 'Not available'
    })

    const onClickExpand = () => {
      expanded.value = !expanded.value
    }

    watch(
      () => props.animation,
      (val) => {
        if (typeof val === 'boolean') {
          ready.value = val

          setTimeout(() => {
            emit('animationDone', { prev: 'description', next: 'experience' })

            if (localStorage.getItem('spoiler-learn')) {
              localStorage.setItem('spoiler-learn', 'true')

              expanded.value = true
              setTimeout(() => {
                expanded.value = false
              }, 1500)
            }
          }, 500)
        }
      }
    )

    return {
      description,
      availability,
      ready,
      expanded,
      onClickExpand
    }
  }
}
</script>

<style lang="scss">
section.description {
  .description__text {
    height: 100px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: 0.5s;
    user-select: none;

    p:not(:first-child) {
      margin-top: 10px;
    }
    &:not(.is-expanded)::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(0, 212, 255, 0) 100%);
      height: 60px;
      width: 100%;
    }
    &.is-expanded {
      height: 400px;
      overflow-y: scroll;
    }
  }
}
</style>
