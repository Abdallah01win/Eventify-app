<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Applayout from '@/layouts/Applayout.vue'
import { useEventStore } from '@/stores/eventStore'
import type { Event } from '@/types'
import { CirclePlus } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

import CreateUpdateDialog from './components/CreateUpdateDialog.vue'
import EventTab from './components/EventTab.vue'

const eventStore = useEventStore()

const loading = ref(false)
const open = ref(false)
const event = ref<Event | null>(null)

const openDialog = () => {
  open.value = true
}

const fetchData = () => {
  loading.value = true

  eventStore.fetch().finally(() => {
    loading.value = false
  })
}

const handleUpdate = (e: Event) => {
  event.value = e
  openDialog()
}

const handleDelete = (id: number) => {
  console.log(id)
  eventStore.destroy(id).then(fetchData)
}

onMounted(() => {
  fetchData()
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

          <Button :disabled="loading" @click="openDialog()">
            <CirclePlus class="mr-1 h-4 w-4" />
            Create event
          </Button>
        </div>

        <EventTab type="explore" :loading />
        <EventTab type="my-events" :loading @update="handleUpdate" @delete="handleDelete" />
      </Tabs>

      <CreateUpdateDialog :open :event @update:open="open = $event" @refresh="fetchData()" />
    </template>
  </Applayout>
</template>
