import axios from '@/api/index'
import { AboutResponseItem, SkillResponse } from '@/models/api'

export const getAboutMe = async (): Promise<AboutResponseItem | null> => {
  let response = null
  try {
    response = await axios.get('/about_me').then((response) => response.data[0])
  } catch (e) {
    console.error(e)
  }
  return response
}

export const getSkills = async (): Promise<SkillResponse | null> => {
  let response = null
  try {
    response = await axios.get('/skills').then((response) => response.data[0])
  } catch (e) {
    console.error(e)
  }
  return response
}
