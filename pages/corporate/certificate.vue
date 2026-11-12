<template>
    <div class="">
        <div class="">
            <Navbar24/>

            <HeaderSectionTest bg="bg-[url('/static/img/ntp-bg-old.jpg')]">
              <template #h1>CERTIFICATIONS</template>
            </HeaderSectionTest>

            <section class="py-16 sm:py-24 bg-white">
              <div class="px-12 mb-12">
                <div class="grid gap-4 grids-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto">
                  <div>
                    <h1 class="mb-10 text-left text-3xl font-bold text-blue-950 md:text-4xl ">CERTIFICATION</h1>
                  </div>
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>

              <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-4 grid-cols-2 md:grid-cols-5">
                <img class="m-auto" src="/static/img/certification/easa.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/faa.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/dnv.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/anac.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/ge.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/honeywell.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/imaa.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/kan.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/kemenhub.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/mh.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/solar.jpg" alt="">
                <img class="m-auto" src="/static/img/certification/tniau.jpg" alt="">
              </div>
            </section>

            <FooterSection/>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout:'tw'
});
</script>