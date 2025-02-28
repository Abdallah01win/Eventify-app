<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { Button } from '@/components/ui/button'
import Applayout from '@/layouts/Applayout.vue'
import { useEventStore } from '@/stores/eventStore'
import { Loader2 } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

const eventStore = useEventStore()
const loading = ref(false)

onMounted(() => {
  loading.value = true

  eventStore.fetch().finally(() => {
    loading.value = false
  })
})
</script>
<template>
  <Applayout>
    <template #default>
      <div class="mb-4 flex items-center justify-between">
        <div class="flex flex-col">
          <h1 class="text-2xl font-semibold">Events</h1>
          <p class="text-muted-foreground">Explore events near you.</p>
        </div>
        <Button>Create an Event</Button>
      </div>

      <div v-if="loading" class="flex h-44 items-center justify-center">
        <Loader2 class="mr-1 h-8 w-8 animate-spin" />
      </div>
      <div v-else>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <EventCard
            v-for="event in eventStore.events"
            :key="event.id"
            :event
            @join="console.log('Joining event', event)"
          />
        </div>
      </div>
    </template>
  </Applayout>
</template>
