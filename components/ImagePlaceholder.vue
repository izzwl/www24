<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center p-4 rounded bg-slate-100 border border-slate-300 text-slate-600 text-center select-none"
    :class="containerClass"
  >
    <svg class="w-10 h-10 mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span class="font-semibold text-sm text-slate-800 tracking-wide">{{ label || 'Image Asset' }}</span>
    <span class="text-xs text-slate-500 mt-1 uppercase tracking-wider">[Dapat diganti di /admin]</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  containerClass?: string;
}>();
</script>
