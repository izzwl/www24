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