export interface ExperienceItem {
  M: {
    role_name: {
      S: string
    }
    end_date: {
      S: string
    }
    work_now: {
      BOOL: boolean
    }
    company_title: {
      S: string
    }
    company_web: {
      S: string
    }
    role_location: {
      S: string
    }
    role_description: {
      S: string
    }
    start_date: {
      S: string
    }
    image: {
      S: string
    }
  }
}

export interface ExperienceItemList {
  L: ExperienceItem[]
}

export interface AboutMeDescriptionItem {
  order: {
    N: string
  }
  text: {
    S: string
  }
}

export interface AboutMeDescriptionMap {
  M: AboutMeDescriptionItem
}

export interface AboutMeDescriptionList {
  L: AboutMeDescriptionMap[]
}

export interface AboutMeBlockItem {
  description: AboutMeDescriptionList
  availability: {
    BOOL: boolean
  }
  status: {
    S: string
  }
}
export interface AboutMeBlockMap {
  M: AboutMeBlockItem
}

export interface EducationItem {
  M: {
    end_date: {
      S: string
    }
    description: {
      S: string
    }
    title: {
      S: string
    }
    start_date: {
      S: string
    }
  }
}

export interface EducationItemList {
  L: EducationItem[]
}

export interface ContactItem {
  email: {
    S: string
  }
  tel: {
    S: string
  }
  location: {
    S: string
  }
}

export interface ContactItemMap {
  M: ContactItem
}

export interface AboutResponseItem {
  experience: ExperienceItemList
  about_me: AboutMeBlockMap
  cvid: { S: string }
  education: EducationItemList
  contact: ContactItemMap
}

export type AboutResponse = AboutResponseItem[]
