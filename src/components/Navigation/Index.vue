<script setup lang="ts">
import { Separator } from '@/components/ui/separator'

import ProfileDropDown from './components/ProfileDropDown.vue'
</script>

<template>
  <div class="flex items-center justify-between px-6 py-2">
    <div>Logo</div>
    <div class="flex items-center space-x-2.5 text-sm md:space-x-4 lg:space-x-6">
      <RouterLink to="/" class="text-muted-foreground hover:text-primary">Home</RouterLink>
      <RouterLink
        v-can="'events.read'"
        to="/events"
        class="text-muted-foreground hover:text-primary"
        >Events</RouterLink
      >
      <RouterLink to="/about" class="text-muted-foreground hover:text-primary">About</RouterLink>
      <RouterLink to="/contact" class="text-muted-foreground hover:text-primary"
        >Contact</RouterLink
      >
    </div>
    <ProfileDropDown />
  </div>
  <Separator />
</template>
