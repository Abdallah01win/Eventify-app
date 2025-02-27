<template>
  <div class="w-full lg:grid lg:grid-cols-2">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[400px] gap-6">
        <slot name="form" />
      </div>
    </div>

    <div class="hidden h-screen bg-muted lg:block"></div>
  </div>
</template>
