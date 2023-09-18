<script setup>
import { computed } from 'vue';
import store from '../../store';
import Page from '../layouts/page.vue';
import ProductsList from '../../components/frontend/ProductsList.vue';
import Loading from '../../components/Loading.vue';
import Pagination from '../../components/Pagination.vue';

const products = computed(()=> store.state.products);

store.dispatch('getProducts');
</script>

<template>
    <Page title="List Products"> 
        <Loading  v-if="products.loading"/>
        <section  v-else>
			<ProductsList :products="products.data" />
            <Pagination :value="products" :dispatch="'getProducts'" v-if="products.data.length > 10"/>
		</section>    
    </Page>
</template>
  
