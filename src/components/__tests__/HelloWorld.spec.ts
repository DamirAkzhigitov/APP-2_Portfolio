import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AvatarInfo from '@/components/AboutView/AvatarInfo.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AvatarInfo)
    expect(wrapper.text()).toContain('Frontend Engineer Damir AkzhigitovLimassol, Cyprus')
  })
})
