<template>
  <div class="bg-white">
    <Navbar24 />

    <!-- Hero Carousel -->
    <div id="default-carousel" class="relative w-full">
      <div class="relative overflow-hidden h-[calc(100vh-4rem)] bg-blue-950">
        <div
          v-for="(slide, sIdx) in activeSlides"
          :key="sIdx"
          :id="`carousel-item-${sIdx + 1}`"
          :class="['duration-1000 ease-in-out', sIdx === 0 ? '' : 'hidden']"
        >
          <div
            class="h-svh bg-cover bg-center bg-no-repeat absolute bg-blue-950/80 bg-blend-multiply block w-full"
            :style="{ backgroundImage: `url(${slide.image || '/static/img/carousel/Screenshot_20240614_123738.png'})` }"
          ></div>
          <div class="absolute top-1/2 left-1/2 p-6 pt-2 block w-full text-white -translate-x-1/2 -translate-y-2/3">
            <div class="block mx-10 max-w-4xl md:ml-36 sm:mx-12">
              <h1 v-if="sIdx === 0" class="mb-3 uppercase font-extrabold tracking-wider text-3xl md:text-5xl lg:text-6xl text-white">
                {{ slide.title1 }}
              </h1>
              <h2 v-else class="mb-3 uppercase font-extrabold tracking-wider text-3xl md:text-5xl lg:text-6xl text-white">
                {{ slide.title1 }}
              </h2>
              <h2 class="mb-4 uppercase font-extrabold tracking-wider text-2xl md:text-4xl lg:text-5xl text-amber-400">
                {{ slide.title2 }}
              </h2>
              <p class="text-slate-200 text-sm md:text-xl max-w-2xl mb-8 leading-relaxed">
                {{ slide.subtitle }}
              </p>
              <NuxtLink
                :to="slide.link || '/our-services/mro-aero-engine'"
                class="inline-block bg-amber-400 text-blue-950 px-8 py-3.5 rounded font-bold uppercase tracking-wider text-xs md:text-sm shadow hover:bg-amber-300 transition"
              >
                {{ slide.buttonText || 'Explore Services' }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Slider Indicators -->
      <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button
          v-for="(slide, sIdx) in activeSlides"
          :key="sIdx"
          type="button"
          :id="`carousel-indicator-${sIdx + 1}`"
          class="w-3 h-3 rounded-full bg-white/50 hover:bg-white"
          :aria-current="sIdx === 0 ? 'true' : 'false'"
          :aria-label="`Slide ${sIdx + 1}`"
        ></button>
      </div>

      <!-- Slider Controls -->
      <button
        v-if="activeSlides.length > 1"
        type="button"
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        id="data-carousel-prev"
      >
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/40 text-white">
          <svg class="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 6 10">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
          </svg>
        </span>
      </button>
      <button
        v-if="activeSlides.length > 1"
        type="button"
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        id="data-carousel-next"
      >
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/40 text-white">
          <svg class="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 6 10">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
        </span>
      </button>
    </div>

    <!-- About Overview Section -->
    <section class="bg-white py-16 lg:py-24">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-xs uppercase font-bold tracking-widest text-amber-500">About Us</span>
            <h2 class="text-2xl md:text-4xl font-extrabold text-blue-950 mt-2 mb-6 leading-tight">
              {{ content?.aboutBrief?.title || 'We are a trusted partner with fully proficient experts in the industry' }}
            </h2>
            <NuxtLink
              :to="content?.aboutBrief?.link || '/corporate/about-us'"
              class="inline-block px-8 py-3.5 tracking-wider text-xs uppercase font-bold text-blue-950 border-2 border-blue-950 hover:bg-blue-950 hover:text-white rounded transition"
            >
              Know us more &rarr;
            </NuxtLink>
          </div>
          <div class="text-slate-700 leading-relaxed text-sm md:text-base space-y-4">
            <p>
              {{ content?.aboutBrief?.subtitle || 'PT Nusantara Turbin dan Propulsi (NTP) is a trusted excellence center leading in South East Asia in the field of engineering, maintenance, repair and overhaul of gas turbines and rotating equipment. Since the early establishment by the name of Universal Maintenance Center (UMC) a division of PT IPTN, NTP has been projected as a business of engineering, maintenance, repair and overhaul in the field of turbines and rotating equipment.' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <ContactSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Carousel } from 'flowbite';
import type { CarouselItem, CarouselOptions } from 'flowbite';

definePageMeta({
  layout: 'tw'
});

useHead({
  title: 'PT Nusantara Turbin dan Propulsi - Aero Engine & Industrial Turbines MRO'
});

const { data: content } = await useSiteContent('home');

const fallbackSlides = [
  {
    active: true,
    title1: 'YOUR TRUSTED PARTNER',
    title2: 'TO CREATE SHARED VALUE',
    subtitle: "Southeast Asia's leading excellence center in aero propulsion and industrial turbine engineering.",
    image: '/static/img/carousel/Screenshot_20240614_123738.png',
    buttonText: 'Explore Our Services',
    link: '/our-services/mro-aero-engine'
  },
  {
    active: true,
    title1: 'AERO ENGINE SERVICES',
    title2: 'OVER 30 YEARS OF MRO MASTERY',
    subtitle: 'Certified by FAA, DCCA, and IDAA for turboprop, turboshaft, and turbofan overhauls.',
    image: '/static/img/carousel/Screenshot_20240614_123813.png',
    buttonText: 'Aero Capabilities',
    link: '/our-services/mro-aero-engine'
  },
  {
    active: true,
    title1: 'INDUSTRIAL TURBINE SERVICES',
    title2: 'PRECISION ENERGY SOLUTIONS',
    subtitle: 'Solar Turbines AMC Level 4 and GE LM/TM industrial mechanical solutions.',
    image: '/static/img/carousel/Screenshot_20240614_123754.png',
    buttonText: 'Industrial Services',
    link: '/our-services/mro-industrial'
  }
];

const activeSlides = computed(() => {
  const slides = content.value?.slides || fallbackSlides;
  const filtered = slides.filter((s: any) => s.active !== false);
  return filtered.length > 0 ? filtered.slice(0, 5) : fallbackSlides;
});

onMounted(() => {
  if (activeSlides.value.length <= 1) return;

  const carouselElement = document.getElementById('default-carousel');
  const items: CarouselItem[] = activeSlides.value.map((_, sIdx) => ({
    position: sIdx,
    el: document.getElementById(`carousel-item-${sIdx + 1}`) as HTMLElement
  })).filter(it => it.el);

  const indicatorItems = activeSlides.value.map((_, sIdx) => ({
    position: sIdx,
    el: document.getElementById(`carousel-indicator-${sIdx + 1}`) as HTMLElement
  })).filter(ind => ind.el);

  const options: CarouselOptions = {
    defaultPosition: 0,
    interval: 5000,
    indicators: {
      activeClasses: 'bg-white',
      inactiveClasses: 'bg-white/50 hover:bg-white',
      items: indicatorItems
    }
  };

  if (carouselElement && items.length > 0) {
    const carousel = new Carousel(carouselElement, items, options);
    carousel.cycle();

    const prevBtn = document.getElementById('data-carousel-prev');
    const nextBtn = document.getElementById('data-carousel-next');

    if (prevBtn) prevBtn.addEventListener('click', () => carousel.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => carousel.next());
  }
});
</script>
