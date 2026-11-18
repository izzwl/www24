<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'FIELD SERVICES'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'FIELD SERVICES' }}</template>
    </HeaderSectionTest>

    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-screen-xl mx-auto px-6">
        <SectionIntroHeader
          v-for="(intro, idx) in activeIntroSections"
          :key="intro.id || idx"
          :badge="intro.badge || 'Global On-Site Support'"
          :title="intro.title || 'Industrial Turbine Services: Field Services Capabilities'"
          :description="intro.description || 'NTP provides responsive on-site engineering services, field overhauls, advanced inspections, and non-destructive examination directly at client operating sites worldwide.'"
        />

        <!-- 5 Capabilities Cards (PDF Slide 3) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(item, idx) in activeServices"
            :key="item.id || idx"
            class="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div class="h-48 w-full bg-slate-200 overflow-hidden">
                <AppImage
                  :src="item.image"
                  :alt="item.title"
                  img-class="w-full h-full object-cover hover:scale-105 transition duration-300"
                  :label="item.title"
                />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-blue-950 mb-2">{{ item.title }}</h3>
                <p class="text-xs md:text-sm text-slate-600 leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
            <div class="px-6 pb-6 pt-2">
              <span class="inline-block text-xs font-semibold text-blue-950 bg-amber-400 px-3 py-1 rounded">
                {{ item.tag || 'Certified NTP Field Team' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ContactSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

definePageMeta({
  layout: 'tw'
});

useHead({
  title: 'Field Services'
});

const { data: content } = await useSiteContent('fieldServices');

const activeIntroSections = computed(() => {
  if (Array.isArray(content.value?.introSections) && content.value.introSections.length > 0) {
    return content.value.introSections.filter((i: any) => i.isActive !== false);
  }
  return [
    {
      badge: content.value?.badge || 'Global On-Site Support',
      title: content.value?.title || 'Industrial Turbine Services: Field Services Capabilities',
      description: content.value?.description || 'NTP provides responsive on-site engineering services, field overhauls, advanced inspections, and non-destructive examination directly at client operating sites worldwide.'
    }
  ];
});

const activeServices = computed(() => {
  const list = content.value?.items || defaultItems;
  return list.filter((item: any) => item.isActive !== false);
});

const defaultItems = [
  {
    title: 'On Site Overhaul',
    description: 'Comprehensive mechanical overhaul conducted directly at customer power plant or operating field.',
    image: '/static/img/services/industrial01.jpg'
  },
  {
    title: 'On Site Coating',
    description: 'Advanced thermal and protective coating applications deployed directly on operational components.',
    image: '/static/img/services/coating01.jpg'
  },
  {
    title: 'On Site Inspection',
    description: 'Critical dimensional and operational integrity verification performed by certified field specialists.',
    image: '/static/img/services/industrial02.jpg'
  },
  {
    title: 'Borescope Inspection',
    description: 'High-resolution video borescope diagnostics for turbine blades, nozzles and combustion chambers without teardown.',
    image: '/static/img/services/aero01.jpg'
  },
  {
    title: 'On Site NDI',
    description: 'Non-Destructive Inspection (NDI) utilizing magnetic particle, dye penetrant, and eddy current methods.',
    image: '/static/img/services/facilities.jpg'
  }
];
</script>
