<template>
  <div>
    <section class="md:mt-10">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-left lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 min-h-[20rem] rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <div
            class="bg-slate-200 hidden md:block bg-cover bg-center bg-no-repeat bg-[url('/static/img/turbine.jpg')]"
          ></div>
          <div
            class="md:col-span-2 bg-cover bg-center bg-no-repeat bg-[url('/static/img/turbine.jpg')] bg-blue-950 bg-blend-multiply text-white p-10 md:p-16 md:bg-none md:bg-blue-950"
          >
            <h2 class="tracking-[.6rem] uppercase mb-2 text-xs font-bold text-amber-400">
              Contact
            </h2>
            <p class="font-extralight text-2xl md:text-4xl text-white">
              {{ content?.headline || 'not sure what you need?' }}
            </p>
            <p class="font-extralight text-sm md:text-base text-slate-300 mb-8">
              {{ content?.subheadline || "don't worry, we'll help you ..." }}
            </p>
            <a
              :href="'mailto:' + (content?.email || 'marketing@ntp.id')"
              class="inline-block p-3 md:py-4 md:px-8 tracking-[.2rem] text-xs uppercase font-semibold bg-amber-400 text-blue-950 hover:bg-amber-300 rounded shadow transition"
            >
              Contact Us
            </a>

            <!-- Official Email, Web & Social Links (PDF Slide 8) -->
            <div class="mt-8 pt-6 border-t border-blue-900/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span class="text-slate-400 block uppercase tracking-wider text-[10px]">Email</span>
                <a :href="'mailto:' + (content?.email || 'marketing@ntp.id')" class="font-bold text-amber-400 hover:underline">
                  {{ content?.email || 'marketing@ntp.id' }}
                </a>
              </div>
              <div>
                <span class="text-slate-400 block uppercase tracking-wider text-[10px]">Web</span>
                <a :href="'https://' + (content?.web || 'www.ntp.id')" target="_blank" class="font-bold text-white hover:underline">
                  {{ content?.web || 'www.ntp.id' }}
                </a>
              </div>
              <div>
                <span class="text-slate-400 block uppercase tracking-wider text-[10px]">Instagram</span>
                <a :href="'https://instagram.com/' + ((content?.instagram || '@ntpindonesia').replace('@', ''))" target="_blank" class="font-bold text-white hover:underline">
                  {{ content?.instagram || '@ntpindonesia' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: content } = await useSiteContent('contact');
</script>
