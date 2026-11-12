<template>
    <div>
    <section class="">
        <div class="py-12 px-6 md:pt-24 md:mb-6 mx-auto max-w-screen-xl ">
            <div class="grid gap-4 mt-10">
                <div class="">
                    <h2 class="mb-4 ml-8 text-left tracking-[.7rem] uppercase text-blue-950 ">
                        <slot name="h2"></slot>
                    </h2>
                    <h1 class="mb-10 ml-8 text-left text-3xl font-bold tracking-[.5rem] uppercase text-blue-950 leading-normal md:leading-[3rem] md:text-4xl ">
                        <slot name="h1"></slot>
                    </h1>
                </div>
            </div>
        </div>
    </section>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string,
}>()
</script>