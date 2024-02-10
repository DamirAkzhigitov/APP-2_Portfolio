export const format = (str: string | unknown) => str.toLowerCase().replace(/[^a-zA-Z\d|&]/g, '_')

export const getIcon = (name: string) => `/logos/${name}.svg`
