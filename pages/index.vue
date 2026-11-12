<template>
<div class="">
    <div class="">
        <Navbar24/>


        <div id="default-carousel" class="relative w-full" >
            <!-- Carousel wrapper -->
            <div class="relative overflow-hidden h-[calc(100vh-4rem)] bg-blue-950/90">
                <!-- Item 1 -->
                <div class="hidden duration-1000 ease-in-out" id="carousel-item-1" >
                    <div class="h-svh bg-cover bg-center bg-no-repeat bg-[url('/static/img/carousel/Screenshot_20240614_123738.png')] absolute bg-blue-950/80 bg-blend-multiply block w-full " >
                    </div>
                    <div class="
                        absolute top-1/2 left-1/2 text-2xl p-6 pt-2 block w-full font-semibold text-white -translate-x-1/2 -translate-y-2/3 sm:text-3xl ">
                        <!-- <h1 class="text-white">First Slide</h1> -->
                        <a href="#" class="block mx-10 max-w-3xl md:ml-36 sm:mx-12 ">
                            <h5 class="mb-4 uppercase font-bold tracking-[.4rem] text-3xl md:text-5xl sm:text-3xl">YOUR TRUSTED<span class="bg-blue-950"> PARTNER </span></h5>
                            <h5 class="mb-4 uppercase font-bold tracking-[.4rem] text-3xl md:text-5xl sm:text-3xl">TO CREATE SHARED<span class="bg-amber-400">  VALUE </span></h5>
                            <!-- <span class="text-white bg-blue-950/90 tracking-[0.2rem] uppercase hover:brightness-75 border-white border py-4 px-8 text-sm">More info..</span> -->
                        </a>
                    </div>

                </div>
                <!-- Item 2 -->
                <div class="hidden duration-1000 ease-in-out" id="carousel-item-2" >
                    <div class="h-svh bg-cover bg-center bg-no-repeat bg-[url('/static/img/carousel/Screenshot_20240614_123813.png')] absolute bg-blue-950/80 bg-blend-multiply block w-full " >
                    </div>
                    <div class="
                        absolute top-1/2 left-1/2 text-2xl p-6 pt-2 block w-full font-semibold text-white -translate-x-1/2 -translate-y-2/3 sm:text-3xl ">
                        <!-- <h1 class="text-white">First Slide</h1> -->
                        <a href="#" class="block mx-10 max-w-3xl md:ml-36 sm:mx-12 ">
                            <h5 class="mb-4 uppercase font-bold tracking-[.4rem] text-3xl md:text-5xl sm:text-3xl">AERO ENGINE SERVICES</h5>
                            <p class="font-normal mb-6 md:text-2xl md:mb-6 sm:text-sm sm:mb-2">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <span class="text-white bg-blue-950/90 tracking-[0.2rem] uppercase hover:brightness-75 border-white border py-4 px-8 text-sm">More info..</span>
                        </a>
                    </div>
                </div>
                <!-- Item 3 -->
                <div class="hidden duration-1000 ease-in-out" id="carousel-item-3" >
                    <div class="h-svh bg-cover bg-center bg-no-repeat bg-[url('/static/img/carousel/Screenshot_20240614_123754.png')] absolute bg-blue-950/80 bg-blend-multiply brightness-75 block w-full " >
                    </div>
                    <div class="
                        absolute top-1/2 left-1/2 text-2xl p-6 pt-2 block w-full font-semibold text-white -translate-x-1/2 -translate-y-2/3 sm:text-3xl ">
                        <!-- <h1 class="text-white">First Slide</h1> -->
                        <a href="#" class="block mx-10 max-w-3xl md:ml-36 sm:mx-12 ">
                            <h5 class="mb-4 uppercase font-bold tracking-[.4rem] text-3xl md:text-5xl sm:text-3xl">INDUSTRIAL TURBINE SERVICES</h5>
                            <p class="font-normal mb-6 md:text-2xl md:mb-6 sm:text-sm sm:mb-2">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <span class="text-white bg-blue-950/90 tracking-[0.2rem] uppercase hover:brightness-75 border-white border py-4 px-8 text-sm">More info..</span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- Slider indicators -->
            <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" id="carousel-indicator-1" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" id="carousel-indicator-2" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" id="carousel-indicator-3" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
            </div>
            <!-- Slider controls -->
            <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" id="data-carousel-prev">
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" id="data-carousel-next">
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>
        </div>

        

        <section class="bg-white">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <div class="grid md:grid-cols-2 gap-4 mt-20 sm:grids-cols-1">
                    <div class="text-left">
                        <h2 class="ml-8 text-left tracking-[.7rem] uppercase text-blue-950 mb-4">
                            ABOUT  US
                        </h2>
                        <h1 class="mb-10 ml-8 text-left text-3xl font-bold tracking-tight text-blue-950 md:text-4xl lg:text-5xl">
                            We are a trusted partner with fully proficient experts in the industry
                        </h1>
                        <NuxtLink to="/corporate/about-us" class="ml-8 py-5 px-10 tracking-[.3rem] text-left text-sm uppercase font-normal text-blue-950 focus:outline-none bg-white border border-blue-950 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                            Know us more
                        </NuxtLink>
                    </div>
                    <div class="relative">
                        <p class="text-left pr-15 md:p-10 md:pt-0 p-8 pt-20   text-xl">
                            PT Nusantara Turbin dan Propulsi (NTP) is a trusted excellence center leading in South East Asia in the field of engineering, maintenance, repair and overhaul of gas turbines and rotating equipment. Since the early establishment by the name of Universal Maintenance Center (UMC) a division of PT IPTN, NTP has been projected as a business of engineering, maintenance, repair and overhaul in the field of turbines and rotating equipment.
                        </p>
                    </div>
                </div>
                
            </div>
        </section>

        <ContactSection/>
        <FooterSection/>
        
    </div>
</div>
</template>

<script setup lang="ts">
import { ref,onMounted } from "vue";
import { Carousel } from 'flowbite';
import type {
    CarouselItem,
    CarouselOptions,
    CarouselInterface,
} from 'flowbite';
import type { InstanceOptions } from 'flowbite';


definePageMeta({
    layout:'tw'
});

onMounted(() => {
    const carouselElement: HTMLElement = document.getElementById('default-carousel');
    const items: CarouselItem[] = [
        {
            position: 0,
            el: document.getElementById('carousel-item-1'),
        },
        {
            position: 1,
            el: document.getElementById('carousel-item-2'),
        },
        {
            position: 2,
            el: document.getElementById('carousel-item-3'),
        },
    ];

    const options: CarouselOptions = {
        defaultPosition: 0,
        interval: 10000,

        indicators: {
            activeClasses: 'bg-white',
            inactiveClasses:
                'bg-white/50 hover:bg-white',
            items: [
                {
                    position: 0,
                    el: document.getElementById('carousel-indicator-1'),
                },
                {
                    position: 1,
                    el: document.getElementById('carousel-indicator-2'),
                },
                {
                    position: 2,
                    el: document.getElementById('carousel-indicator-3'),
                },
            ],
        },

        // callback functions
        onNext: () => {
            // console.log('next slider item is shown');
        },
        onPrev: () => {
            // console.log('previous slider item is shown');
        },
        onChange: () => {
            // console.log('new slider item has been shown');
        },
    };

    // instance options object
    const instanceOptions: InstanceOptions = {
    id: 'default-carousel',
    override: true
    };

    const carousel: CarouselInterface = new Carousel(carouselElement, items, options, instanceOptions);

    carousel.cycle();

    // set event listeners for prev and next buttons
    const $prevButton = document.getElementById('data-carousel-prev');
    const $nextButton = document.getElementById('data-carousel-next');

    $prevButton.addEventListener('click', () => {
        carousel.prev();
    });

    $nextButton.addEventListener('click', () => {
        carousel.next();
    });
})
</script>