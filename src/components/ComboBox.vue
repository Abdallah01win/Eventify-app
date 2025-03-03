<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { ComboboxProps } from '@/types'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import type { ComboboxRootEmits } from 'radix-vue'

defineProps<ComboboxProps>()

const emit = defineEmits<ComboboxRootEmits<string | number>>()
</script>

<template>
  <div>
    <Popover>
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :disabled
          :class="cn('w-full justify-between font-normal', size === 'sm' && 'h-8 px-3')"
        >
          {{
            modelValue ? options.find((option) => option.value === modelValue)?.label : placeholder
          }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0">
        <Command>
          <CommandInput placeholder="Search" class="h-10" />
          <CommandEmpty class="py-3">No data</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="option in options"
                :key="option.value"
                :value="option.label"
                :disabled="option.disabled"
                @select="emit('update:modelValue', option.value)"
              >
                <Check
                  :class="
                    cn('mr-2 h-4 w-4', option.value === modelValue ? 'opacity-100' : 'opacity-0')
                  "
                />
                {{ option.label }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
