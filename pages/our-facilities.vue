<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'OUR FACILITIES'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'OUR FACILITIES' }}</template>
    </HeaderSectionTest>

    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-screen-xl mx-auto px-6">
        <SectionIntroHeader
          v-for="(intro, idx) in activeIntroSections"
          :key="intro.id || idx"
          :badge="intro.badge || 'Workshop & Workflow'"
          :title="intro.title || 'Workshop Facilities & Capability Workflow'"
          :description="intro.description || 'NTP operations are supported by comprehensive workshop machinery, test cells, and certified precision processes from initial intake to certified delivery.'"
        />

        <!-- 12 Workflow Steps (PDF Slide 7) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(step, sIdx) in (content?.steps || defaultSteps)"
            :key="sIdx"
            class="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div class="h-44 w-full bg-slate-200 overflow-hidden relative">
                <AppImage
                  :src="step.image"
                  :alt="step.name"
                  img-class="w-full h-full object-cover hover:scale-105 transition duration-300"
                  :label="step.name"
                />
                <span class="absolute top-3 left-3 bg-amber-400 text-blue-950 font-black text-xs px-2.5 py-1 rounded shadow">
                  STEP {{ step.step || sIdx + 1 }}
                </span>
              </div>
              <div class="p-5">
                <h3 class="font-bold text-base text-blue-950 uppercase tracking-wide mb-1">
                  {{ step.name }}
                </h3>
                <p class="text-xs text-slate-600 leading-relaxed">
                  {{ step.desc || 'Standard certified maintenance procedure executed under strict OEM and aviation authority requirements.' }}
                </p>
              </div>
            </div>
            <div class="px-5 pb-4 pt-1">
              <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                NTP Bandung Facility
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
  title: 'Our Facilities & Workshops'
});

const { data: content } = await useSiteContent('facilities');

const activeIntroSections = computed(() => {
  if (Array.isArray(content.value?.introSections) && content.value.introSections.length > 0) {
    return content.value.introSections.filter((i: any) => i.isActive !== false);
  }
  return [
    {
      badge: content.value?.badge || 'Workshop & Workflow',
      title: content.value?.title || 'Workshop Facilities & Capability Workflow',
      description: content.value?.description || 'NTP operations are supported by comprehensive workshop machinery, test cells, and certified precision processes from initial intake to certified delivery.'
    }
  ];
});

const defaultSteps = [
  { step: 1, name: 'Shipping & Receiving Inspection', image: '/static/img/services/facilities.jpg' },
  { step: 2, name: 'Disassemble', image: '/static/img/services/industrial01.jpg' },
  { step: 3, name: 'Cleaning', image: '/static/img/services/pump01.jpg' },
  { step: 4, name: 'Balancing', image: '/static/img/services/industrial02.jpg' },
  { step: 5, name: 'Non-Destructive Test', image: '/static/img/services/aero01.jpg' },
  { step: 6, name: 'Inspection', image: '/static/img/services/aero02.jpg' },
  { step: 7, name: 'Repair Parts', image: '/static/img/services/coating01.jpg' },
  { step: 8, name: 'Special Process', image: '/static/img/services/industrial01.jpg' },
  { step: 9, name: 'Accessories Maintenance', image: '/static/img/services/facilities.jpg' },
  { step: 10, name: 'Engine Test', image: '/static/img/services/aero01.jpg' },
  { step: 11, name: 'Assemble', image: '/static/img/services/aero02.jpg' },
  { step: 12, name: 'Procurement Process', image: '/static/img/services/facilities.jpg' }
];
</script>
