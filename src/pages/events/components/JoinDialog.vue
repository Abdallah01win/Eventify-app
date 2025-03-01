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

const props = defineProps<{ open: boolean; eventId: number | null }>()
const emit = defineEmits(['update:open'])

const eventStore = useEventStore()

const loading = ref(false)

const joinEvent = () => {
  loading.value = true

  if (props.eventId)
    eventStore.join(props.eventId).finally(() => {
      emit('update:open', false)
      loading.value = false
    })
}
</script>

<template>
  <Dialog :open="props.open && !!eventId" @update:open="emit('update:open', $event)">
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
        <Button :disabled="loading" @click="joinEvent()">
          <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          Confirm
        </Button>
        <DialogClose as-child>
          <Button type="button" variant="secondary" :disabled="loading">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
