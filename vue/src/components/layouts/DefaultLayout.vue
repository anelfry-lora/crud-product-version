<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import Notification from "../Notification.vue";

const store = useStore();
const router = useRouter();
const user = computed(() => store.state.user.data);

const navigation = [
    { name: 'Products', to: { name: "Products" } },
    { name: 'Category', to: { name: "Category" } },
    { name: 'Ordered', to: { name: "Orders" } },
]

const logout = () => {
    store.dispatch('logout')
        .then(() => {
            router.push({
                name: 'Login'
            });
        });
}
</script>
<template>
    <!-- DefaultLayout -->
    <div class=" min-h-full">
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="text-cyan-500 w-10 h-10">
                                <path fill-rule="evenodd"
                                    d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="md:block hidden">
                            <div class="flex items-baseline ml-10 space-x-4">
                                <router-link v-for="item in navigation" :key="item.name" :to="item.to"
                                    active-class="text-white bg-gray-800" :class="[
                                        this.$route.name === item.to.name
                                            ? 'bg-slate-700 hover:bg-slate-800'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'px-3 py-2 rounded-md text-sm font-medium',
                                    ]">{{ item.name }} </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="md:block hidden">
                        <div class="md:ml-6 flex items-center ml-4">
                            <!-- Profile dropdown -->
                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton
                                        class="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center max-w-xs text-sm bg-gray-800 rounded-full">
                                        <span class="sr-only">Open user menu</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="w-8 h-8 text-white">
                                            <path fill-rule="evenodd"
                                                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <MenuItems
                                        class="ring-1 ring-black ring-opacity-5 focus:outline-none absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg">
                                        <div class="ml-3">
                                            <div class="black text-base font-medium leading-none">
                                                {{ user.name }}
                                            </div>
                                            <div class="text-sm font-medium leading-none text-gray-400">
                                                {{ user.email }}
                                            </div>
                                        </div>
                                        <hr class="mx-2 mt-2">
                                        <MenuItem v-slot="{ active }">
                                        <a @click="logout" :class="[
                                            'block px-4 py-2 text-sm text-gray-700 hover:text-red-500 cursor-pointer font-semibold',
                                        ]">Sing out</a>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                    <div class="md:hidden flex -mr-2">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md">
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block w-6 h-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block w-6 h-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>
            <DisclosurePanel class="md:hidden">
                <div class="sm:px-3 px-2 pt-2 pb-3 space-y-1">
                    <router-link v-for="item in navigation" :key="item.name" :to="item.to"
                        active-class="text-white bg-gray-800" :class="[
                            this.$router.name === item.to.name
                                ? 'bg-slate-800 hover:bg-slate-800'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block px-3 py-2 rounded-md text-base font-medium',
                        ]">
                        {{ item.name }}
                    </router-link>
                </div>
                <div class=" pt-4 pb-3 border-t border-gray-700">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-8 h-8 text-white">
                                <path fill-rule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium leading-none text-white">
                                {{ user.name }}
                            </div>
                            <div class="text-sm font-medium leading-none text-gray-400">
                                {{ user.email }}
                            </div>
                        </div>
                    </div>
                    <div class="px-2 mt-3 space-y-1">
                        <DisclosureButton as="a" @click="logout"
                            class="hover:bg-gray-700 hover:text-red-400 block px-3 py-2 text-base font-medium text-gray-400 rounded-md cursor-pointer">
                            Sing Out
                        </DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>

        <router-view></router-view>

        <Notification />
    </div>
</template>
  
