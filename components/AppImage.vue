<template>
  <div :class="['relative overflow-hidden', wrapperClass]">
    <img
      v-if="!hasError && src && !src.includes('placeholder-')"
      :src="src"
      :alt="alt || label || 'NTP'"
      :class="imgClass"
      @error="hasError = true"
    />
    <ImagePlaceholder
      v-else
      :label="label || alt || 'Image Preview'"
      :container-class="placeholderClass"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  src?: string;
  alt?: string;
  label?: string;
  wrapperClass?: string;
  imgClass?: string;
  placeholderClass?: string;
}>();

const hasError = ref(false);

watch(() => props.src, () => {
  hasError.value = false;
});
</script>
