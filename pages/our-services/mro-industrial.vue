<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSection>
      <template #h2>industrial turbine services</template>
      <template #h1>
        <span class="bg-blue-950 text-white pl-3 pr-2">precision</span> works<br />
        for industrial <span class="bg-amber-400 text-blue-950 pl-2 pr-2 font-bold">turbine</span>
      </template>
    </HeaderSection>

    <!-- Dynamic Sections -->
    <MroSectionRenderer
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
  title: 'MRO Industrial & Gas Turbines'
});

const { data: content } = await useSiteContent('industrial');

const activeSections = computed(() => {
  if (Array.isArray(content.value?.sections) && content.value.sections.length > 0) {
    return content.value.sections.filter((s: any) => s.isActive !== false);
  }
  return defaultIndustrialSections;
});

const defaultIndustrialSections = [
  {
    id: 'ind-intro',
    type: 'split-editorial',
    isActive: true,
    badge: 'Precision & Heavy Rotating Equipment',
    title: 'Maintenance, Repair & Overhaul of Industrial Turbines',
    description: 'Maintaining industrial turbines and rotating equipment to prime operational readiness requires world-class engineering mastery. NTP provides high-precision lifecycle support, advanced field services, dynamic balancing, and certified component overhauls for oil & gas, petrochemical, and power generation sectors worldwide.',
    image: '/static/img/services/industrial01.jpg',
    displayType: 'card',
    rightbg: true,
    items: [
      'Gas Turbines & Steam Turbines MRO',
      'Centrifugal Compressors & Pumps',
      'Dynamic Balancing & Precision Overhauls',
      'Global 24/7 On-Site Field Services'
    ]
  },
  {
    id: 'ind-amc-solar',
    type: 'amc-showcase',
    isActive: true,
    badge: 'A Caterpillar Company',
    title: 'Solar Turbines Authorized Maintenance Center (AMC)',
    description: 'NTP has been appointed as AMC (Authorized Maintenance Center) Solar Turbine since 1987 and currently NTP has the best capability in the Asia Pacific up to level 4 (overhaul) to provide precision maintenance quality for our world-class customer.',
    items: [
      {
        isActive: true,
        badge: 'Solar Turbines AMC',
        title: 'Level 4 Overhaul Since 1987',
        engine: 'Solar Turbine Saturn 10',
        series: 'Saturn One Shaft, Saturn Two Shaft',
        capability: 'Capability - Level 4 (Overhaul, Repair, Engine Exchange)',
        image: '/static/img/engine/placeholder-saturn10.png'
      },
      {
        isActive: true,
        badge: 'Solar Turbines AMC',
        title: 'Level 4 Overhaul Since 1987',
        engine: 'Solar Turbine Centaur 40',
        series: 'Centaur 40 Single Shaft, Centaur 40 Two Shaft',
        capability: 'Capability - Level 4 (Overhaul, Repair, Sparepart Maintenance)',
        image: '/static/img/engine/placeholder-centaur40.png'
      },
      {
        isActive: true,
        badge: 'Solar Turbines AMC',
        title: 'Level 4 Overhaul Since 1987',
        engine: 'Solar Turbine Centaur 50',
        series: 'Centaur 50 Single Shaft',
        capability: 'Capability - Level 3 (Overhaul, Engine Exchange)',
        image: '/static/img/engine/placeholder-centaur50.png'
      },
      {
        isActive: true,
        badge: 'Solar Turbines AMC',
        title: 'Level 4 Overhaul Since 1987',
        engine: 'Solar Turbine Taurus 60',
        series: 'Taurus 60 Single Shaft',
        capability: 'Capability - Level 3 (Overhaul, Engine Exchange)',
        image: '/static/img/engine/placeholder-taurus60.png'
      }
    ]
  },
  {
    id: 'ind-gas-turbines',
    type: 'grouped-grid',
    isActive: true,
    badge: 'Gas Turbine Solutions',
    title: 'Industrial Gas Turbines & Aeroderivative Solutions',
    description: 'Precision maintenance, repair, and field overhaul capabilities for major industrial gas turbine platforms.',
    groups: [
      {
        id: 'grp-ge-series',
        badge: 'General Electric LM & TM Series',
        itemLabel: 'Application',
        colSpan: 6,
        items: [
          {
            isActive: true,
            name: 'GE LM2500 Series',
            aircraftLabel: 'Application',
            aircraft: 'Industrial Gas Turbine',
            series: 'Capability: Overhaul, Repair, Field Service',
            image: '/static/img/engine/placeholder-lm2500.png'
          },
          {
            isActive: true,
            name: 'GE TM2500 Series',
            aircraftLabel: 'Application',
            aircraft: 'Industrial Mobile Gas Turbine',
            series: 'Capability: Overhaul, Repair, Field Service',
            image: '/static/img/engine/placeholder-tm2500.png'
          },
          {
            isActive: true,
            name: 'GE LM6000 Series',
            aircraftLabel: 'Application',
            aircraft: 'Heavy Industrial Aeroderivative',
            series: 'Capability: Overhaul, Repair, Field Service',
            image: '/static/img/engine/placeholder-lm6000.png'
          }
        ]
      },
      {
        id: 'grp-heavy-turbines',
        badge: 'Industrial Heavy Turbines',
        itemLabel: 'Application',
        colSpan: 6,
        items: [
          {
            isActive: true,
            name: 'Turbomeca Astazou (GT Astazou IV M1)',
            aircraftLabel: 'Application',
            aircraft: 'Industrial Power Generation',
            series: 'Capability: Overhaul, Repair, Field Service',
            image: '/static/img/engine/placeholder-astazou.png'
          },
          {
            isActive: true,
            name: 'Pratt & Whitney FT8 Engine',
            aircraftLabel: 'Application',
            aircraft: 'Industrial Marine & Power',
            series: 'Capability: Overhaul, Repair, Field Service',
            image: '/static/img/engine/placeholder-ft8.png'
          }
        ]
      }
    ]
  },
  {
    id: 'ind-steam-timeline',
    type: 'step-timeline',
    isActive: true,
    badge: 'Engineering & Reverse Manufacturing',
    title: 'Industrial Steam Turbine Manufacturing Capabilities',
    description: 'Precision reverse engineering and manufacturing capabilities from single-stage to multi-stage turbines up to 4 MW.',
    steps: [
      { step: '1', title: 'STEAM TURBINE 450 HP', desc: 'Single Stage Back Pressure - PG Asem Bagus' },
      { step: '2', title: 'STEAM TURBINE 2 MW', desc: 'Multi Stage Back Pressure - PG Asem Bagus' },
      { step: '3', title: 'STEAM TURBINE 4 MW', desc: 'Multi Stage Back Pressure - BPPT' },
      { step: '4', title: 'STEAM TURBINE 3 MW', desc: 'Multistage Condensing Geothermal - PLTP Kamojang' }
    ],
    note: 'With the experience and expertise of our engineers, we can reverse engineer and manufacture steam turbines up to 4MW, one of the turbines we manufactured is still operating and running well at Kamojang Geothermal Power Plant.'
  },
  {
    id: 'ind-coating',
    type: 'feature-cards',
    isActive: true,
    badge: 'Surface Engineering',
    partner: 'Partner: PRAXAIR',
    title: 'Industrial Coating Capabilities',
    description: 'Specialized surface coating technologies developed in partnership with PRAXAIR for extreme chemical and thermal protection.',
    cards: [
      {
        badge: 'High Precision Protection',
        title: 'SermeTel Coating',
        description: 'SermeTel Coating is used on any component for corrosion and erosion protection, tight tolerances. Can be applied to dimensionally critical surfaces, precision coating thickness as thin as 0.3 mils.',
        image: '/static/img/services/coating01.jpg'
      },
      {
        badge: 'Anti-Fouling System',
        title: 'SermaLon Coating',
        description: 'SermaLon Coating is coating systems developed to provide anti-fouling and corrosion protection to compressor components and industrial gas turbine components exposed to wet chlorides, as well as steam turbine components.',
        image: '/static/img/services/industrial02.jpg'
      }
    ]
  },
  {
    id: 'ind-quick-categories',
    type: 'quick-categories',
    isActive: true,
    badge: 'Workshop Capabilities',
    title: 'Core Industrial Capabilities Overview',
    description: 'Comprehensive engineering disciplines and mechanical solutions provided by NTP Bandung facility.',
    items: [
      { title: 'Coating', image: '/static/img/services/coating01.jpg' },
      { title: 'Gas Turbine', image: '/static/img/services/industrial01.jpg' },
      { title: 'Steam Turbine', image: '/static/img/services/industrial02.jpg' },
      { title: 'Centrifugal Compressor', image: '/static/img/services/industrial01.jpg' },
      { title: 'Field Services', image: '/static/img/services/aero01.jpg' },
      { title: 'Turbo Charger', image: '/static/img/services/industrial02.jpg' },
      { title: 'Centrifugal Pump', image: '/static/img/services/pump01.jpg' },
      { title: 'Repair / Fabricate Parts', image: '/static/img/services/facilities.jpg' }
    ]
  }
];
</script>
