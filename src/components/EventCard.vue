<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/helpers'
import type { Event } from '@/types'
import { Calendar, MapPin, Users } from 'lucide-vue-next'

defineProps<{ event: Event }>()
const emit = defineEmits(['join'])
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
            {{ event.maxParticipants }}
          </span>
        </Badge>
      </div>
      <Button size="sm" @click="emit('join', $event)">Join</Button>
    </CardFooter>
  </Card>
</template>
