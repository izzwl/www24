<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'ABOUT US'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'ABOUT US' }}</template>
    </HeaderSectionTest>

    <!-- Dynamic Sections -->
    <AboutSectionRenderer
      v-for="(sec, sIdx) in activeSections"
      :key="sec.id || sIdx"
      :section="sec"
    />

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
  title: 'About Us'
});

const { data: content } = await useSiteContent('aboutUs');

const activeSections = computed(() => {
  if (Array.isArray(content.value?.sections) && content.value.sections.length > 0) {
    return content.value.sections.filter((s: any) => s.isActive !== false);
  }
  return defaultAboutSections;
});

const defaultAboutSections = [
  {
    id: 'about-journey',
    type: 'split-story',
    isActive: true,
    badge: 'History & Heritage',
    title: 'OUR JOURNEY',
    bgTheme: 'white',
    paragraphs: [
      'Established on June 23, 1998, which formerly had been the UMC-IPTN division founded on August 23, 1986. NTP Head Office & Workshop is located at Jl. Pajajaran 154 (KP. IV) Bandung 40174 INDONESIA, adjacent to Husein Sastranegara International Airport.',
      'PT Nusantara Turbin dan Propulsi (NTP), as a globally recognized company in the maintenance of aero engines and industrial rotating equipment, operates an integrated 45,000 m² facility empowered by over 300 highly qualified and certified professionals.'
    ]
  },
  {
    id: 'about-overview',
    type: 'split-story',
    isActive: true,
    badge: 'Core Identity',
    title: 'CORPORATE OVERVIEW',
    bgTheme: 'dark-image',
    bgImage: '/static/img/bg-alt-eng.jpg',
    paragraphs: [
      'PT Nusantara Turbin dan Propulsi (NTP) is a trusted excellence center leading Southeast Asia in engineering, maintenance, repair and overhaul of gas turbines, steam turbines, and rotating machinery.',
      'From its founding as the Universal Maintenance Center (UMC) of PT IPTN, NTP has continuously expanded its international certifications to serve defense, commercial aviation, and heavy industrial clients worldwide.'
    ]
  },
  {
    id: 'about-values',
    type: 'core-values',
    isActive: true,
    badge: 'Core Values & Vision',
    title: 'EXCELLENCE AND COMPETITIVE',
    quote: 'Delivering Excellence, Building Competitiveness, Sustaining Trust.',
    bgTheme: 'white',
    pillars: [
      {
        title: 'Excellence',
        description: 'We uphold the highest standards of quality, professionalism, safety, and reliability in every task to deliver service excellence to our customers.'
      },
      {
        title: 'Competitive',
        description: 'We build competitiveness through enhancing capabilities, competencies, efficiency, innovation, and strategic partnerships, enabling PT NTP to deliver competitive and value-added MRO solutions.'
      }
    ],
    footerNote: 'PT NTP is committed to delivering the highest quality of service while strengthening competitiveness through people development, capability enhancement, innovation, and strategic collaboration.'
  }
];
</script>
