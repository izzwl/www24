<template>
  <div class="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3 mb-6">
    <div class="flex items-center justify-between border-b border-blue-200/80 pb-2">
      <div class="flex items-center gap-2">
        <span class="text-base">🖼️</span>
        <div>
          <h3 class="text-xs font-bold text-blue-950 uppercase tracking-wide">
            {{ label || 'Banner Header Halaman' }}
          </h3>
          <p class="text-[11px] text-slate-500">
            Ubah teks judul utama banner dan gambar background (ntp-bg-old.jpg)
          </p>
        </div>
      </div>
      <span class="text-[10px] font-mono bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-semibold">
        HeaderSection
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="text-[11px] font-semibold text-slate-700 block mb-1">
          Teks Judul Banner &lt;h2&gt;
        </label>
        <input
          v-model="target[titleKey || 'headerTitle']"
          :placeholder="defaultTitle"
          class="w-full p-2 border border-slate-300 rounded text-xs font-bold text-blue-950 bg-white focus:ring-1 focus:ring-blue-500"
        />
        <p class="text-[10px] text-slate-400 mt-1">Default jika kosong: "{{ defaultTitle }}"</p>
      </div>

      <div>
        <label class="text-[11px] font-semibold text-slate-700 block mb-1">
          Gambar Background Banner
        </label>
        <div class="flex gap-2">
          <input
            v-model="target[bgKey || 'headerBg']"
            placeholder="/static/img/ntp-bg-old.jpg"
            class="flex-1 p-2 border border-slate-300 rounded text-xs font-mono bg-white focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            @click="$emit('openMediaPicker', target, bgKey || 'headerBg')"
            class="px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold rounded transition shrink-0"
          >
            Pilih Media
          </button>
        </div>
        <p class="text-[10px] text-slate-400 mt-1">Kosongkan untuk memakai background default.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    target: Record<string, any>;
    defaultTitle?: string;
    titleKey?: string;
    bgKey?: string;
    label?: string;
  }>(),
  {
    defaultTitle: '',
    titleKey: 'headerTitle',
    bgKey: 'headerBg',
    label: 'Banner Header Halaman'
  }
);

defineEmits<{
  (e: 'openMediaPicker', target: any, key: string): void;
}>();
</script>
