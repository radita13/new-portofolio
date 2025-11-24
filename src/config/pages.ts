export const pageConfig = {
  "/": { isLight: false },
  "/about": { isLight: true },
  "/project": { isLight: true },
  "/contact": { isLight: true },
} as const

export type RoutePath = keyof typeof pageConfig
