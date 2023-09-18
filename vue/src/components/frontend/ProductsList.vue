<script setup>
import store from '../../store';
import { defineProps } from 'vue';

const props = defineProps({
    products: Object,
});

const deleteProduct = (product) => {
    store.commit('openConfirmDeleteModal', product);
}

const confirmDelete = () => {
    if (store.state.confirmDeleteModal.productToDelete) {
        store.dispatch('deleteProduct', store.state.confirmDeleteModal.productToDelete.id)
            .then(() => {
                store.dispatch('getProducts');
                store.commit('closeConfirmDeleteModal');
            });
    }
}

const cancelDelete = () => {
    store.commit('closeConfirmDeleteModal');
}

</script>

<template>
    <section>
        <div class="relative overflow-x-auto shadow-sm">
            <div class="flex justify-start p-2 m-2">
                <router-link :to="{name: 'ProductCreate'}" class="flex gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
                    New Product
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </router-link>
            </div>
            <table class="w-full text-sm text-left text-gray-500" v-if="products.length">
                <thead class="bg-gray-50 text-xs text-gray-700 uppercase">
                    <tr>
                        <th scope="col" class=" p-4">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                           Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 bg-white border-b">
                        <td class="p-4 text-gray-500">
                            {{ product.id }}
                        </td>
                        <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                            {{ product.name }}
                        </th>
                         <td class="px-6 py-4">
                            {{ product.description }}
                        </td>
                        <td class="px-6 py-4">
                            {{ product.category }}
                        </td>
                        <td class="px-6 py-4">
                            {{ product.price }}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                            {{ product.create_at }}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                            <router-link :to="{name: 'ProductView', params:{ id: product.id } }" class="hover:underline mr-2 font-semibold text-blue-600">
                                Edit
                            </router-link>
                            <button v-if="product.id" type="button" 
                                @click="deleteProduct(product)"
                                class="hover:underline mr-2 font-semibold text-red-600">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="py-16 text-center text-gray-600">
                Your don't have product yet
            </div>    
        </div>
        <div v-if="store.state.confirmDeleteModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="p-4 bg-white rounded-lg shadow-lg">
                <p class="text-lg font-semibold">Are you sure you want to delete this product?</p>
                <div class="flex justify-end mt-4">
                    <button @click="cancelDelete" class="mr-4 text-gray-500">Cancel</button>
                    <button @click="confirmDelete" class="font-semibold text-red-600">Delete</button>
                </div>
            </div>
        </div>
    </section>
</template>