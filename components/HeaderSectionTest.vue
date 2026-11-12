<template>
    <div>
        <section class="bg-cover bg-center bg-no-repeat" :class=bg>
            <div class="py-24 px-6 mx-auto max-w-screen-xl">
                <div>
                    <h2 class="text-center text-3xl font-bold text-white md:text-4xl ">
                        <slot name="h1"></slot>
                    </h2>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  bg?: string
}>()
</script>