<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    value: String,
});
</script>

<template>
    <label class="block text-sm font-medium leading-4 text-gray-900">
        <span v-if="value">{{ value }}</span>
        <span v-else><slot /></span>
    </label>
</template>