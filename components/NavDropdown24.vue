<template>
    <li>
    <button :id="id" :data-dropdown-toggle="'toggle-'+id" class="flex items-center justify-between w-full py-2 px-3 text-white text-xs uppercase hover:text-blue-800/90 md:hover:bg-transparent md:border-0 md:hover:text-sky-200 md:p-0 md:w-auto ">
        {{title}} 
        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
    </button>
    <div :id="'toggle-'+id" class="z-10 hidden font-normal border-solid border-2 border-gray-300 bg-blue-950/95 backdrop-blur-md divide-y divide-gray-100 shadow w-100 -translate-y-2 md:w-100 ">
        <ul class="py-2 text-sm text-white" aria-labelledby="dropdownLargeButton">
        <slot></slot>
        </ul>
        <!-- <div class="py-1">
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
        </div> -->
    </div>
    </li>
</template>
<script setup lang="ts">
defineProps<{
  id?: string,
  toggle?: string,
  title?: string,
}>()
</script>