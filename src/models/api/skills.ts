export interface HardSkillItem {
  M: {
    name: {
      S: string
    }
    color: {
      S: string
    }
    logo: {
      S: string
    }
  }
}

export interface SkillResponseItem {
  cvid: {
    S: string
  }
  skills: {
    SS: string[]
  }
  hardSkills: {
    L: HardSkillItem[]
  }
}

export interface SkillItem {
  icon?: string
  title?: string
  loading?: boolean
}

export type SkillResponse = SkillResponseItem
