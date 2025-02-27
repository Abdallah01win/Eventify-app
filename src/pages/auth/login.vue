<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/authStore'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

import { logintypedSchema as validationSchema } from './components'

definePage({
  meta: {
    requiresAuth: false
  }
})

const authStore = useAuthStore()

const loading = ref(false)

const form = useForm({
  validationSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  loading.value = true

  const isValid = await form.validate()

  if (isValid) {
    authStore.login(values).finally(() => (loading.value = false))
  }
})
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
      <form class="grid gap-4" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="example@gmail.com"
                type="email"
                v-bind="componentField"
                :disabled="loading"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <div class="flex items-center">
              <FormLabel>Password</FormLabel>
              <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <FormControl>
              <Input
                type="password"
                v-bind="componentField"
                placeholder="Enter your password"
                :disabled="loading"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full" :disabled="loading || !form.meta.value.valid">
          <Loader2 v-if="loading" class="mr-1 h-4 w-4 animate-spin" />
          <span>Login</span>
        </Button>
      </form>

      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <RouterLink to="/auth/register" class="underline"> Sign up </RouterLink>
      </div>
    </template>
  </AuthLayout>
</template>
