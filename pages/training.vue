<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'TRAINING SERVICES'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'TRAINING SERVICES' }}</template>
    </HeaderSectionTest>

    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-screen-xl mx-auto px-6">
        <SectionIntroHeader
          v-for="(intro, idx) in activeIntroSections"
          :key="intro.id || idx"
          :badge="intro.badge || 'Workforce & Technical Mastery'"
          :title="intro.title || 'Aero Engine & Industrial Turbomachinery Training Programs'"
          :description="intro.description || 'Empowering aerospace and heavy industry engineers with hands-on technical competencies, maintenance certifications, and advanced diagnostic training conducted by certified NTP instructors.'"
        />

        <!-- Training Programs & Capabilities Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(item, idx) in activeTrainingItems"
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
                {{ item.tag || 'Certified MRO Training' }}
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
  title: 'Training Services'
});

const { data: content } = await useSiteContent('training');

const activeIntroSections = computed(() => {
  if (Array.isArray(content.value?.introSections) && content.value.introSections.length > 0) {
    return content.value.introSections.filter((i: any) => i.isActive !== false);
  }
  return [
    {
      badge: content.value?.badge || 'Workforce & Technical Mastery',
      title: content.value?.title || 'Aero Engine & Industrial Turbomachinery Training Programs',
      description: content.value?.description || 'Empowering aerospace and heavy industry engineers with hands-on technical competencies, maintenance certifications, and advanced diagnostic training conducted by certified NTP instructors.'
    }
  ];
});

const activeTrainingItems = computed(() => {
  const list = content.value?.items || defaultTrainingItems;
  return list.filter((item: any) => item.isActive !== false);
});

const defaultTrainingItems = [
  {
    id: 'training-1',
    title: 'Gas Turbine Operation & Maintenance',
    tag: 'Certified MRO Training',
    description: 'Comprehensive practical program covering gas turbine mechanical assemblies, combustion systems, preventive maintenance protocols, and operational safety.',
    image: '/static/img/services/industrial01.jpg',
    isActive: true
  },
  {
    id: 'training-2',
    title: 'Aero Engine Line & Base Maintenance',
    tag: 'Aviation Engineering',
    description: 'Specialized coursework on turboprop and turboshaft propulsion systems, line replaceable units (LRUs), borescope verification, and airworthiness conformity.',
    image: '/static/img/services/aero01.jpg',
    isActive: true
  },
  {
    id: 'training-3',
    title: 'Non-Destructive Inspection & Testing (NDI)',
    tag: 'ASNT / DGCA Compliant',
    description: 'Hands-on certification in Liquid Penetrant Testing (PT), Magnetic Particle Testing (MT), and Eddy Current Testing (ET) for critical aerospace structures.',
    image: '/static/img/services/facilities.jpg',
    isActive: true
  },
  {
    id: 'training-4',
    title: 'Dynamic Balancing & Vibration Analysis',
    tag: 'Condition Monitoring',
    description: 'Advanced diagnostic training for rotating turbomachinery vibration spectrum interpretation, on-site single/dual plane balancing, and resonance mitigation.',
    image: '/static/img/services/industrial02.jpg',
    isActive: true
  },
  {
    id: 'training-5',
    title: 'Protective Coating & Surface Treatment',
    tag: 'Specialized Metallurgical',
    description: 'Instruction in surface preparation, Sermetel coating applications, curing procedures, and corrosion prevention for gas turbine components.',
    image: '/static/img/services/coating01.jpg',
    isActive: true
  }
];
</script>
