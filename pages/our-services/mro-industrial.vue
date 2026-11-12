<template>
    <div class="">
        <div class="">
            <Navbar24/>
            
            <HeaderSection>
                <template #h2>Industrial turbine services</template>
                <template #h1>
                    <span class="bg-blue-950 text-white pl-3 pr-2">PRECISION</span> works<br/>
                    for industrial <span class="bg-amber-400 text-white pl-2">turbine </span>
                </template>
            </HeaderSection>
            
            <SlideDescWithImg sideimage="bg-[url('/static/img/services/industrial01.jpg')]" rightbg=true>
                <template #h2>Steam Turbine Manufacture</template>
                <template #content>
                    <p>
                        Since 2005 the cooperation between NTP and BPPT (Agency for Assesment and Application of Technology) supported by Department of Industry and Commerce the Republic of Indonesia (RI) has been successful in the manufacturing and developing of steam turbines with capacities from 450HP to 4MW then we are constantly risen achieve a capacity 7 MW.
                    </p>
                </template>
            </SlideDescWithImg>

            <SlideDescWithImg sideimage="bg-[url('/static/img/services/industrial02.jpg')]" >
                <template #h2>Steam Turbine Specialist</template>
                <template #content>
                    <p>
                        With our team experience and expertise we have capabilities to repair and develop a lot of project such as:
                    </p>
                    <br/>

                    <div id="accordion-collapse" data-accordion="collapse">
                        <h2 id="accordion-collapse-heading-1">
                            <button type="button" class="flex items-center justify-between w-full p-5 pl-0 text-xl md:text-2xl font-bold border-b-4 border-black hover:bg-gray-100 gap-3" 
                                data-accordion-target="#accordion-collapse-body-1" aria-controls="accordion-collapse-body-1">
                                <span>Workshop Repair</span>
                                <!-- <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                </svg> -->
                            </button>
                        </h2>
                        <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
                            <div class="p-5 ">
                            <p class="mb-2">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                            <p class="">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                            </div>
                        </div>
                        
                        <h2 id="accordion-collapse-heading-3">
                            <button type="button" class="flex items-center justify-between w-full p-5 pl-0 text-xl md:text-2xl font-bold border-b-4 border-black hover:bg-gray-100 gap-3" 
                            data-accordion-target="#accordion-collapse-body-3" aria-controls="accordion-collapse-body-3">
                            <span>Field Service</span>
                            <!-- <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                            </svg> -->
                            </button>
                        </h2>
                        <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
                            <div class="p-5">
                            <p class="mb-2">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                            <p class="">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                            </div>
                        </div>
                    </div>
                </template>
            </SlideDescWithImg>

            <ContactSection/>
            
            <FooterSection/>

        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
definePageMeta({
    layout:'tw'
});

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>