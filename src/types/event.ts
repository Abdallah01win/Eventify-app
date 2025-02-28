import type { User, Category } from "."

export type Event = {
  readonly id: number
  title: string
  description: string
  date: string
  location: string
  maxParticipants: number
  user_id: number
  startDate: Date
  endDate: Date
  user: User
  category: Category
  createdAt: Date
}
