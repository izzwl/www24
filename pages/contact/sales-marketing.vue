<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'SALES & MARKETING'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'SALES & MARKETING' }}</template>
    </HeaderSectionTest>

    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-screen-xl mx-auto px-6">
        <SectionIntroHeader
          v-for="(intro, idx) in activeIntroSections"
          :key="intro.id || idx"
          :badge="intro.badge || 'Commercial Inquiries'"
          :title="intro.title || 'SALES & MARKETING DIVISION'"
          :description="intro.description || 'Dedicated technical sales specialists for aero propulsion and industrial power sectors.'"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div
            v-for="(team, tIdx) in (content?.teams || defaultTeams)"
            :key="tIdx"
            class="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">Sector Team</span>
              <h3 class="text-2xl font-bold text-blue-950 mb-3">{{ team.sector }}</h3>
              <p class="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">{{ team.description }}</p>
            </div>
            <div class="space-y-2 pt-4 border-t border-slate-200 text-xs">
              <div class="flex items-center space-x-2">
                <span class="text-slate-400 font-semibold w-16">Email:</span>
                <a :href="'mailto:' + team.email" class="font-bold text-blue-950 hover:underline">{{ team.email }}</a>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-slate-400 font-semibold w-16">Phone:</span>
                <span class="font-medium text-slate-700">{{ team.phone }}</span>
              </div>
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
  title: 'Sales & Marketing Contact'
});

const { data: content } = await useSiteContent('salesMarketing');

const activeIntroSections = computed(() => {
  if (Array.isArray(content.value?.introSections) && content.value.introSections.length > 0) {
    return content.value.introSections.filter((i: any) => i.isActive !== false);
  }
  return [
    {
      badge: content.value?.badge || 'Commercial Inquiries',
      title: content.value?.title || 'SALES & MARKETING DIVISION',
      description: content.value?.description || content.value?.subtitle || 'Dedicated technical sales specialists for aero propulsion and industrial power sectors.'
    }
  ];
});

const defaultTeams = [
  {
    sector: 'Aero Engine Sales',
    email: 'aero.marketing@ntp.id',
    phone: '+62 22 6015696 ext 211',
    description: 'Inquiries for TPE331, CT7, PT6, JT8D, Dart, Tay, and military aero MRO agreements.'
  },
  {
    sector: 'Industrial Turbine Sales',
    email: 'industrial.marketing@ntp.id',
    phone: '+62 22 6015696 ext 215',
    description: 'Inquiries for Solar Turbines, GE LM/TM, steam turbines, pumps, and on-site field services.'
  }
];
</script>
