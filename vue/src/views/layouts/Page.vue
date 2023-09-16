<script setup>
import { defineProps } from 'vue';
import Header from '../../components/layouts/Header.vue';
import MainContent from '../../components/layouts/MainContent.vue';

const props = defineProps({
    title: String,
})
</script>

<template>
    <Header> {{ title }} </Header>
    <MainContent>
       <slot/> 
    </MainContent>
</template>