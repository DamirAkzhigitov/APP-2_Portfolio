import axios from 'axios'

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? '/'
      : 'https://6h68rbyn3i.execute-api.eu-north-1.amazonaws.com/dev/'
})

export default instance
