<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'AWARDS AND ACHIEVEMENTS'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'AWARDS AND ACHIEVEMENTS' }}</template>
    </HeaderSectionTest>

    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-screen-xl mx-auto px-6">
        <SectionIntroHeader
          v-for="(intro, idx) in activeIntroSections"
          :key="intro.id || idx"
          :badge="intro.badge || 'Track Record'"
          :title="intro.title || 'AWARDS AND ACHIEVEMENTS'"
          :description="intro.description || 'Recognitions of excellence in aerospace engineering, industrial maintenance, and safety reliability over 30 years of continuous operation.'"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(item, aIdx) in activeAwards"
            :key="item.id || aIdx"
            class="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-2xl font-black text-amber-500">{{ item.year }}</span>
                <span class="text-xs font-semibold px-2.5 py-1 bg-blue-950 text-white rounded">
                  {{ item.badge || 'NTP Milestone' }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-blue-950 mb-2 leading-snug">{{ item.title }}</h3>
              <span v-if="item.organization" class="text-xs font-semibold text-slate-500 block mb-3">
                {{ item.organization }}
              </span>
              <p v-if="item.description" class="text-xs md:text-sm text-slate-600 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

definePageMeta({
  layout: 'tw'
});

useHead({
  title: 'Awards & Achievements'
});

const { data: content } = await useSiteContent('awards');

const activeIntroSections = computed(() => {
  if (Array.isArray(content.value?.introSections) && content.value.introSections.length > 0) {
    return content.value.introSections.filter((i: any) => i.isActive !== false);
  }
  return [
    {
      badge: content.value?.badge || 'Track Record',
      title: content.value?.title || 'AWARDS AND ACHIEVEMENTS',
      description: content.value?.description || 'Recognitions of excellence in aerospace engineering, industrial maintenance, and safety reliability over 30 years of continuous operation.'
    }
  ];
});

const activeAwards = computed(() => {
  const list = content.value?.items || defaultItems;
  return list.filter((item: any) => item.isActive !== false);
});

const defaultItems = [
  {
    title: 'Excellence in Defense Aviation MRO',
    year: '2023',
    organization: 'Ministry of Defence RI',
    description: 'Awarded for exceptional service reliability on Indonesian military aero fleet overhaul.'
  },
  {
    title: 'Top Performance Authorized Maintenance Center',
    year: '2022',
    organization: 'OEM Partner Network',
    description: 'Recognized for top quartile turnaround time and zero-defect quality score.'
  },
  {
    title: 'Industrial Turbine Overhaul Milestone',
    year: '2021',
    organization: 'BPPT / BRIN',
    description: 'Achievement for reverse engineering and 4MW geothermal turbine operations at Kamojang.'
  }
];
</script>
