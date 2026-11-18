<template>
  <div v-if="section && section.isActive !== false" class="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200">
    <!-- Section Header (Title, Badge, Description, Count) -->
    <div class="border-b border-slate-200 pb-4 mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <span
          v-if="section.badge"
          class="text-xs uppercase font-bold tracking-widest text-amber-500 block mb-1"
        >
          {{ section.badge }}
        </span>
        <h3 class="text-lg md:text-2xl font-bold text-blue-950 uppercase tracking-wider">
          {{ section.title || section.name }}
        </h3>
        <p
          v-if="section.description || section.subtitle"
          class="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed"
        >
          {{ section.description || section.subtitle }}
        </p>
      </div>

      <span class="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg shadow-xs shrink-0">
        {{ activeItems.length }} Item
      </span>
    </div>

    <!-- Items Empty State -->
    <div v-if="activeItems.length === 0" class="py-8 text-center text-xs text-slate-400">
      Belum ada gambar yang ditampilkan dalam section ini.
    </div>

    <!-- Items Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      <div
        v-for="(item, iIdx) in activeItems"
        :key="item.id || iIdx"
        class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-between text-center hover:shadow-md hover:border-blue-950 transition group"
      >
        <!-- Image Box -->
        <div class="h-20 w-full flex items-center justify-center p-2 mb-2 bg-white rounded">
          <AppImage
            :src="item.image || item.logo"
            :alt="item.name"
            img-class="max-h-16 max-w-full object-contain mx-auto group-hover:scale-105 transition duration-300"
            :label="item.name"
          />
        </div>

        <!-- Texts -->
        <div class="w-full">
          <h4 class="text-xs font-bold text-blue-950 leading-tight">
            {{ item.name }}
          </h4>
          <span
            v-if="item.description || item.country"
            class="text-[11px] text-slate-500 block mt-1 leading-snug line-clamp-2"
          >
            {{ item.description || item.country }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  section: Record<string, any>;
}>();

const activeItems = computed(() => {
  const list = props.section?.items || [];
  return list.filter((it: any) => it.isActive !== false);
});
</script>
