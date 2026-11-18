<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSection>
      <template #h2>aero engine services</template>
      <template #h1>
        <span class="bg-blue-950 text-white pl-3 pr-2">experience</span> and expertise<br />
        at effective <span class="bg-amber-400 text-blue-950 pl-2 pr-2 font-bold">cost</span>
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
  title: 'MRO Aero Engine Services'
});

const { data: content } = await useSiteContent('aeroEngine');

const activeSections = computed(() => {
  if (Array.isArray(content.value?.sections) && content.value.sections.length > 0) {
    return content.value.sections.filter((s: any) => s.isActive !== false);
  }
  return defaultAeroSections;
});

const defaultAeroSections = [
  {
    id: 'aero-intro',
    type: 'split-editorial',
    isActive: true,
    badge: 'Aviation Propulsion Mastery',
    title: 'Maintenance, Repair and Overhaul of Aero Engine',
    description: 'Maintaining Aero Engines Performances to its prime condition is not an easy feat. It requires a substantial level of experience and expertise to find the best conditions. With an experience of over 30 years in the MRO business backed up by certified experts, NTP can deliver your needs for high-quality care by prioritizing the best safety and performance on:',
    image: '/static/img/services/aero01.jpg',
    displayType: 'list',
    rightbg: true,
    items: [
      'Turbo Prop, Turbo Shaft, Turbo Jet / Fan',
      'Component Repair',
      'Accessories',
      'Line maintenance'
    ]
  },
  {
    id: 'aero-amc',
    type: 'amc-showcase',
    isActive: true,
    badge: 'OEM Authorizations',
    title: 'Authorized Maintenance Center (AMC)',
    description: 'Certified aero engine maintenance, repair, and overhaul capabilities authorized directly by global engine manufacturers.',
    items: [
      {
        isActive: true,
        badge: 'Authorized Maintenance Center (AMC)',
        title: 'by Honeywell since 1986',
        engine: 'Honeywell - TPE 331',
        series: 'Series: TPE331 -2, -5, -10',
        aircraft: 'Aircraft: Casa 212 Series, Dornier 228',
        image: '/static/img/engine/tpe331.png'
      },
      {
        isActive: true,
        badge: 'Authorized Maintenance Center (AMC)',
        title: 'by GE since 1988',
        engine: 'General Electric - CT7',
        series: 'Series: CT7 -5, -7, -9',
        aircraft: 'Aircraft: CN 235 Series, Saab 340',
        image: '/static/img/engine/ge-ct7.png'
      }
    ]
  },
  {
    id: 'aero-grouped-engines',
    type: 'grouped-grid',
    isActive: true,
    badge: 'Fleet Capabilities',
    title: 'Engine Capabilities & Specifications',
    description: 'Comprehensive certified aero engine maintenance, repair, and overhaul capabilities.',
    groups: [
      {
        id: 'grp-fan-jet',
        badge: 'Turbo Fan / Jet',
        itemLabel: 'Aircraft',
        colSpan: 4,
        items: [
          {
            name: 'Pratt & Whitney JT8D',
            aircraft: 'Boeing 737-200',
            series: 'Series: JT8D -9, -9A, -15, -15A, -17, -17A',
            image: '/static/img/engine/jt8d2.png',
            isActive: true
          },
          {
            name: 'Rolls Royce TAY 650',
            aircraft: 'Fokker 100',
            series: 'Series: Tay 650-15',
            image: '/static/img/engine/tay6.png',
            isActive: true
          }
        ]
      },
      {
        id: 'grp-prop-shaft',
        badge: 'Turbo Prop / Shaft',
        itemLabel: 'Aircraft',
        colSpan: 8,
        items: [
          {
            name: 'Pratt & Whitney PT6A',
            aircraft: 'Twin otter, Cessna Grand Caravan, Super Tucano, KT-1B',
            series: 'Series: PT6A -21, -25, -27, -28, -34, -114, -140',
            image: '/static/img/engine/pt6a.png',
            isActive: true
          },
          {
            name: 'Pratt & Whitney PT6T',
            aircraft: 'Bell 412, Bell 212',
            series: 'Series: PT6T -3, -3B, -3D, -3E, -3DF',
            image: '/static/img/engine/pt6t.png',
            isActive: true
          },
          {
            name: 'Pratt & Whitney PW100 Series',
            aircraft: 'ATR 42, ATR 72, Casa 295',
            series: 'Series: PW124B, PW127E, -F, -J, -M',
            image: '/static/img/engine/pw100.png',
            isActive: true
          },
          {
            name: 'Rolls Royce Dart7',
            aircraft: 'Fokker 27',
            series: 'Series: Dart 7-525 to -536',
            image: '/static/img/engine/dart7.png',
            isActive: true
          },
          {
            name: 'Rolls Royce M250',
            aircraft: 'Eurocopter Twinstar BO 105, Grob',
            series: 'Series: Model 250 C20, C20B',
            image: '/static/img/engine/m250.png',
            isActive: true
          },
          {
            name: 'Rolls Royce Allison T56',
            aircraft: 'Hercules C130',
            series: 'Series: T56-A-15/LFE',
            image: '/static/img/engine/tpe331.png',
            isActive: true
          }
        ]
      }
    ]
  },
  {
    id: 'aero-support',
    type: 'split-editorial',
    isActive: true,
    badge: 'Propulsion Life-Cycle',
    title: 'Production Engine Assembly & Support Facilities',
    description: 'To face ever-changing global competition, NTP provides dedicated services to support complete aircraft propulsion life-cycle requirements:',
    image: '/static/img/services/aero02.jpg',
    displayType: 'card',
    rightbg: false,
    items: [
      'Workshop Repair & Balancing',
      'On-Wing Maintenance',
      'OEM Sparepart Sales',
      'Engine Test Cell Validation'
    ]
  }
];
</script>
