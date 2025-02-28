export type User = {
  readonly id: number
  name: string
  email: string
  createdAt: Date
  rolesNames: string[]
  permissionsNames: string[]
}
