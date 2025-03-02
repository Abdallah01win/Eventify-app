<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { TabsContent } from '@/components/ui/tabs'
import { useEventStore } from '@/stores/eventStore'
import { CalendarFold, Loader2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import ConfirmationDialog from './ConfirmationDialog.vue'

const props = defineProps<{
  type: 'explore' | 'my-events'
  loading: boolean
}>()

const eventStore = useEventStore()

const open = ref(false)
const eventId = ref<number | null>(null)

const events = computed(() =>
  props.type === 'explore' ? eventStore.getExploreEvents : eventStore.getUserEvents
)

const handleJoinOrLeave = (id: number) => {
  eventId.value = id
  open.value = true
}
</script>

<template>
  <TabsContent :value="type">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex flex-col">
        <h2 class="text-2xl font-semibold tracking-tight">
          {{ type === 'explore' ? 'Events' : 'My events' }}
        </h2>
        <p class="text-sm text-muted-foreground">
          {{
            type === 'explore'
              ? 'Explore events near you.'
              : 'Manage your events and participations.'
          }}
        </p>
      </div>

      <!-- Filters -->
    </div>

    <div v-if="loading" class="flex h-56 items-center justify-center">
      <Loader2 class="mr-1 h-8 w-8 animate-spin" />
    </div>
    <div v-else>
      <div v-if="events.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <EventCard
          v-for="e in events"
          :key="e.id"
          :event="e"
          @join="handleJoinOrLeave"
          @leave="handleJoinOrLeave"
        />
      </div>
      <div v-else class="flex h-56 flex-col items-center justify-center text-muted-foreground">
        <CalendarFold class="mb-3 h-10 w-10" />
        <p>No events found. Why not create your own?</p>
      </div>
    </div>

    <ConfirmationDialog
      :type="type === 'explore' ? 'join' : 'leave'"
      :open
      :eventId
      @update:open="open = $event"
    />
  </TabsContent>
</template>
