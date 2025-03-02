import { formatDate } from '@/helpers'
import { z } from '@/plugins'
import { DateFormats } from '@/types'
import { toTypedSchema } from '@vee-validate/zod'

const schema = z.object({
  title: z.string().min(1).max(64),
  description: z.string().min(1).max(256),
  categoryId: z.number().gt(0),
  location: z.string().min(1),
  startDate: z.preprocess((val) => formatDate(val, DateFormats.DATE), z.string().date()),
  endDate: z.preprocess((val) => formatDate(val, DateFormats.DATE), z.string().date()),
  maxParticipants: z.number().min(1)
})

export type EventForm = z.infer<typeof schema>

export default toTypedSchema(schema)
