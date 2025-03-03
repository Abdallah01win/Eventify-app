<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/authStore'

import ProfileDropDown from './components/ProfileDropDown.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="flex items-center justify-between px-6 py-2">
    <div class="font-semibold tracking-tight text-primary">Eventify</div>
    <div class="flex items-center space-x-2.5 text-sm md:space-x-4 lg:space-x-6">
      <RouterLink to="/" class="text-muted-foreground hover:text-primary">Home</RouterLink>
      <div class="text-muted-foreground hover:text-primary">About</div>
      <div class="text-muted-foreground hover:text-primary">Contact</div>
      <RouterLink
        v-can="'events.read'"
        to="/events"
        class="text-muted-foreground hover:text-primary"
        >Events</RouterLink
      >
    </div>

    <ProfileDropDown v-if="authStore.user" />
    <div v-else class="flex items-center space-x-3">
      <RouterLink to="/auth/register">
        <Button>Register</Button>
      </RouterLink>
      <RouterLink to="/auth/login">
        <Button variant="outline">Login</Button>
      </RouterLink>
    </div>
  </div>
  <Separator />
</template>
