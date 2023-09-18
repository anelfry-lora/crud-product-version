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
        <section v-else-if="products.data.length">
			<ProductsList :products="products.data" />
            <Pagination :value="products" :dispatch="'getProducts'"/>
		</section>
        <div v-else class="py-16 text-center text-gray-600">
            Your don't have product yet
        </div>        
    </Page>
</template>
  
