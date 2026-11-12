<template>
    <div class="">
        <div class="">
            <Navbar24/>

            <HeaderSectionTest bg="bg-[url('/static/img/ntp-bg-old.jpg')]">
              <template #h1>OUR CUSTOMERS</template>
            </HeaderSectionTest>

            <section class="py-16 sm:py-24 bg-white">
              <div class="px-12 mb-12">
                <div class="grid gap-4 grids-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto">
                  <div>
                    <h1 class="mb-10 text-left text-3xl font-bold text-blue-950 md:text-4xl ">OUR CUSTOMERS</h1>
                  </div>
                  <div>
                    <p>
                      Our customers are large international domestic aviation or military aviation that demand total compliance with authority codes and optimal operational execution.
                    </p>
                  </div>
                </div>
              </div>

              <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-4 grid-cols-2 md:grid-cols-5">
                  <img class="m-auto" src="/static/img/customer/aeco.png" alt="">
                  <img class="m-auto" src="/static/img/customer/conoco.png" alt="">
                  <img class="m-auto" src="/static/img/customer/ge.png" alt="">
                  <img class="m-auto" src="/static/img/customer/gulf.png" alt="">
                  <img class="m-auto" src="/static/img/customer/indonesia-power.png" alt="">
                  <img class="m-auto" src="/static/img/customer/rex.png" alt="">
                  <img class="m-auto" src="/static/img/customer/rokaf.png" alt="">
                  <img class="m-auto" src="/static/img/customer/ats.png" alt="">
                  <img class="m-auto" src="/static/img/customer/gmf.png" alt="">
                  <img class="m-auto" src="/static/img/customer/chevron.png" alt="">
                  <img class="m-auto" src="/static/img/customer/c-l-aerospace.png" alt="">
                  <img class="m-auto" src="/static/img/customer/ptpn.png" alt="">
                  <img class="m-auto" src="/static/img/customer/avocet.png" alt="">
                  <img class="m-auto" src="/static/img/customer/solar-turbines.png" alt="">
                  <img class="m-auto" src="/static/img/customer/pupuk-indonesia.png" alt="">
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