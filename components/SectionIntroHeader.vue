<template>
  <div class="max-w-3xl mb-12">
    <span
      v-if="badge"
      class="text-xs uppercase font-bold tracking-widest text-amber-500 block mb-1"
    >
      {{ badge }}
    </span>
    <h2
      v-if="title"
      class="text-3xl md:text-5xl font-extrabold text-blue-950 mt-1 mb-4 tracking-tight"
    >
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="text-slate-600 text-sm md:text-base leading-relaxed"
    >
      {{ description }}
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  badge?: string;
  title?: string;
  description?: string;
}>();
</script>
