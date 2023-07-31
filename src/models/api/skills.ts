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

export type SkillResponse = SkillResponseItem[]
