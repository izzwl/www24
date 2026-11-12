<template>
    <div class="">
        <div class="">
            <Navbar24/>

            <HeaderSectionTest bg="bg-[url('/static/img/ntp-bg-old.jpg')]">
              <template #h1>CAREER</template>
            </HeaderSectionTest>

            <section class="py-16 sm:py-24 bg-white">
                <div class="px-12 mb-12">
                  <div class="grid gap-4 grids-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto">
                    <div>
                      <h1 class="mb-10 text-left text-3xl font-bold text-blue-950 md:text-4xl ">OUR OPEN ROLES</h1>
                    </div>
                    <div>
                      <p>
                        Discover exciting career opportunities at PT. NTP and join our talented and passionate team. Explore our current openings below and find the perfect role to showcase your skills and experiences.
                      </p>
                    </div>
                  </div>
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