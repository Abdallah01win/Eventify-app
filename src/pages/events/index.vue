<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Applayout from '@/layouts/Applayout.vue'
import { useEventStore } from '@/stores/eventStore'
import { CirclePlus, Loader2 } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

import ConfirmationDialog from './components/ConfirmationDialog.vue'
import CreateUpdateDialog from './components/CreateUpdateDialog.vue'

const eventStore = useEventStore()

const loading = ref(false)
const open = ref(false)
const joinOpen = ref(false)
const leaveOpen = ref(false)
const event = ref<Event | null>(null)
const eventId = ref<number | null>(null)

const handleJoin = (id: number) => {
  eventId.value = id
  joinOpen.value = true
}

const handleLeave = (id: number) => {
  eventId.value = id
  leaveOpen.value = true
}

const handleCreate = () => {
  open.value = true
}

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
      <Tabs default-value="explore">
        <div class="mb-4 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="my-events">My events</TabsTrigger>
          </TabsList>

          <Button :disabled="loading" @click="handleCreate">
            <CirclePlus class="mr-1 h-4 w-4" />
            Create event
          </Button>
        </div>

        <TabsContent value="explore">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex flex-col">
              <h2 class="text-2xl font-semibold tracking-tight">Events</h2>
              <p class="text-sm text-muted-foreground">Explore events near you.</p>
            </div>

            <!-- Filters -->
          </div>

          <div v-if="loading" class="flex h-44 items-center justify-center">
            <Loader2 class="mr-1 h-8 w-8 animate-spin" />
          </div>
          <div v-else>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                v-for="e in eventStore.getExploreEvents"
                :key="e.id"
                :event="e"
                @join="handleJoin"
              />
            </div>
          </div>

          <ConfirmationDialog
            type="join"
            :open="joinOpen"
            :eventId
            @update:open="joinOpen = $event"
          />
        </TabsContent>

        <TabsContent value="my-events">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex flex-col">
              <h2 class="text-2xl font-semibold tracking-tight">My Events</h2>
              <p class="text-sm text-muted-foreground">Manage your events and participations.</p>
            </div>

            <!-- Filters -->
          </div>

          <div v-if="loading" class="flex h-44 items-center justify-center">
            <Loader2 class="mr-1 h-8 w-8 animate-spin" />
          </div>
          <div v-else>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                v-for="e in eventStore.getUserEvents"
                :key="e.id"
                :event="e"
                @leave="handleLeave"
              />
            </div>
          </div>

          <ConfirmationDialog
            type="leave"
            :open="leaveOpen"
            :eventId
            @update:open="leaveOpen = $event"
          />
        </TabsContent>
      </Tabs>
    </template>
  </Applayout>

  <CreateUpdateDialog :open :event @update:open="open = $event" />
</template>
