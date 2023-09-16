<script setup>
import InputLabel from "../../components/InputLabel.vue";
import Input from "../../components/Input.vue";
import PrimaryButton from '../../components/PrimaryButton.vue';
import Alert from '../../components/Alert.vue';
import { LockClosedIcon } from "@heroicons/vue/20/solid";
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";

const router = useRouter();

const user = {
    email: "",
    password: "",
    remember: false,
};
const loading = ref(false);
let errors = ref("");

const login = (ev) => {
    ev.preventDefault();

    loading.value = true;
    store.dispatch("login", user)
        .then(() => {
            loading.value = false;
            router.push({
                name: "Products",
            });
        })
        .catch((err) => {
            loading.value = false;
            errors.value = err.response.data.error || err.response.data.errors;
        });
};
</script>

<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="w-auto h-10 mx-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company" />
        <h2 class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Sign in to your account
        </h2>

        <p class="mt-2 text-sm text-center text-gray-600">
            Or
            {{ " " }}
            <router-link :to="{ name: 'Register' }" class="hover:text-indigo-500 font-medium text-indigo-600">
                register for free
            </router-link>
        </p>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
        <form class="space-y-6" @submit="login">
            <Alert v-if="Object.keys(errors).length">
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
            <div>
                <InputLabel for="email" value="Email Address" />
                <Input id="email" type="email" class="block w-full" autofocus autocomplete="email" v-model="user.email" />
            </div>

            <div>
                <InputLabel for="password" value="Password" />
                <Input id="password" name="password" type="password" autocomplete="current-password"
                    v-model="user.password" />
            </div>
            <div>
                <PrimaryButton class="group relative flex justify-center w-full" :disabled="loading" :class="{
                    'cursor-not-allowed': loading, 'hover:bg-gray-500': loading,
                }">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3" v-if="loading">
                        <LockClosedIcon class="group-hover:text-gray-400 w-5 h-5 text-gray-500" aria-hidden="true" />
                    </span>
                    <svg v-if="loading" class="animate-spin w-5 h-5 mr-3 -ml-1 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    Sign in
                </PrimaryButton>
            </div>
        </form>
    </div>
</template>

<style scoped></style>
