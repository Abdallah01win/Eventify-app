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
import { computed, ref } from 'vue'

const props = defineProps<{
  open: boolean
  eventId: number | null
  type: 'join' | 'leave' | 'delete'
}>()
const emit = defineEmits(['update:open'])

const eventStore = useEventStore()

const loading = ref(false)

const actions = [
  {
    type: 'join',
    title: 'Join Event',
    message:
      'Are you sure you want to join this event? Your Name and Email address will be shared with the event creator. Please confirm below.'
  },
  {
    type: 'leave',
    title: 'Leave Event',
    message:
      'Are you sure you want to leave this event? you may not be able to re-join this event if all seats are taken. Please confirm below.'
  },
  {
    type: 'delete',
    title: 'Delete Event',
    message:
      'Are you sure you want to delete this event? This action is irriversable and cannot be undone. Please confirm below.'
  }
]

const action = computed(() => actions.find((a) => a.type === props.type))

const closeDialog = () => {
  emit('update:open', false)
  loading.value = false
}

const confirm = () => {
  loading.value = true

  if (props.eventId)
    if (props.type === 'join') eventStore.join(props.eventId).finally(closeDialog)
    else if (props.type === 'leave') eventStore.leave(props.eventId).finally(closeDialog)
    else eventStore.destroy(props.eventId).finally(closeDialog)
}
</script>

<template>
  <Dialog :open="props.open && !!eventId" @update:open="emit('update:open', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ action?.title }}</DialogTitle>
        <DialogClose />
      </DialogHeader>
      <DialogDescription>{{ action?.message }}</DialogDescription>
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
