/// TBC
export type ValidationRule = {
  type: string
}

export type ValidationEntry = {
  name: string // now its required
  required?: boolean // true by default
  rules: any[]
}
