<script setup lang="ts">
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
import { useEventStore } from '@/stores/eventStore'
import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{ open: boolean; eventId: number | null; type: 'join' | 'leave' }>()
const emit = defineEmits(['update:open'])

const eventStore = useEventStore()

const loading = ref(false)

const closeDialog = () => {
  emit('update:open', false)
  loading.value = false
}

const confirm = () => {
  loading.value = true

  if (props.eventId)
    if (props.type === 'join') eventStore.join(props.eventId).finally(closeDialog)
    else eventStore.leave(props.eventId).finally(closeDialog)
}
</script>

<template>
  <Dialog :open="props.open && !!eventId" @update:open="emit('update:open', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{
          type === 'join' ? 'Confirm Event Joining' : 'Confirm Leaving the Event'
        }}</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <DialogDescription v-if="type === 'join'">
        Are you sure you want to join this event? Your <strong>Name</strong> and
        <strong>Email address</strong> will be shared with the event creator. Please confirm below.
      </DialogDescription>

      <DialogDescription v-else>
        Are you sure you want to leave this event? you may not be able to re-join this event if all
        seats are taken. Please confirm below.
      </DialogDescription>

      <DialogFooter>
        <Button :disabled="loading" @click="confirm()">
          <Loader2 v-if="loading" class="mr-1 h-4 w-4 animate-spin" />
          Confirm
        </Button>
        <DialogClose as-child>
          <Button type="button" variant="secondary" :disabled="loading">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
