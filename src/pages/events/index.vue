<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Applayout from '@/layouts/Applayout.vue'
import { useEventStore } from '@/stores/eventStore'
import { CirclePlus } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

import EventTab from './components/EventTab.vue'

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
      <Tabs default-value="explore">
        <div class="mb-4 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="my-events">My events</TabsTrigger>
          </TabsList>

          <Button :disabled="loading">
            <CirclePlus class="mr-1 h-4 w-4" />
            Create event
          </Button>
        </div>

        <EventTab type="explore" :loading />
        <EventTab type="my-events" :loading />
      </Tabs>
    </template>
  </Applayout>
</template>
