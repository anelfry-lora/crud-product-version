<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    food: Object,
});

</script>

<template>
    <a :href="food.image" rel="noopener noreferrer" target="_blank"
        class="group bg-opacity-20 max-w-sm bg-gray-500 rounded-lg">
        <img :src="food.image" :alt="food.name" :title="food.name" class="aspect-video w-full rounded-t-lg" />
        <div class="p-4">
            <div>
                <h4 class="text-2xl font-semibold tracking-tight text-gray-900">
                    {{ food.name }}
                </h4>
                <p class="h-16 mt-4 mb-3 text-lg font-normal text-gray-700">
                    {{ food.description }}
                </p>
            </div>
            <div class="mt-4">
                <div class="flex items-center gap-1 mt-2">
                    <a href="/orders"
                        class="hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                        Make to order
                        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
</a></template>