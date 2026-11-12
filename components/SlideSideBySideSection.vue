<template>
    <div>
        <section class="
            bg-cover bg-fixed bg-center bg-no-repeat  
            " :class=bg
            
        >
            <div class="
                py-6 px-6 md:py-24 md:mb-6 md:mt-12 mx-auto max-w-screen-xl min-h-svh"
            >
                <div class="grid gap-4 my-20 grids-cols-1 md:grid-cols-2">
                    <div class="
                        w-[18rem] h-[20rem] mx-auto bg-cover bg-center bg-no-repeat
                        md:hidden
                        "
                        :class=sideimage
                        >

                    </div>
                    <div class="md:pt-10">
                        <h2 class="ml-10 text-left text-3xl font-bold text-white md:text-4xl ">
                            <slot name="h2"></slot>
                        </h2>
                        <p class="text-left text-white pr-15 md:p-10 md:pt-0 p-8 md:pt-16 text-lg">
                            <slot name="p"></slot>
                        </p>
                    </div>
                    <div class="
                        w-[30rem] h-[32rem] md:h-[34rem] mx-auto bg-cover bg-center bg-no-repeat
                        hidden md:block
                        " 
                        :class=sideimage
                    >

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  bg?: string,
  sideimage?: string,
}>()
const setBg = (str:any) => "bg-[url('"+str+"')]"
</script>