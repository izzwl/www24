<template>
  <div v-if="section && section.isActive !== false">
    <!-- 1. SPLIT EDITORIAL SECTION (SlideDescWithImg style) -->
    <template v-if="section.type === 'split-editorial'">
      <SlideDescWithImg :image="section.image" :rightbg="section.rightbg ? 'true' : 'false'">
        <template #h2>
          <span v-if="section.badge" class="block text-xs uppercase font-bold tracking-widest text-amber-500 mb-1">
            {{ section.badge }}
          </span>
          {{ section.title }}
        </template>
        <template #content>
          <p class="leading-relaxed text-slate-700">
            {{ section.description }}
          </p>

          <!-- Card Grid Display -->
          <div v-if="section.displayType === 'card'" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <div
              v-for="(item, idx) in (section.items || [])"
              :key="idx"
              class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm text-xs md:text-sm font-bold text-blue-950 flex items-center space-x-2.5 hover:border-amber-400 transition"
            >
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
              <span>{{ item }}</span>
            </div>
          </div>

          <!-- Plain List Display -->
          <ul v-else class="list-disc ml-6 mt-4 space-y-1.5 font-medium text-blue-950">
            <li v-for="(item, idx) in (section.items || [])" :key="idx">
              {{ item }}
            </li>
          </ul>
        </template>
      </SlideDescWithImg>
    </template>

    <!-- 2. AMC SHOWCASE (Authorized Maintenance Center Cards) -->
    <template v-else-if="section.type === 'amc-showcase'">
      <section class="py-16 bg-slate-50 border-t border-slate-200">
        <div class="px-6 mx-auto max-w-screen-xl">
          <div class="mb-10">
            <span v-if="section.badge" class="text-xs uppercase font-bold tracking-widest text-amber-500 block mb-1">
              {{ section.badge }}
            </span>
            <h2 class="text-3xl md:text-5xl font-extrabold text-blue-950 tracking-tight">
              {{ section.title || 'Authorized Maintenance Center (AMC)' }}
            </h2>
            <p v-if="section.description" class="text-slate-600 mt-2 text-sm md:text-base max-w-3xl leading-relaxed">
              {{ section.description }}
            </p>
          </div>

          <!-- AMC Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="(item, aIdx) in activeAmcItems"
              :key="aIdx"
              class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <span class="text-xs font-bold uppercase tracking-wider bg-blue-950 text-white px-3 py-1 rounded">
                    {{ item.badge || 'Authorized Maintenance Center (AMC)' }}
                  </span>
                  <span class="text-xs font-semibold text-amber-600">{{ item.title }}</span>
                </div>
                <div class="h-52 w-full flex items-center justify-center p-2 mb-4 bg-slate-100 rounded">
                  <AppImage
                    :src="item.image"
                    :alt="item.engine || item.name"
                    img-class="max-h-48 max-w-full object-contain mx-auto"
                    :label="item.engine || item.name || 'Engine AMC'"
                  />
                </div>
                <h3 class="text-xl font-bold text-blue-950">{{ item.engine || item.name }}</h3>
                <p v-if="item.series || item.capability" class="text-xs font-medium text-slate-700 mt-1">
                  {{ formatSeries(item.series || item.capability) }}
                </p>
                <p v-if="item.aircraft || item.type || item.application" class="text-xs text-slate-500 mt-0.5">
                  {{ formatSpec(item) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- 3. GROUPED GRID (Turbo Fan/Jet, Turbo Prop/Shaft, GE LM/TM, etc.) -->
    <template v-else-if="section.type === 'grouped-grid'">
      <section class="py-16 bg-slate-50 border-t border-slate-200">
        <div class="px-6 mx-auto max-w-screen-xl">
          <div class="mb-10">
            <span v-if="section.badge" class="text-xs uppercase font-bold tracking-widest text-amber-500 block mb-1">
              {{ section.badge }}
            </span>
            <h2 class="text-3xl md:text-5xl font-extrabold text-blue-950 tracking-tight">
              {{ section.title }}
            </h2>
            <p v-if="section.description" class="text-slate-600 mt-2 text-sm md:text-base max-w-3xl leading-relaxed">
              {{ section.description }}
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div
              v-for="(grp, gIdx) in (section.groups || [])"
              :key="gIdx"
              :class="[
                grp.colSpan === 4 ? 'lg:col-span-4' : grp.colSpan === 6 ? 'lg:col-span-6' : grp.colSpan === 12 ? 'lg:col-span-12' : 'lg:col-span-8',
                'bg-white p-6 rounded-xl border border-amber-300 shadow-sm flex flex-col'
              ]"
            >
              <div class="inline-block bg-amber-400 text-blue-950 text-xs font-bold uppercase px-3 py-1 rounded mb-4 self-start">
                {{ grp.badge || grp.title }}
              </div>

              <!-- Single col stack or 2-col grid depending on span -->
              <div :class="grp.colSpan === 4 ? 'space-y-4 flex-1' : 'grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1'">
                <div
                  v-for="(eng, eIdx) in (grp.items || []).filter((it: any) => it.isActive !== false)"
                  :key="eIdx"
                  class="p-4 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between hover:border-amber-200 transition"
                >
                  <div>
                    <div class="h-28 md:h-32 w-full flex items-center justify-center mb-2">
                      <AppImage
                        :src="eng.image"
                        :alt="eng.name"
                        img-class="max-h-24 md:max-h-28 max-w-full object-contain mx-auto"
                        :label="eng.name"
                      />
                    </div>
                    <h4 class="font-bold text-sm text-blue-950">{{ eng.name }}</h4>
                    <p v-if="eng.aircraft || eng.type || eng.application" class="text-xs text-slate-700 mt-0.5">
                      {{ formatSpec(eng, grp) }}
                    </p>
                  </div>
                  <p v-if="eng.series || eng.capability" class="text-[11px] text-slate-500 mt-2 border-t pt-1 border-slate-200">
                    {{ formatSeries(eng.series || eng.capability) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- 4. STEP TIMELINE (Manufacturing / Workflow Steps) -->
    <template v-else-if="section.type === 'step-timeline'">
      <section class="py-16 bg-white border-t border-slate-200">
        <div class="max-w-screen-xl mx-auto px-6">
          <div class="mb-10">
            <span v-if="section.badge" class="text-xs uppercase font-bold tracking-widest text-amber-500 block mb-1">
              {{ section.badge }}
            </span>
            <h3 class="text-2xl md:text-4xl font-extrabold text-blue-950 tracking-tight">
              {{ section.title }}
            </h3>
            <p v-if="section.description" class="text-slate-600 mt-2 text-sm md:text-base max-w-3xl leading-relaxed">
              {{ section.description }}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div
              v-for="(step, sIdx) in (section.steps || [])"
              :key="sIdx"
              class="p-6 rounded-xl bg-slate-50 border border-slate-200 relative shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div class="w-10 h-10 rounded-full bg-amber-400 text-blue-950 font-black flex items-center justify-center mb-3 text-sm shadow">
                  {{ step.step || sIdx + 1 }}
                </div>
                <h4 class="font-bold text-blue-950 text-base mb-1">{{ step.title || step.hp }}</h4>
                <p class="text-xs text-slate-600 leading-relaxed">{{ step.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Note Alert Box -->
          <div v-if="section.note" class="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs md:text-sm leading-relaxed flex items-start gap-3">
            <span class="font-bold uppercase tracking-wider text-xs px-2 py-0.5 bg-blue-950 text-white rounded shrink-0">
              NOTE
            </span>
            <span>{{ section.note }}</span>
          </div>
        </div>
      </section>
    </template>

    <!-- 5. FEATURE CARDS (Coating / Highlight Cards) -->
    <template v-else-if="section.type === 'feature-cards'">
      <section class="py-16 bg-slate-50 border-t border-slate-200">
        <div class="max-w-screen-xl mx-auto px-6">
          <div class="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div>
              <span v-if="section.badge" class="text-xs uppercase font-bold tracking-widest text-amber-500 block mb-1">
                {{ section.badge }}
              </span>
              <h3 class="text-2xl md:text-4xl font-extrabold text-blue-950 tracking-tight">
                {{ section.title }}
              </h3>
              <p v-if="section.description" class="text-slate-600 mt-2 text-sm md:text-base max-w-3xl leading-relaxed">
                {{ section.description }}
              </p>
            </div>
            <div v-if="section.partner" class="px-4 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-700 shadow-sm self-start">
              {{ section.partner }}
            </div>
          </div>

          <div :class="['grid gap-8', (section.cards || []).length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-3']">
            <div
              v-for="(card, cIdx) in (section.cards || [])"
              :key="cIdx"
              class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition"
            >
              <!-- Card with Image Beside Text -->
              <div v-if="card.image" class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center h-full">
                <div class="sm:col-span-7 space-y-2.5">
                  <span v-if="card.badge" class="inline-block text-xs font-bold text-amber-600 uppercase">
                    {{ card.badge }}
                  </span>
                  <h4 class="font-bold text-xl text-blue-950 leading-snug">{{ card.title }}</h4>
                  <p class="text-xs md:text-sm text-slate-700 leading-relaxed">{{ card.description }}</p>
                </div>
                <div class="sm:col-span-5 h-44 sm:h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <AppImage
                    :src="card.image"
                    :alt="card.title"
                    img-class="w-full h-full object-cover hover:scale-105 transition duration-300"
                    :label="card.title"
                  />
                </div>
              </div>

              <!-- Card without Image -->
              <div v-else class="space-y-3">
                <span v-if="card.badge" class="inline-block text-xs font-bold text-amber-600 uppercase">
                  {{ card.badge }}
                </span>
                <h4 class="font-bold text-lg text-blue-950">{{ card.title }}</h4>
                <p class="text-sm text-slate-700 leading-relaxed">{{ card.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- 6. QUICK CATEGORIES (Grid of Thumbnails) -->
    <template v-else-if="section.type === 'quick-categories'">
      <section class="py-12 bg-slate-50 border-t border-slate-200">
        <div class="max-w-screen-xl mx-auto px-6">
          <div v-if="section.title" class="mb-6">
            <span v-if="section.badge" class="text-xs uppercase font-bold tracking-widest text-amber-500 block mb-1">
              {{ section.badge }}
            </span>
            <h2 class="text-2xl md:text-3xl font-extrabold text-blue-950">
              {{ section.title }}
            </h2>
            <p v-if="section.description" class="text-slate-600 mt-1 text-sm">
              {{ section.description }}
            </p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              v-for="(cat, cIdx) in (section.items || [])"
              :key="cIdx"
              class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition text-center flex flex-col"
            >
              <div class="h-28 bg-slate-100 flex items-center justify-center p-1">
                <AppImage :src="cat.image" :alt="cat.title" img-class="h-full w-full object-cover rounded" :label="cat.title" />
              </div>
              <span class="text-xs font-bold text-blue-950 py-2.5 px-2 bg-blue-50/50 flex-1 flex items-center justify-center">
                {{ cat.title }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- 7. HEADER / HERO BANNER (BACKGROUND IMAGE WITH CENTERED TITLE) -->
    <template v-else-if="section.type === 'header-banner' || section.type === 'hero-banner'">
      <section
        class="bg-cover bg-center bg-no-repeat relative"
        :style="{ backgroundImage: `url(${section.bgImage || '/static/img/ntp-bg-old.jpg'})` }"
      >
        <div class="py-24 px-6 mx-auto max-w-screen-xl">
          <div>
            <h2 class="text-center text-3xl font-bold text-white md:text-4xl tracking-wider uppercase">
              {{ section.title }}
            </h2>
            <p v-if="section.subtitle" class="text-center text-slate-200 mt-2 text-sm md:text-base max-w-2xl mx-auto">
              {{ section.subtitle }}
            </p>
          </div>
        </div>
      </section>
    </template>

    <!-- 8. INTRO SECTION (SectionIntroHeader standard) -->
    <template v-else-if="section.type === 'intro-section' || section.type === 'intro'">
      <section class="py-12 bg-white">
        <div class="px-6 mx-auto max-w-screen-xl">
          <SectionIntroHeader
            :badge="section.badge"
            :title="section.title"
            :description="section.description"
          />
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  section: Record<string, any>;
}>();

const activeAmcItems = computed(() => {
  const items = props.section?.items || [];
  return items.filter((it: any) => it.isActive !== false);
});

const formatSeries = (val?: string) => {
  if (!val) return '';
  const lower = val.toLowerCase();
  return lower.startsWith('series:') || lower.startsWith('capability:') ? val : `Series: ${val}`;
};

const formatSpec = (item: any, group?: any) => {
  const val = item.aircraft || item.type || item.application;
  if (!val) return '';
  if (val.includes(':')) return val;

  if (item.aircraftLabel !== undefined && item.aircraftLabel !== null) {
    const lbl = item.aircraftLabel.trim();
    return lbl ? `${lbl}: ${val}` : val;
  }

  if (group?.itemLabel) {
    const lbl = group.itemLabel.trim();
    return lbl ? `${lbl}: ${val}` : val;
  }

  return `Aircraft: ${val}`;
};
</script>
