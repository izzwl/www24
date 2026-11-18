<template>
    <p> {{ $route.params.id }}</p>
</template>

<script setup lang="ts">
const route = useRoute();
useHead({
  title: computed(() => `News & Media - ${route.params.id}`)
});
</script>