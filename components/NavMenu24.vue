<template>
    <li>
        <NuxtLink :to="to" class="block py-2 px-3 text-xs text-white uppercase rounded bg-transparent md:p-0 hover:text-sky-200/90">
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

