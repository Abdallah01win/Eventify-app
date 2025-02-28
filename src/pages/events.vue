<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import Applayout from '@/layouts/Applayout.vue'
import { useEventStore } from '@/stores/eventStore'
import { Loader2 } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

const eventStore = useEventStore()

const loading = ref(false)
const dialogLoading = ref(false)
const open = ref(false)
const eventId = ref<number | null>(null)

const handleJoin = (event: number) => {
  console.log(event)

  eventId.value = event
  open.value = true
}

const joinEvent = () => {
  dialogLoading.value = true

  eventStore.join(eventId.value!).finally(() => {
    dialogLoading.value = false
    open.value = false
  })
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
      <div class="mb-4 flex items-center justify-between">
        <div class="flex flex-col">
          <h1 class="text-2xl font-semibold">Events</h1>
          <p class="text-sm text-muted-foreground">Explore events near you.</p>
        </div>
        <Button :disabled="loading">Create an Event</Button>
      </div>

      <div v-if="loading" class="flex h-44 items-center justify-center">
        <Loader2 class="mr-1 h-8 w-8 animate-spin" />
      </div>
      <div v-else>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <EventCard v-for="event in eventStore.events" :key="event.id" :event @join="handleJoin" />
        </div>
      </div>
    </template>
  </Applayout>

  <Dialog :open @update:open="open = !open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Event Joining</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <DialogDescription>
        Are you sure you want to join this event? Your <strong>Name</strong> and
        <strong>Email address</strong> will be shared with the event creator. Please confirm below.
      </DialogDescription>

      <DialogFooter>
        <Button :disabled="dialogLoading" @click="joinEvent()">
          <Loader2 v-if="dialogLoading" class="mr-2 h-4 w-4 animate-spin" />
          Confirm
        </Button>
        <DialogClose as-child>
          <Button type="button" variant="secondary" :disabled="dialogLoading">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
