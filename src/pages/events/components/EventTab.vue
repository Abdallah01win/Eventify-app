<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { TabsContent } from '@/components/ui/tabs'
import { useEventStore } from '@/stores/eventStore'
import { CalendarFold, Loader2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import ConfirmationDialog from './ConfirmationDialog.vue'

type DialogType = 'join' | 'leave' | 'delete'

const props = defineProps<{
  type: 'explore' | 'my-events'
  loading: boolean
}>()
const emit = defineEmits(['update', 'delete'])

const eventStore = useEventStore()

const tabs = [
  {
    value: 'explore',
    title: 'Explore',
    description: 'Explore events near you.'
  },
  {
    value: 'my-events',
    title: 'My events',
    description: 'Manage your events and participations.'
  }
]

const open = ref(false)
const dialogType = ref<DialogType>('join')
const eventId = ref<number | null>(null)

const tab = computed(() => tabs.find((t) => t.value === props.type)!)
const events = computed(() =>
  props.type === 'explore' ? eventStore.getExploreEvents : eventStore.getUserEvents
)

const openDialog = (e: { type: DialogType; val: number }) => {
  dialogType.value = e.type
  eventId.value = e.val
  open.value = true
}
</script>

<template>
  <TabsContent :value="tab.value">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex flex-col">
        <h2 class="text-2xl font-semibold tracking-tight">
          {{ tab.title }}
        </h2>
        <p class="text-sm text-muted-foreground">
          {{ tab.description }}
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
          @join="openDialog"
          @leave="openDialog"
          @update="emit('update', $event)"
          @delete="openDialog"
        />
      </div>
      <div v-else class="flex h-56 flex-col items-center justify-center text-muted-foreground">
        <CalendarFold class="mb-3 h-10 w-10" />
        <p>No events found. Why not create your own?</p>
      </div>
    </div>

    <ConfirmationDialog :type="dialogType" :open :eventId @update:open="open = $event" />
  </TabsContent>
</template>
