<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'CONTACT US'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'CONTACT US' }}</template>
    </HeaderSectionTest>

    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-screen-xl mx-auto px-6">
        <SectionIntroHeader
          v-for="(intro, idx) in activeIntroSections"
          :key="intro.id || idx"
          :badge="intro.badge || 'Official Channels'"
          :title="intro.title || 'Contact Us Today'"
          :description="intro.description || 'We are ready to provide technical consultation, quote estimations, and scheduling for your engine assets.'"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span class="text-xs uppercase tracking-wider font-bold text-amber-600 block mb-1">Office / Workshop</span>
              <p class="text-xs text-slate-700 leading-relaxed">{{ content?.address || 'Jl. Pajajaran 154 (KP. IV) Bandung 40174 Indonesia' }}</p>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span class="text-xs uppercase tracking-wider font-bold text-amber-600 block mb-1">Direct Phone</span>
              <p class="text-xs font-semibold text-blue-950">{{ content?.phone || '+62 22 6015696 / +62 22 6014030' }}</p>
              <span class="text-[11px] text-slate-500 block mt-1">{{ content?.hours || 'Mon - Fri: 08:00 - 17:00 WIB' }}</span>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-xs uppercase tracking-wider font-bold text-amber-600 block mb-1">Email Inquiries</span>
              <a :href="'mailto:' + (content?.email || 'marketing@ntp.id')" class="text-xs font-bold text-blue-950 hover:underline">
                {{ content?.email || 'marketing@ntp.id' }}
              </a>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <span class="text-xs uppercase tracking-wider font-bold text-amber-600 block mb-1">Website & Social</span>
              <p class="text-xs font-semibold text-blue-950">www.ntp.id &bull; @ntpindonesia</p>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <AppImage
            :src="content?.mapImage || '/static/img/contact/maps-ntp.png'"
            alt="NTP Facility Location Map"
            img-class="w-full h-96 object-cover object-center grayscale hover:grayscale-0 transition duration-500"
            label="NTP Location Map"
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
  title: 'Corporate Contact'
});

const { data: content } = await useSiteContent('contactInfo');

const activeIntroSections = computed(() => {
  if (Array.isArray(content.value?.introSections) && content.value.introSections.length > 0) {
    return content.value.introSections.filter((i: any) => i.isActive !== false);
  }
  return [
    {
      badge: content.value?.badge || 'Official Channels',
      title: content.value?.title || 'Contact Us Today',
      description: content.value?.description || content.value?.subtitle || 'We are ready to provide technical consultation, quote estimations, and scheduling for your engine assets.'
    }
  ];
});
</script>
