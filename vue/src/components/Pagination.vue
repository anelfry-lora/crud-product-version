<script setup>
import { defineProps, defineEmits } from 'vue';
import store from '../store';

const props = defineProps({
    value: Object,
    dispatch: String
});

const getForPage = (ev, link) => {
    ev.preventDefault();
    if (!link.url || link.active) {
        return;
    }
    store.dispatch(props.dispatch, { url: link.url })
}

</script>

<template>
    <div class="flex justify-center mt-5">
        <nav class="relative z-0 inline-flex justify-center -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a v-for="(link, i) of value.links" :key="i" :disabled="!link.url" href="#" @click="getForPage($event, link)"
                aria-current="page"
                class="whitespace-nowrap relative inline-flex items-center px-4 py-2 text-sm font-medium border" :class="[
                    link.active ? 'z-10 border-gray-500 bg-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50',
                    i === 0 ? 'rounded-l-md bg-gray-900' : '',
                    i === value.links.length - 1 ? 'rounded-r-md' : '',
                ]" v-html="link.label">
            </a>
        </nav>
    </div>
</template>