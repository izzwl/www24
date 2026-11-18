<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'OUR CUSTOMERS'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'OUR CUSTOMERS' }}</template>
    </HeaderSectionTest>

    <!-- 1. Intro Section Header -->
    <section class="pt-16 pb-12 sm:pt-20 sm:pb-16 bg-white">
      <div class="max-w-screen-xl mx-auto px-6">
        <SectionIntroHeader
          v-for="(intro, idx) in activeIntroSections"
          :key="intro.id || idx"
          :badge="intro.badge || 'Global Reach'"
          :title="intro.title || 'NTP Aero Customer Expansion'"
          :description="intro.description || 'Our customers are large international and domestic aviation or military aviation entities demanding total compliance with authority codes and optimal operational execution.'"
        />
      </div>
    </section>

    <!-- 2. World Expansion Stats & Visual Map (Exact Blue Background matching Core Identity) -->
    <section
      class="py-20 px-6 sm:px-12 relative bg-cover bg-fixed bg-center bg-no-repeat text-white bg-blue-950"
      :style="{ backgroundImage: `url(${content?.mapSectionBg || '/static/img/bg-alt-eng.jpg'})` }"
    >
      <div class="absolute inset-0 bg-blue-950/85"></div>
      <div class="relative max-w-screen-xl mx-auto">
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 items-center mb-10">
          <!-- Left Side: Market Presence & International MRO Partner Network -->
          <div>
            <span class="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-1">
              {{ content?.marketPresenceBadge || 'Market Presence' }}
            </span>
            <h2 class="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-1 leading-tight">
              {{ content?.marketPresenceTitle || 'International MRO Partner Network' }}
            </h2>
            <p v-if="content?.marketPresenceDescription" class="mt-3 text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
              {{ content.marketPresenceDescription }}
            </p>
          </div>

          <!-- Right Side: 2 Metric Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-6 bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center hover:border-amber-400 hover:bg-white/15 transition">
              <span class="text-3xl md:text-4xl font-extrabold text-white mb-1">
                {{ content?.stats?.countries || '30++' }}
              </span>
              <span class="text-xs uppercase tracking-wider font-bold text-amber-400">
                {{ content?.stats?.countriesLabel || 'Customer Countries' }}
              </span>
            </div>

            <div class="p-6 bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center hover:border-amber-400 hover:bg-white/15 transition">
              <span class="text-3xl md:text-4xl font-extrabold text-white mb-1">
                {{ content?.stats?.exportShare || '59%' }}
              </span>
              <span class="text-xs uppercase tracking-wider font-bold text-amber-400">
                {{ content?.stats?.exportShareLabel || 'Export Customer Share' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Below: Full-width Image for Map (Aspect Ratio 2:1 - Lebar 2, Tinggi 1 - Fill) -->
        <div class="w-full rounded-2xl overflow-hidden border border-white/15 bg-slate-900/40 backdrop-blur-xs shadow-2xl relative group">
          <div class="w-full aspect-[2/1] relative overflow-hidden">
            <AppImage
              :src="content?.mapImage || '/static/img/holder.jpg'"
              alt="International MRO Partner Network Map"
              wrapper-class="w-full h-full"
              :img-class="[
                'w-full h-full transition duration-500',
                content?.mapImageFit === 'contain' ? 'object-contain' : 'object-cover'
              ]"
              placeholder-class="w-full h-full aspect-[2/1] bg-slate-800/90 text-slate-200"
              label="World Expansion Map (2:1 Ratio)"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Customer Image Grid Sections (Reusable) -->
    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-screen-xl mx-auto px-6 space-y-16">
        <ImageGridSection
          v-for="(sec, sIdx) in activeCustomerSections"
          :key="sec.id || sIdx"
          :section="sec"
        />
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
  title: 'Our Customers'
});

const { data: content } = await useSiteContent('customers');

const activeIntroSections = computed(() => {
  if (Array.isArray(content.value?.introSections) && content.value.introSections.length > 0) {
    return content.value.introSections.filter((i: any) => i.isActive !== false);
  }
  return [
    {
      badge: content.value?.badge || 'Global Reach',
      title: content.value?.title || 'NTP Aero Customer Expansion',
      description: content.value?.description || 'Our customers are large international and domestic aviation or military aviation entities demanding total compliance with authority codes and optimal operational execution.'
    }
  ];
});

const activeCustomerSections = computed(() => {
  if (Array.isArray(content.value?.sections) && content.value.sections.length > 0) {
    return content.value.sections.filter((s: any) => s.isActive !== false);
  }
  return defaultCustomerSections;
});

const defaultExisting = [
  { name: 'TNI AU', country: 'Indonesia', logo: '/static/img/certification/tniau.jpg' },
  { name: 'TNI AD', country: 'Indonesia', logo: '/static/img/customer/military-tniad.png' },
  { name: 'TNI AL', country: 'Indonesia', logo: '/static/img/customer/military-tnial.png' },
  { name: 'Polri', country: 'Indonesia', logo: '/static/img/customer/polri.png' },
  { name: 'TUDM', country: 'Malaysia', logo: '/static/img/customer/tudm.png' },
  { name: 'RTAF', country: 'Thailand', logo: '/static/img/customer/rtaf.png' },
  { name: 'Royal Thai Navy', country: 'Thailand', logo: '/static/img/customer/rtn.png' },
  { name: 'ROKAF', country: 'South Korea', logo: '/static/img/customer/rokaf.png' },
  { name: 'Regional Express', country: 'Australia', logo: '/static/img/customer/rex.png' },
  { name: 'Korean Coast Guard', country: 'South Korea', logo: '/static/img/customer/kcg.png' }
];

const defaultNew = [
  { name: 'Royal Oman Police', country: 'Oman', logo: '/static/img/customer/oman-police.png' },
  { name: 'Indian Airforce', country: 'India', logo: '/static/img/customer/iaf.png' },
  { name: 'Vietnam Airforce', country: 'Vietnam', logo: '/static/img/customer/vnaf.png' },
  { name: 'Seagle Aerospace', country: 'International', logo: '/static/img/customer/seagle.png' },
  { name: 'Ammroc', country: 'UAE', logo: '/static/img/customer/ammroc.png' },
  { name: 'ASG Nederland', country: 'Netherlands', logo: '/static/img/customer/asg.png' }
];

const industrialCustomers = [
  { name: 'ConocoPhillips', logo: '/static/img/customer/conoco.png' },
  { name: 'GE Transportation', logo: '/static/img/customer/ge.png' },
  { name: 'Gulf', logo: '/static/img/customer/gulf.png' },
  { name: 'Indonesia Power', logo: '/static/img/customer/indonesia-power.png' },
  { name: 'Chevron', logo: '/static/img/customer/chevron.png' },
  { name: 'PTPN', logo: '/static/img/customer/ptpn.png' },
  { name: 'Pupuk Indonesia', logo: '/static/img/customer/pupuk-indonesia.png' },
  { name: 'Solar Turbines', logo: '/static/img/customer/solar-turbines.png' },
  { name: 'GMF AeroAsia', logo: '/static/img/customer/gmf.png' },
  { name: 'ATS', logo: '/static/img/customer/ats.png' }
];

const defaultCustomerSections = [
  {
    id: 'cust-sec-existing',
    isActive: true,
    title: 'PT NTP Existing Aero Engine Services Customers',
    badge: 'Defense & Commercial Fleet',
    description: 'Trusted long-term partnerships in defense forces and commercial fleets',
    items: defaultExisting
  },
  {
    id: 'cust-sec-new',
    isActive: true,
    title: 'PT NTP New Aero Turbine Services Customers',
    badge: 'Expanding Footprint',
    description: 'Expanding international footprint in global defense and aerospace',
    items: defaultNew
  },
  {
    id: 'cust-sec-industrial',
    isActive: true,
    title: 'Industrial & Power Generation Customers',
    badge: 'Energy & Power Utilities',
    description: 'Trusted by leading industrial operators and energy utilities',
    items: industrialCustomers
  }
];
</script>
