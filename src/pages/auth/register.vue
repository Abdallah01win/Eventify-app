<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/authStore'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

import { registertypedSchema as validationSchema } from './components'

const authStore = useAuthStore()

const loading = ref(false)

const form = useForm({
  validationSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  loading.value = true

  const isValid = await form.validate()

  if (isValid) {
    authStore.register(values).finally(() => (loading.value = false))
  }
})
</script>

<template>
  <AuthLayout>
    <template #form>
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Register</h1>
        <p class="text-balance text-muted-foreground">Enter your info below to create an account</p>
      </div>
      <form class="grid gap-4" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your name"
                type="text"
                v-bind="componentField"
                :disabled="loading"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

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
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                v-bind="componentField"
                placeholder="Enter a password"
                :disabled="loading"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full" :disabled="loading || !form.meta.value.valid">
          <Loader2 v-if="loading" class="mr-1 h-4 w-4 animate-spin" />
          <span>Sign up</span>
        </Button>
      </form>

      <div class="mt-4 text-center text-sm">
        Already have an account?
        <RouterLink to="/auth/login" class="underline"> Login </RouterLink>
      </div>
    </template>
  </AuthLayout>
</template>
