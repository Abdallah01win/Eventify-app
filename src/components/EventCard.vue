<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatDate } from '@/helpers'
import type { Event } from '@/types'
import { Calendar, MapPin } from 'lucide-vue-next'

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
        <Avatar class="cursor-pointer">
          <AvatarFallback class="font-semibold uppercase">
            {{ event.user?.name.substring(0, 2) }}
          </AvatarFallback>
        </Avatar>

        <div class="flex flex-col">
          <span class="text-sm">{{ event.user?.name }}</span>
          <span class="text-xs text-muted-foreground"
            >Added: {{ formatDate(event.createdAt) }}</span
          >
        </div>
      </div>
      <Button @click="emit('join', $event)">Join</Button>
    </CardFooter>
  </Card>
</template>
