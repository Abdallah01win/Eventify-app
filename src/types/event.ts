import type { Category, User } from '.'

export type Event = {
  readonly id: number
  userId: number
  title: string
  description: string
  date: string
  location: string
  maxParticipants: number
  participantsCount: number
  participants: { id: number; userId: number }[]
  startDate: Date
  endDate: Date
  user: User
  category: Category
  createdAt: Date
}
