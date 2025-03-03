<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <main class="relative flex h-screen w-full flex-col items-center justify-center bg-background">
    <div class="absolute inset-0 -z-10 opacity-5">
      <div
        class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
      ></div>
    </div>

    <div class="text-center">
      <h1 class="relative">
        <span class="text-[150px] font-bold text-primary/10 lg:text-[250px]">404</span>
        <span
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-foreground lg:text-6xl"
        >
          Oops!
        </span>
      </h1>

      <div class="mt-8 max-w-lg px-4">
        <h2 class="mb-4 text-xl font-semibold text-foreground">
          Looks like this page doesn't exist at the moment.
        </h2>
        <p class="mb-8 text-muted-foreground">
          The page you're looking for has either been moved, deleted, or never existed. You can
          always go back home.
        </p>

        <RouterLink
          to="/"
          class="btn btn-primary mb-4 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3"
        >
          <Button variant="outline">
            <ArrowLeft class="h-5 w-5" />
            Back to Home
          </Button>
        </RouterLink>
      </div>
    </div>

    <div class="absolute bottom-8 text-sm text-muted-foreground">
      <p>© 2025 Evently. All rights reserved.</p>
    </div>
  </main>
</template>
