<template>
    <li>
        <NuxtLink :to="to" class="block px-4 py-2 text-xs uppercase hover:text-black hover:bg-amber-300">
          {{title}}
        </NuxtLink>
    </li>
</template>

<script setup lang="ts">
defineProps<{
  title?: string,
  to?: string
}>()
</script>
