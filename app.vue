<template>
  <div>
    <WwwMeta/>
    <NuxtLayout>
        <!-- <NuxtWelcome /> -->
        
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

useHead({
  titleTemplate: (titleChunk) => {
    if (!titleChunk) {
      return 'PT Nusantara Turbin dan Propulsi - Aero Engine & Industrial Turbines MRO';
    }
    return titleChunk.includes('PT NTP') || titleChunk.includes('PT Nusantara Turbin dan Propulsi')
      ? titleChunk
      : `${titleChunk} | PT NTP`;
  },
  link: [
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/static/favicon/favicon-32x32.png?v=2' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/static/favicon/favicon-16x16.png?v=2' },
    { rel: 'shortcut icon', href: '/favicon.ico?v=2' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/static/favicon/apple-touch-icon.png?v=2' }
  ]
})

const website = useWebsiteStore()
onMounted(() => {
    initFlowbite();
})
</script>

<style>
/* @import url("~/assets/css/globals.css");
@import url("~/assets/css/normalize.css");
@import url("~/assets/css/pure.css");
@import url("~/assets/css/responsive-grid-min.css");
@import url("~/assets/css/font.css");
@import url("~/assets/css/ntp.css");
@import url("~/assets/css/www24.css"); */
/* @import url("primevue/resources/themes/aura-light-green/theme.css"); */
@import url("~/assets/css/base.css");
@import url("primeicons/primeicons.css");
@import url("~/assets/css/font.css");
body {
  font-family: "Lato"!important;
}
</style>