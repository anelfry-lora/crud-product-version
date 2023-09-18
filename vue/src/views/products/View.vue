<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import store from '../../store';
import { useRoute, useRouter } from 'vue-router';
import Page from '../layouts/page.vue';
import { LockClosedIcon } from "@heroicons/vue/20/solid";
import Input from '../../components/Input.vue';
import InputLabel from '../../components/InputLabel.vue';
import TextAre from '../../components/TextArea.vue';
import PrimaryButton from '../../components/PrimaryButton.vue';
import Loading from '../../components/Loading.vue';
import Alert from '../../components/Alert.vue';

const router = useRouter();
const route = useRoute();
const ProductLoading = computed(() => store.state.currentProduct.loading);

let model = ref({
    name: '',
    description: null,
    category_id: null,
    price: null,
    create_at: null,
})

let categories = ref([]);
let errors = ref("");
const loading = ref(false);

onMounted(() => {
    store.dispatch('getCategories')
        .then(() => {
            categories.value = store.state.categories;
        });
});

watch(
    () => store.state.currentProduct.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft",
        }
    }
);

if (route.params.id) {
    store.dispatch('getProduct', route.params.id);
}

const saveProduct = () => {
    loading.value = true;
    store.dispatch('saveProduct', model.value)
        .then(({ data }) => {
            loading.value = false;
            router.push({
                name: 'Products',
                params: { id: data.data.id },
            })
        }).catch((err) => {
            loading.value = false;
            errors.value = err.response.data.error || err.response.data.errors;
        });;
}

</script>

<template>
    <Page :title="route.params.id ? model.name : 'Create New Product'">
        <Loading v-if="ProductLoading" />
        <section v-else>
            <form @submit.prevent="saveProduct" class="sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div class="sm:rounded-md sm:overflow-hidden shadow">
                    <Alert v-if="Object.keys(errors).length" class="m-4">
                        <div v-if="(!!errors) && (errors.constructor === Object)">
                            <ul v-for="(field, i) of Object.keys(errors)" :key="i" lass="list-inside">
                                <li v-for="(error, ind) of errors[field] || []" :key="ind">
                                    * {{ error }}
                                </li>
                            </ul>
                        </div>
                        <div v-else>
                            {{ errors }}
                        </div>
                        <span @click="errors = ''"
                            class="w-8 h-8 flex items-center justify-center rounded-full transition-color cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </Alert>
                    <div class="md:grid-cols-2 md:gap-6 grid p-4">
                        <div>
                            <InputLabel for="name" value="Name" />
                            <Input id="name" type="text" class="block w-full" autofocus v-model="model.name" />
                        </div>
                        <div>
                            <InputLabel for="category_id" value="Category" />
                            <select id="category_id"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                v-model="model.category_id">
                                <option value="" disabled>Select a category</option>
                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="md:grid-cols-2 md:gap-6 grid p-4">
                        <div>
                            <InputLabel for="description" value="Description" />
                            <TextAre id="description" class="block w-full" v-model="model.description" />
                        </div>
                        <div>
                            <InputLabel for="price" value="Price" />
                            <div class="flex">
                                <Input id="price" type="text"
                                    class="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                                    v-model="model.price" />
                                <span
                                    class="rounded-r-md inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-end m-4">
                        <!-- :class="{ 'opacity-25': form.processing }" :disabled="form.processing" -->
                        <router-link to="/"
                            class="hover:bg-red-600 font-semibold bg-red-700 rounded-md px-3 py-1.5 text-sm  leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Cancel
                        </router-link>
                        <PrimaryButton class="group relative flex ml-4" :disabled="loading" 
                            :class="{ 'cursor-not-allowed': loading, 'hover:bg-gray-500': loading, }">
                            <svg v-if="loading" class="animate-spin w-5 h-5 mr-3 -ml-1 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <p>{{ model.id ? 'Update' : 'Create' }}</p>
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </section>
    </Page>
</template>