<script setup lang="ts">
import Combobox from '@/components/ComboBox.vue'
import DatePicker from '@/components/DatePicker.vue'
import NumberInput from '@/components/NumberInput.vue'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formatDate, resetForm } from '@/helpers'
import { useCategoryStore } from '@/stores/categoryStore'
import { useEventStore } from '@/stores/eventStore'
import { DateFormats } from '@/types'
import { parseDate } from '@internationalized/date'
import dayjs from 'dayjs'
import { Loader2 } from 'lucide-vue-next'
import { VisuallyHidden } from 'radix-vue'
import { computed, ref, watch } from 'vue'

import validationSchema from './validationSchema'

const props = defineProps<{ open: boolean; event: any }>()
const emit = defineEmits(['update:open', 'refresh'])

const eventStore = useEventStore()
const categoryStore = useCategoryStore()

const { DATE } = DateFormats

const initForm = {
  categoryId: null,
  title: null,
  maxParticipants: 1,
  startDate: null,
  endDate: null,
  location: null,
  description: null
}

const form = ref({ ...initForm })
const loading = ref(false)

const isEdit = computed(() => !!props.event?.id)

watch(
  () => props.event?.id,
  () => {
    form.value = isEdit.value
      ? {
          ...props.event,
          startDate: parseDate(formatDate(props.event?.startDate, DATE)),
          endDate: parseDate(formatDate(props.event?.startDate, DATE))
        }
      : { ...initForm }
  },
  { immediate: true }
)

const emitSaveEvents = () => {
  emit('refresh')
  emit('update:open', false)
}

const onSubmit = () => {
  loading.value = true

  const { startDate, endDate } = form.value

  const data = {
    ...form.value,
    startDate: formatDate(startDate, DATE),
    endDate: formatDate(endDate, DATE)
  }

  if (isEdit.value) {
    eventStore
      .update(data)
      .then(emitSaveEvents)
      .finally(() => (loading.value = false))
  } else {
    eventStore
      .create(data)
      .then(() => {
        emitSaveEvents()
        resetForm(form, initForm)
      })
      .finally(() => (loading.value = false))
  }
}
</script>

<template>
  <Dialog :open @update:open="emit('update:open', $event)">
    <DialogContent class="max-w-[60%]">
      <DialogHeader>
        <DialogTitle>{{ event?.id ? 'Update Event' : 'Create a New Event' }}</DialogTitle>
        <VisuallyHidden asChild>
          <DialogDescription />
        </VisuallyHidden>
        <DialogClose />
      </DialogHeader>
      <Form v-slot="{ meta }" :validationSchema @submit="onSubmit()">
        <div class="grid grid-cols-3 gap-4">
          <FormField v-slot="{ componentField }" v-model="form.categoryId" name="categoryId">
            <FormItem>
              <FormLabel for="categoryId">Category</FormLabel>
              <FormControl id="categoryId">
                <Combobox
                  v-bind="componentField"
                  :options="categoryStore.getCategoryOptions()"
                  placeholder="Select a category"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" v-model="form.title" name="title">
            <FormItem>
              <FormLabel for="title">Title</FormLabel>
              <FormControl id="title">
                <Input v-bind="componentField" placeholder="Enter a title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            v-model="form.maxParticipants"
            name="maxParticipants"
          >
            <FormItem>
              <FormLabel for="maxParticipants">Max participants</FormLabel>
              <FormControl id="maxParticipants">
                <NumberInput v-bind="componentField" :min="1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" v-model="form.startDate" name="startDate">
            <FormItem>
              <FormLabel for="startDate">Start date</FormLabel>
              <FormControl id="startDate">
                <DatePicker
                  v-bind="componentField"
                  :min-value="parseDate(dayjs().format(DateFormats.DATE))"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" v-model="form.endDate" name="endDate">
            <FormItem>
              <FormLabel for="endDate">End date</FormLabel>
              <FormControl id="endDate">
                <DatePicker
                  v-bind="componentField"
                  :disabled="!form.startDate"
                  :min-value="form.startDate"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" v-model="form.location" name="location">
            <FormItem>
              <FormLabel for="location">Location</FormLabel>
              <FormControl id="location">
                <Input v-bind="componentField" placeholder="Enter a location" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="col-span-3">
            <FormField v-slot="{ componentField }" v-model="form.description" name="description">
              <FormItem>
                <FormLabel for="description">Description</FormLabel>
                <FormControl id="description">
                  <Input v-bind="componentField" placeholder="Enter a description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>

        <DialogFooter class="mt-6">
          <Button :disabled="loading || !meta.valid" type="submit">
            <Loader2 v-if="loading" class="mr-1 h-4 w-4 animate-spin" />
            {{ isEdit ? 'Update' : 'Create' }}
          </Button>
          <DialogClose as-child>
            <Button type="button" variant="secondary" :disabled="loading">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>
