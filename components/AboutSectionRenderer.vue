<template>
  <div v-if="section && section.isActive !== false">
    <!-- 1. SPLIT STORY (Our Journey & Corporate Overview) -->
    <template v-if="section.type === 'split-story'">
      <div
        :class="[
          'py-20 px-6 sm:px-12 relative',
          section.bgTheme === 'dark-image'
            ? 'bg-cover bg-fixed bg-center bg-no-repeat text-white'
            : section.bgTheme === 'slate'
            ? 'bg-slate-50 text-slate-900 border-t border-slate-200'
            : 'bg-white text-slate-900'
        ]"
        :style="section.bgTheme === 'dark-image' && section.bgImage ? { backgroundImage: `url(${section.bgImage})` } : {}"
      >
        <div v-if="section.bgTheme === 'dark-image'" class="absolute inset-0 bg-blue-950/85"></div>
        <div class="relative grid gap-8 grid-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto items-center">
          <div>
            <span
              v-if="section.badge"
              :class="[
                'text-xs uppercase font-bold tracking-widest block mb-1',
                section.bgTheme === 'dark-image' ? 'text-amber-400' : 'text-amber-500'
              ]"
            >
              {{ section.badge }}
            </span>
            <h2
              :class="[
                'text-3xl md:text-5xl font-extrabold tracking-tight mt-1',
                section.bgTheme === 'dark-image' ? 'text-white' : 'text-blue-950'
              ]"
            >
              {{ section.title }}
            </h2>
            <p
              v-if="section.subtitle"
              :class="[
                'mt-3 text-sm md:text-base italic',
                section.bgTheme === 'dark-image' ? 'text-slate-300' : 'text-slate-600'
              ]"
            >
              {{ section.subtitle }}
            </p>
          </div>
          <div
            :class="[
              'leading-relaxed space-y-4 text-sm md:text-base',
              section.bgTheme === 'dark-image' ? 'text-white/90' : 'text-slate-700'
            ]"
          >
            <p v-for="(p, pIdx) in (section.paragraphs || [])" :key="pIdx">
              {{ p }}
            </p>
          </div>
        </div>
      </div>
    </template>

    <!-- 2. CORE VALUES & VISION (EXCELLENCE AND COMPETITIVE) -->
    <template v-else-if="section.type === 'core-values'">
      <div
        :class="[
          'py-20 px-6 sm:px-12 border-t border-slate-200 relative',
          section.bgTheme === 'dark-image' || section.bgTheme === 'dark'
            ? 'bg-slate-900 text-white'
            : section.bgTheme === 'slate'
            ? 'bg-slate-50 text-slate-900'
            : 'bg-white text-slate-900'
        ]"
      >
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto items-center">
          <!-- Left Column: Badge & Title (Matching Our Journey) -->
          <div>
            <span
              v-if="section.badge"
              class="text-xs uppercase font-bold tracking-widest text-amber-500 block mb-1"
            >
              {{ section.badge }}
            </span>
            <h2 class="text-3xl md:text-5xl font-extrabold text-blue-950 tracking-tight mt-1">
              {{ section.title || 'EXCELLENCE AND COMPETITIVE' }}
            </h2>
            <p
              v-if="section.quote"
              class="mt-3 text-sm md:text-base italic text-slate-600 leading-relaxed max-w-md border-l-2 border-amber-400 pl-3"
            >
              "{{ section.quote }}"
            </p>
          </div>

          <!-- Right Column: Simple Bold Excellence & Competitive, and new paragraph for footerNote -->
          <div class="text-slate-700 leading-relaxed space-y-4 text-sm md:text-base">
            <p v-for="(pillar, plIdx) in (section.pillars || [])" :key="plIdx">
              <strong class="font-bold text-blue-950">{{ formatPillarPrefix(pillar.title) }}</strong> {{ pillar.description || pillar.text }}
            </p>
            <p v-if="section.footerNote">
              {{ section.footerNote }}
            </p>
          </div>
        </div>
      </div>
    </template>

    <!-- 3. FEATURE CARDS -->
    <template v-else-if="section.type === 'feature-cards'">
      <div class="py-16 px-6 sm:px-12 bg-slate-50 border-t border-slate-200">
        <div class="max-w-screen-xl mx-auto">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span v-if="section.badge" class="text-xs uppercase font-bold tracking-widest text-amber-500 block mb-1">
              {{ section.badge }}
            </span>
            <h2 class="text-3xl md:text-4xl font-extrabold text-blue-950">
              {{ section.title }}
            </h2>
            <p v-if="section.description" class="text-slate-600 text-sm mt-2">
              {{ section.description }}
            </p>
          </div>
          <div :class="['grid gap-6', (section.cards || []).length <= 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3']">
            <div
              v-for="(card, cIdx) in (section.cards || [])"
              :key="cIdx"
              class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-amber-400 transition"
            >
              <h4 class="font-bold text-lg text-blue-950 mb-2">{{ card.title }}</h4>
              <p class="text-slate-600 text-xs md:text-sm leading-relaxed">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 4. QUOTE BANNER -->
    <template v-else-if="section.type === 'quote-banner'">
      <div class="py-16 px-6 bg-blue-950 text-white text-center relative overflow-hidden">
        <div class="max-w-3xl mx-auto relative z-10 space-y-4">
          <span v-if="section.badge" class="text-xs uppercase font-bold tracking-widest text-amber-400">
            {{ section.badge }}
          </span>
          <h3 class="text-2xl md:text-4xl font-extrabold leading-snug">
            "{{ section.quote || section.title }}"
          </h3>
          <p v-if="section.author" class="text-xs uppercase font-bold tracking-widest text-amber-400">
            — {{ section.author }}
          </p>
        </div>
      </div>
    </template>

    <!-- 5. HEADER / HERO BANNER (BACKGROUND IMAGE WITH CENTERED TITLE) -->
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

    <!-- 6. INTRO SECTION (SectionIntroHeader standard) -->
    <template v-else-if="section.type === 'intro-section' || section.type === 'intro'">
      <div class="py-12 bg-white">
        <div class="px-6 sm:px-12 max-w-screen-xl mx-auto">
          <SectionIntroHeader
            :badge="section.badge"
            :title="section.title"
            :description="section.description"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  section: Record<string, any>;
}>();

const formatPillarPrefix = (title?: string) => {
  if (!title) return '';
  const t = title.trim();
  if (t.endsWith(':') || t.endsWith('–') || t.endsWith('-')) return t;
  return `${t} –`;
};
</script>
