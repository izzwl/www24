<template>
    <div>
        <section class="md:mt-20 bg-cover bg-fixed bg-center bg-no-repeat">
            <template v-if="rightbg=='true'">
                <div class="absolute bg-gray-200 h-[26rem] w-[75vw] md:min-h-[53rem] md:w-[35vw] 2xl:w-[38vw] z-[-1]"></div>
            </template>

            <div class="py-2 px-7 md:pt-24 mx-auto max-w-screen-xl min-h-svh">
                <div class="grid gap-4 my-10 grids-cols-1 md:grid-cols-2">
                    <div 
                        class="bg-sky-200 w-[20rem] h-[20rem] md:w-[28rem] lg:w-[32rem] md:h-[36rem] mx-auto bg-cover bg-center bg-no-repeat md:block z-1 rounded-2xl overflow-hidden shadow-sm"
                        :class="resolvedClass"
                        :style="bgStyle"
                    >
                    </div>
                    <div class="md:pt-10">
                        <h2 class="pl-8 pt-12 text-left text-blue-950 font-bold text-3xl md:text-4xl md:pl-0 md:pt-0">
                            <slot name="h2"></slot>
                        </h2>
                        <div class="text-left md:p-10 md:pt-0 p-8 md:pl-0 md:pt-16 text-lg">
                            <slot name="content"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  bg?: string;
  sideimage?: string;
  image?: string;
  rightbg?: string;
}>();

const bgStyle = computed(() => {
  const imgUrl = props.image || (props.sideimage && (props.sideimage.startsWith('/') || props.sideimage.startsWith('http')) ? props.sideimage : null);
  if (imgUrl) {
    return { backgroundImage: `url('${imgUrl}')` };
  }
  const match = props.sideimage?.match(/bg-\[url\(['"]?([^'"]+)['"]?\)\]/);
  if (match) {
    return { backgroundImage: `url('${match[1]}')` };
  }
  return {};
});

const resolvedClass = computed(() => {
  if (props.sideimage && !props.sideimage.startsWith('/') && !props.sideimage.startsWith('http') && !props.sideimage.startsWith('bg-[url(')) {
    return props.sideimage;
  }
  return '';
});
</script>
