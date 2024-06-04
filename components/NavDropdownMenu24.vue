<template>
    <li>
        <a href="#" class="block px-4 py-2 text-xs uppercase hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{title}}</a>
    </li>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

