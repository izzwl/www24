<template>
  <div class="bg-white">
    <Navbar24 />

    <HeaderSectionTest
      :title="content?.headerTitle || 'BOD AND BOC'"
      :bg-image="content?.headerBg"
    >
      <template #h1>{{ content?.headerTitle || 'BOD AND BOC' }}</template>
    </HeaderSectionTest>

    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-screen-xl mx-auto px-6">
        <!-- Fallback Intro Header if sections has no intro type -->
        <SectionIntroHeader
          v-if="!hasIntroSection"
          :badge="content?.badge || 'Corporate Leadership'"
          :title="content?.title || 'BOARD OF DIRECTORS AND COMMISSIONERS'"
          :description="content?.description || 'The BOD establishes the Company’s business strategies as well as the annual work plan and budget including risk management, and with the agreement of the BOC, carries out these plans.'"
        />

        <!-- Dynamic Re-arrangeable Sections (Intro Sections & Officials Sections) -->
        <div class="space-y-16">
          <template v-for="(sec, sIdx) in activeSections" :key="sec.id || sIdx">
            <!-- 1. Intro Section (Can be rearranged anywhere) -->
            <div v-if="sec.type === 'intro'" class="pt-2">
              <SectionIntroHeader
                :badge="sec.badge || content?.badge || 'Corporate Leadership'"
                :title="sec.title || content?.title || 'BOARD OF DIRECTORS AND COMMISSIONERS'"
                :description="sec.description || content?.description"
              />
            </div>

            <!-- 2. Officials / Pejabat Section -->
            <div
              v-else-if="sec.type === 'officials' || sec.members"
              :class="{ 'pt-12 border-t border-slate-200': sIdx > 0 && activeSections[sIdx - 1]?.type !== 'intro' }"
            >
              <!-- Optional Subheading if multiple official groups exist or custom sub-title -->
              <div
                v-if="sec.title && (activeOfficialsCount > 1 || (sec.title !== content?.title && sec.title !== 'BOARD OF DIRECTORS AND COMMISSIONERS'))"
                class="mb-8"
              >
                <span
                  v-if="sec.badge"
                  class="text-xs uppercase font-bold tracking-widest text-amber-500 block mb-1"
                >
                  {{ sec.badge }}
                </span>
                <h3 class="text-2xl md:text-3xl font-extrabold text-blue-950">
                  {{ sec.title }}
                </h3>
                <p v-if="sec.description" class="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed">
                  {{ sec.description }}
                </p>
              </div>

              <!-- Members Grid -->
              <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
                <div
                  v-for="(member, mIdx) in (sec.members || [])"
                  :key="mIdx"
                  class="group flex flex-col h-full bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition"
                >
                  <div class="h-80 w-full overflow-hidden bg-slate-200">
                    <AppImage
                      :src="member.image"
                      :alt="member.name"
                      img-class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                      :label="member.name"
                    />
                  </div>
                  <div class="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 class="text-xl font-bold text-blue-950">{{ member.name }}</h3>
                      <span class="text-xs font-semibold uppercase tracking-wider text-amber-600 block mt-1">
                        {{ member.role }}
                      </span>
                      <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                        {{ member.bio }}
                      </p>
                    </div>
                    <div class="mt-6 pt-3 border-t border-slate-200 text-[11px] text-slate-400 font-medium">
                      PT Nusantara Turbin dan Propulsi
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
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
  title: 'Board of Commissioners & Directors'
});

const { data: content } = await useSiteContent('bodBoc');

const activeSections = computed(() => {
  if (Array.isArray(content.value?.sections) && content.value.sections.length > 0) {
    return content.value.sections.filter((s: any) => s.isActive !== false);
  }
  // Fallback to legacy members array if sections not defined
  if (Array.isArray(content.value?.members) && content.value.members.length > 0) {
    return [
      {
        id: 'sec-bod-legacy',
        type: 'officials',
        isActive: true,
        badge: content.value.badge || 'Corporate Leadership',
        title: content.value.title || 'BOARD OF DIRECTORS AND COMMISSIONERS',
        description: content.value.description || '',
        members: content.value.members
      }
    ];
  }
  return defaultSections;
});

const hasIntroSection = computed(() => {
  return activeSections.value.some((s: any) => s.type === 'intro');
});

const activeOfficialsCount = computed(() => {
  return activeSections.value.filter((s: any) => s.type === 'officials' || s.members).length;
});

const defaultSections = [
  {
    id: 'sec-intro-default',
    type: 'intro',
    isActive: true,
    badge: 'Corporate Leadership',
    title: 'BOARD OF DIRECTORS AND COMMISSIONERS',
    description: 'The BOD establishes the Company’s business strategies as well as the annual work plan and budget including risk management, and with the agreement of the BOC, carries out these plans.'
  },
  {
    id: 'sec-bod-default',
    type: 'officials',
    isActive: true,
    badge: 'Dewan Direksi',
    title: 'Board of Directors',
    description: '',
    members: [
      {
        name: 'Ir. Suryanto',
        role: 'President Director / CEO',
        image: '/static/img/bod/dirut.jpeg',
        bio: 'Directing strategic transformation, institutional partnerships, and global MRO service delivery.'
      },
      {
        name: 'Palmana Banandhi',
        role: 'Operations & Business Director',
        image: '/static/img/bod/don.jpeg',
        bio: 'Supervising workshop floor operations, engine test cell certifications, and technical quality standards.'
      },
      {
        name: 'Budi Kadharjono',
        role: 'Finance & Administration Director',
        image: '/static/img/bod/dirkeu.jpeg',
        bio: 'Leading financial governance, supply chain resilience, and corporate investment programs.'
      }
    ]
  }
];
</script>
