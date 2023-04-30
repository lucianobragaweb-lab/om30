<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'
import MobileSidebar from '@/components/layout/MobileSidebar.vue'
import StaticSidebar from '@/components/layout/StaticSidebar.vue'
import Header from '@/components/layout/Header.vue'

import {
  HomeIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
  { name: 'Pacientes', href: '/patients', icon: UsersIcon, current: false }
]

const userNavigation = [
  { name: 'Meu Perfil', href: '/profile' },
  { name: 'Sair', href: '/login' },
]

const sidebarOpen = ref(false)

const isDasboardPage = computed(
  () => route.name !== 'login'
)
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <div class="h-full">
    <MobileSidebar v-if="isDasboardPage" :nav="navigation" :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <StaticSidebar v-if="isDasboardPage" :nav="navigation" />

    <div class="lg:pl-72" v-if="isDasboardPage">
      <Header :userNav="userNavigation" @openSidebar="sidebarOpen = true" />

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <RouterView />
          <!-- Your content -->
        </div>
      </main>
    </div>

    <RouterView v-else />
  </div>
</template>

<style scoped>
</style>
