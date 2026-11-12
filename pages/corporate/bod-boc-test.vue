<template>
    <div class="">
        <div class="">
            <Navbar24/>

            <HeaderSectionTest bg="bg-[url('/static/img/ntp-bg-old.jpg')]">
              <template #h1>BOARD OF DIRECTORS</template>
            </HeaderSectionTest>

            <div class=" mx-auto max-w-screen-xl grid gap-1 grid-cols-1 lg:grid-cols-3">

                <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border max-w-96 mx-auto">
                    <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
                        <img src="" alt="profile-picture" />
                        <!-- /public/static/img/bod/ceo.png -->
                    </div>
                    <div class="p-6 text-center">
                        <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        Tarmizi Kemal Fasya Lubis
                        </h4>
                        <p
                        class="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                        Direktur Utama
                        </p>
                    </div>
                </div>

                <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border max-w-96 mx-auto mt-12 lg:mt-0">
                    <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
                        <img src="" alt="profile-picture" />
                    </div>
                    <div class="p-6 text-center">
                        <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        Tarmizi Kemal Fasya Lubis
                        </h4>
                        <p
                        class="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                        Direktur Utama
                        </p>
                    </div>
                </div>

                <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border max-w-96 mx-auto mt-12 lg:mt-0">
                    <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
                        <img src="" alt="profile-picture" />
                    </div>
                    <div class="p-6 text-center">
                        <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        Tarmizi Kemal Fasya Lubis
                        </h4>
                        <p
                        class="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                        Direktur Utama
                        </p>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout:'tw'
});
</script>