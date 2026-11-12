<template>
    <div class="">
        <div class="">
            <Navbar24/>

            <HeaderSectionTest bg="bg-[url('/static/img/ntp-bg-old.jpg')]">
              <template #h1>BOD AND BOC</template>
            </HeaderSectionTest>

            <section class="py-16 sm:py-24 bg-white">
                <div class="px-12 mb-12">
                  <div class="grid gap-4 grids-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto">
                    <div>
                      <h1 class="mb-10 text-left text-3xl font-bold text-blue-950 md:text-4xl ">BOARD OF DIRECTORS</h1>
                    </div>
                    <div>
                      <p>
                        The BOD establishes the Company’s business strategies as well as the annual work plan and budget including risk management, and with the agreement of the BOC, carries out these plans. 
                      </p>
                    </div>
                  </div>
                </div>

                <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10">

                        <div class="group flex flex-col h-full bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div class="relative h-80 overflow-hidden">
                                <img class="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500" 
                                     src="/static/img/bod/don.jpeg" 
                                     alt="Tedi Permadi">
                                <div class="absolute inset-0 bg-gradient-to-t from-aerospace-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div class="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <p class="text-sm font-bold text-amber-700 uppercase tracking-wider mb-1">
                                        Director of Operations and comm.
                                    </p>
                                    <h3 class="text-xl font-bold text-black mb-4">
                                        Tedi Permadi
                                    </h3>
                                    <p class="text-gray-600 text-sm leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="group flex flex-col h-full bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div class="relative h-80 overflow-hidden">
                                <img class="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500" 
                                     src="/static/img/bod/dirut.jpeg" 
                                     alt="Tarmidzi Kemal Fasya Lubis">
                                <div class="absolute inset-0 bg-gradient-to-t from-aerospace-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div class="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <p class="text-sm font-bold text-amber-700 uppercase tracking-wider mb-1">
                                        President Director
                                    </p>
                                    <h3 class="text-xl font-bold text-black mb-4">
                                        Tarmizi Kemal Fasya Lubis
                                    </h3>
                                    <p class="text-gray-600 text-sm leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="group flex flex-col h-full bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div class="relative h-80 overflow-hidden">
                                <img class="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500" 
                                     src="/static/img/bod/dirkeu.jpeg" 
                                     alt="Budi Kadharjono">
                                <div class="absolute inset-0 bg-gradient-to-t from-aerospace-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div class="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <p class="text-sm font-bold text-amber-700 uppercase tracking-wider mb-1">
                                        Director of Finance and Adm.
                                    </p>
                                    <h3 class="text-xl font-bold text-black mb-4">
                                        Budi Kadharjono
                                    </h3>
                                    <p class="text-gray-600 text-sm leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua
                                    </p>
                                </div>
                            </div>
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