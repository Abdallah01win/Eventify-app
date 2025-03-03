<script setup lang="ts">
import Navigation from '@/components/Navigation/Index.vue'
import { Button } from '@/components/ui/button'
import { Armchair } from 'lucide-vue-next'
</script>

<template>
  <Navigation />
  <section class="relative overflow-hidden bg-background lg:h-[var(--view-height)]">
    <div class="absolute inset-0 -z-10 opacity-5">
      <div
        class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
      ></div>
    </div>

    <div class="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div class="max-w-xl">
          <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Orchestrate Perfect Events,
            <span class="text-muted-foreground">Effortlessly</span>
          </h1>
          <p class="mt-6 text-lg text-muted-foreground">
            Transform your event planning experience with our all-in-one platform. From intimate
            gatherings to grand galas, manage every detail with precision and ease.
          </p>
          <div class="mt-8 flex flex-col gap-4 sm:flex-row">
            <RouterLink to="/auth/register" class="contents">
              <Button class="rounded-lg px-8 py-3">Start Planning Free</Button>
            </RouterLink>
            <RouterLink to="/" class="contents">
              <Button variant="outline" class="rounded-lg px-8 py-3">Watch Demo</Button>
            </RouterLink>
          </div>

          <div class="mt-12">
            <p class="mb-6 text-sm text-muted-foreground">Trusted by industry leaders</p>
            <div class="flex items-center">
              <div class="relative -ml-0 first:ml-0">
                <div
                  class="h-12 w-12 overflow-hidden rounded-full border border-white bg-background shadow-lg transition-transform duration-200 hover:-translate-y-1"
                >
                  <img
                    src="@/assets/images/auth.webp"
                    alt="Company logo"
                    class="h-full w-full rounded-full object-cover p-1 opacity-80 transition-opacity hover:opacity-100"
                  />
                </div>
              </div>

              <div class="relative -ml-4">
                <div
                  class="h-12 w-12 overflow-hidden rounded-full border border-white bg-background shadow-lg transition-transform duration-200 hover:-translate-y-1"
                >
                  <img
                    src="@/assets/images/auth.webp"
                    alt="Company logo"
                    class="h-full w-full rounded-full object-cover p-1 opacity-80 transition-opacity hover:opacity-100"
                  />
                </div>
              </div>

              <div class="relative -ml-4">
                <div
                  class="h-12 w-12 overflow-hidden rounded-full border border-white bg-background shadow-lg transition-transform duration-200 hover:-translate-y-1"
                >
                  <img
                    src="@/assets/images/auth.webp"
                    alt="Company logo"
                    class="h-full w-full rounded-full object-cover p-1 opacity-80 transition-opacity hover:opacity-100"
                  />
                </div>
              </div>

              <div class="relative -ml-4">
                <div
                  class="h-12 w-12 overflow-hidden rounded-full border border-white bg-background shadow-lg transition-transform duration-200 hover:-translate-y-1"
                >
                  <img
                    src="@/assets/images/auth.webp"
                    alt="Company logo"
                    class="h-full w-full rounded-full object-cover p-1 opacity-80 transition-opacity hover:opacity-100"
                  />
                </div>
              </div>

              <div class="relative -ml-4">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-muted shadow-lg transition-transform duration-200 hover:-translate-y-1"
                >
                  <span class="text-sm font-medium text-muted-foreground">+12</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="relative lg:ml-4">
          <div class="rounded-2xl bg-card p-4 shadow-2xl">
            <div class="aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src="@/assets/images/auth.webp"
                alt="Platform dashboard preview"
                class="h-full w-full object-cover"
              />
            </div>
            <div
              class="absolute -bottom-6 -left-6 rounded-lg border border-border bg-background p-4 shadow-lg"
            >
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Armchair />
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Events Managed</p>
                  <p class="text-2xl font-bold text-foreground">50,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
