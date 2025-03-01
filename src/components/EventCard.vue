<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatDate } from '@/helpers'
import { useAuthStore } from '@/stores/authStore'
import type { Event } from '@/types'
import { Armchair, Calendar, MapPin, Users } from 'lucide-vue-next'

const props = defineProps<{ event: Event }>()
const emit = defineEmits(['join', 'leave'])

const authStore = useAuthStore()

const isParticipating = () => {
  return props.event.participants.some((p) => p.userId === authStore.user?.id)
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ event.title }}</CardTitle>
      <CardDescription>
        <div class="flex space-x-2">
          <div class="flex items-center">
            <MapPin class="mr-1 h-4 w-4" />
            <div>{{ event.location }}</div>
          </div>
          <div class="flex items-center">
            <Calendar class="mr-1 h-4 w-4" />
            <div>{{ formatDate(event.startDate) }}</div>
          </div>
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent class="text-sm"> {{ event.description }} </CardContent>
    <CardFooter class="flex justify-between">
      <div class="flex gap-2">
        <Badge variant="secondary">{{ event.category.name }}</Badge>
        <Badge variant="secondary">
          <span class="flex items-center">
            <Users class="mr-2 h-4 w-4" />
            {{ event.participantsCount }}
          </span>
        </Badge>
        <Badge variant="secondary">
          <span class="flex items-center">
            <Armchair class="mr-2 h-4 w-4" />
            {{ event.maxParticipants - event.participantsCount }}
          </span>
        </Badge>
      </div>
      <Button v-if="isParticipating()" size="sm" @click="emit('leave', event.id)">Leave</Button>
      <Button
        v-else
        size="sm"
        :disabled="event.maxParticipants === event.participantsCount"
        @click="emit('join', event.id)"
        >Join</Button
      >
    </CardFooter>
  </Card>
</template>
