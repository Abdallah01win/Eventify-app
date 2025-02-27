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
            <h1 class="text-3xl font-bold">Login</h1>
            <p class="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="me@example.com" required />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required placeholder="Enter your password" />
            </div>
            <Button type="submit" class="w-full"> Login </Button>
          </div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <RouterLink to="/auth/register" class="underline"> Sign up </RouterLink>
          </div>
    </template>
  </AuthLayout>
</template>
