<template>
    <li>
    <button :id="id" :data-dropdown-toggle="'toggle-'+id" class="flex items-center justify-between w-full py-2 px-3 text-gray-700 text-xs uppercase rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto ">
        {{title}} 
        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
    </button>
    <div :id="'toggle-'+id" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-100 md:w-100">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
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