<template>
  <div>
    <section
      class="bg-cover bg-center bg-no-repeat relative"
      :class="computedBgClass"
      :style="computedBgStyle"
    >
      <div class="py-24 px-6 mx-auto max-w-screen-xl">
        <div>
          <h2 class="text-center text-3xl font-bold text-white md:text-4xl tracking-wider uppercase">
            <slot name="h1">{{ title }}</slot>
          </h2>
          <p v-if="subtitle" class="text-center text-slate-200 mt-2 text-sm md:text-base max-w-2xl mx-auto">
            <slot name="subtitle">{{ subtitle }}</slot>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title?: string;
  subtitle?: string;
  bg?: string;
  bgImage?: string;
}>();

const computedBgClass = computed(() => {
  if (props.bgImage) return '';
  if (props.bg) return props.bg;
  return "bg-[url('/static/img/ntp-bg-old.jpg')]";
});

const computedBgStyle = computed(() => {
  if (props.bgImage) {
    return { backgroundImage: `url(${props.bgImage})` };
  }
  return {};
});
</script>
