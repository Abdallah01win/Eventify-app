<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/layouts/AuthLayout.vue'
</script>

<template>
  <AuthLayout>
    <template #form>
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Register</h1>
        <p class="text-balance text-muted-foreground">Enter your info below to create an account</p>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" type="text" placeholder="Enter your name" required />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="me@example.com" required />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" required placeholder="Enter a password" />
        </div>
        <Button type="submit" class="w-full"> Sign up </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <RouterLink to="/auth/login" class="underline"> Login </RouterLink>
      </div>
    </template>
  </AuthLayout>
</template>
