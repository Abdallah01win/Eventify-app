<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatDate } from '@/helpers'
import { cn } from '@/lib/utils'
import type { DatePickerCustomProps } from '@/types'
import { parseDate } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { type CalendarRootEmits, useForwardPropsEmits } from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<DatePickerCustomProps>(), {
  size: 'base',
  hasIcon: true,
  fixedWeeks: true,
  preventDeselect: true
})

const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { modelValue, ...delegated } = props

  return modelValue ? { ...delegated, modelValue: parseDate(String(modelValue)) } : delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :disabled
        :class="
          cn(
            'w-full justify-start text-left font-normal',
            !forwarded.modelValue && 'text-muted-foreground',
            size === 'sm' && 'h-8 px-3',
            props.class
          )
        "
      >
        <CalendarIcon v-if="hasIcon" class="mr-2 h-4 w-4" />
        {{ forwarded.modelValue ? formatDate(forwarded.modelValue) : 'Pick a date' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-bind="forwarded" initial-focus />
    </PopoverContent>
  </Popover>
</template>
