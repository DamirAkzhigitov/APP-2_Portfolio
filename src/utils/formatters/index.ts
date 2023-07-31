export const format = (str) => str.toLowerCase().replace(/[^a-zA-Z\d|&]/g, '_')

export const getIcon = (name) => `/logos/${name}.svg`
