<template>
    <div class="">
        <div class="">
            <Navbar24/>
            
            <HeaderSection>
                <template #h2>aero engine services</template>
                <template #h1>
                    <span class="bg-blue-950 text-white pl-3 pr-2">experience</span> and expertise<br/>
                    at effective <span class="bg-amber-400 text-white pl-2">cost </span>
                </template>
            </HeaderSection>

            <SlideDescWithImg sideimage="bg-[url('/static/img/services/aero01.jpg')]" rightbg=true>
                <template #h2>Maintenance, Repair and Overhaul of Aero Engine </template>
                <template #content>
                    <p>
                        We understand that maintaining engine performance so that it is always in prime condition is not an easy matter, it is complex and requires long expertise and experience to find the best conditions.
                        <br/>
                        With experience of more than 30 years in MRO and certified experts we believe we can meet your needs for high quality care by prioritizing the best safety and performance on :
                        <br/>
                    </p>
                    <br/>
                    <ul class="list-disc ml-4">
                        <li>Turbo Prop, Turbo Shaft, Turbo Jet / Fan</li>
                        <li>Component Repair</li>
                        <li>Accesories</li>
                        <li>Line maintenance</li>
                    </ul>
                </template>
            </SlideDescWithImg>


            <SlideDescWithImg sideimage="bg-[url('/static/img/services/aero02.jpg')]">
                <template #h2>Production Engine Assembly & Other Services </template>
                <template #content>
                    <p>
                        To face ever changing global competition, NTP provides other services to help you prepare for it. We will support your need for following services :
                    </p>
                    <br/>

                    <div class="my-5 md:mx-2 md:inline-block ">
                        <a href="#" class="whitespace-nowrap text-nowrap p-3 md:py-5 md:px-10  tracking-[.3rem] text-left text-xs md:text-sm uppercase font-normal focus:outline-none bg-transparent border border-blue-950 hover:bg-gray-200/80 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                            Training
                        </a>
                    </div>
                    <div class="my-5 md:mx-2 md:inline-block">
                        <a href="#" class="whitespace-nowrap text-nowrap p-3 md:py-5 md:px-10 tracking-[.3rem] text-left text-xs md:text-sm uppercase font-normal focus:outline-none bg-transparent border border-blue-950 hover:bg-gray-200/80 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                            On Wing Maintenance
                        </a>
                    </div>                                
                    <div class="my-5 md:mx-2 md:inline-block">
                        <a href="#" class="whitespace-nowrap text-nowrap p-3 md:py-5 md:px-10 tracking-[.3rem] text-left text-xs md:text-sm uppercase font-normal focus:outline-none bg-transparent border border-blue-950 hover:bg-gray-200/80 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                            Sparepart Sale
                        </a>
                    </div>     
                    <div class="my-5 md:mx-2 md:inline-block">
                        <a href="#" class="whitespace-nowrap text-nowrap p-3 md:py-5 md:px-10 tracking-[.3rem] text-left text-xs md:text-sm uppercase font-normal focus:outline-none bg-transparent border border-blue-950 hover:bg-gray-200/80 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                            Other Services
                        </a>
                    </div>    
                </template>
            </SlideDescWithImg>

            <SlideDescWithImg sideimage="bg-[url('/static/img/services/aero01.jpg')]" rightbg=true>
                <template #h2>Support Facilities & Accesories</template>
                <template #content>
                    <p>
                        NTP is equipped with complete facilities to support your aircraft's maintenance repair and engine overhaul activities, including the following :
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

            <div class="px-7 md:pt-24  mx-auto max-w-screen-xl">
            <h2 class="text-blue-950 font-bold text-3xl md:text-4xl md:pl-0 md:pt-0">Engine Capabilities</h2>
                
            </div>

            
            <ContactSection/>
            
            <FooterSection/>

        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout:'tw'
});

</script>