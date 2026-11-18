<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'CERTIFICATIONS'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'CERTIFICATIONS' }}</template>
    </HeaderSectionTest>

    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-screen-xl mx-auto px-6">
        <SectionIntroHeader
          v-for="(intro, idx) in activeIntroSections"
          :key="intro.id || idx"
          :badge="intro.badge || 'Global Standards'"
          :title="intro.title || 'Certifications & Accreditations'"
          :description="intro.description || 'Internationally recognized airworthiness authorizations, OEM approvals, and quality management systems assuring total flight and industrial safety compliance.'"
        />

        <!-- Image Grid Sections (Reusable) -->
        <div class="space-y-12">
          <ImageGridSection
            v-for="(sec, sIdx) in activeCertSections"
            :key="sec.id || sIdx"
            :section="sec"
          />
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
  title: 'Certificates & Quality Approvals'
});

const { data: content } = await useSiteContent('certificate');

const activeIntroSections = computed(() => {
  if (Array.isArray(content.value?.introSections) && content.value.introSections.length > 0) {
    return content.value.introSections.filter((i: any) => i.isActive !== false);
  }
  return [
    {
      badge: content.value?.badge || 'Global Standards',
      title: content.value?.title || 'Certifications & Accreditations',
      description: content.value?.description || content.value?.subtitle || 'Internationally recognized airworthiness authorizations, OEM approvals, and quality management systems assuring total flight and industrial safety compliance.'
    }
  ];
});

const activeCertSections = computed(() => {
  const list = content.value?.sections || content.value?.groups || defaultGroups;
  return list.filter((s: any) => s.isActive !== false);
});

const defaultGroups = [
  {
    name: 'Airworthiness Authority',
    items: [
      { name: 'IDAA (Indonesia Defence Airworthiness Authority)', image: '/static/img/certification/tniau.jpg' },
      { name: 'DCCA Indonesia', image: '/static/img/certification/kemenhub.jpg' },
      { name: 'Indonesian Air Force Airworthiness & Aviation Safety Center', image: '/static/img/certification/imaa.jpg' },
      { name: 'FAA - USA', image: '/static/img/certification/faa.jpg' },
      { name: 'CAAT - Thailand', image: '/static/img/certification/caat.png' },
      { name: 'CAAN - Nepal', image: '/static/img/certification/caan.png' },
      { name: 'TCCA - Canada', image: '/static/img/certification/tcca.png' }
    ]
  },
  {
    name: 'Engine Manufacturer (OEM)',
    items: [
      { name: 'GE - USA', image: '/static/img/certification/ge.jpg' },
      { name: 'Honeywell - USA', image: '/static/img/certification/honeywell.jpg' }
    ]
  },
  {
    name: 'Quality Management System',
    items: [
      { name: 'DNV ISO 9001 : 2015 Netherland', image: '/static/img/certification/dnv.jpg' },
      { name: 'KAN LK-105-IDN', image: '/static/img/certification/kan.jpg' }
    ]
  },
  {
    name: 'Industrial Turbine Services Certification',
    items: [
      { name: 'Solar Turbines A Caterpillar Company', image: '/static/img/certification/solar.jpg' },
      { name: 'PRAXAIR', image: '/static/img/certification/praxair.png' },
      { name: 'DNV ISO 9001 : 2015 Netherland', image: '/static/img/certification/dnv.jpg' },
      { name: 'KAN LK-105-IDN', image: '/static/img/certification/kan.jpg' }
    ]
  }
];
</script>
