<template>
  <section class="contacts">
    <div v-if="ready" class="animate__animated animate__fadeInRight">
      <p>{{ email }}</p>
      <p>{{ tel }}</p>
      <p>{{ location }}</p>
      <p></p>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, PropType, ref, watch } from 'vue'
import { ContactItem } from '@/models/api'

export default {
  props: {
    value: {
      type: Array as PropType<ContactItem>,
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
    const ready = ref(false)
    console.log('setup props: ', props)

    watch(
      () => props.animation,
      (val) => {
        if (typeof val === 'boolean') {
          ready.value = val
        }
      }
    )

    const email = computed(() => {
      return props.value?.email.S
    })
    const location = computed(() => {
      return props.value?.location.S
    })
    const tel = computed(() => {
      return props.value?.tel.S
    })

    return {
      ready,
      location,
      email,
      tel
    }
  }
}
</script>
