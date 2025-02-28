<script setup lang="ts">
import { Separator } from '@/components/ui/separator'

// import NotificationDropDown from './NotificationDropDown.vue'
import ProfileDropDown from './components/ProfileDropDown.vue'

// import SearchCommand from './SearchCommand.vue'
// import SettingsDropDown from './SettingsDropDown.vue'
</script>

<template>
  <div class="flex items-center justify-between px-6 py-2">
    <div>Logo</div>
    <div class="flex items-center space-x-6 text-sm">
      <RouterLink to="/" class="text-muted-foreground hover:text-primary">Home</RouterLink>
      <RouterLink to="/events" class="text-muted-foreground hover:text-primary">Events</RouterLink>
      <RouterLink to="/about" class="text-muted-foreground hover:text-primary">About</RouterLink>
      <RouterLink to="/contact" class="text-muted-foreground hover:text-primary"
        >Contact</RouterLink
      >
    </div>
    <ProfileDropDown />
  </div>
  <Separator />
</template>
