<template>
    <li>
        <a href="#" class="block py-2 px-3 text-xs text-gray-700 uppercase rounded bg-transparent md:p-0 hover:text-blue-800/90">{{title}}</a>
    </li>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

