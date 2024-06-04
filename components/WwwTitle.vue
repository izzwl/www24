<template>
    <div>
        <Title>{{ title }}</Title>
    </div>
</template>
<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>