<script setup lang="ts">
import { ref } from 'vue'
import MobileSidebar from '../components/layout/MobileSidebar.vue'
import StaticSidebar from '../components/layout/StaticSidebar.vue'
import Header from '../components/layout/Header.vue'

import {
  HomeIcon,
  UsersIcon,
  CursorArrowRaysIcon,
  EnvelopeOpenIcon
} from '@heroicons/vue/24/outline'

import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
  { name: 'Pacientes', href: '/patients', icon: UsersIcon, current: false }
]

const userNavigation = [
  { name: 'Meu Perfil', href: '#' },
  { name: 'Sair', href: '#' },
]

const stats = [
  { id: 1, name: 'Total de Pacientes', stat: '15', icon: UsersIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'Pacientes excluidos', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'Pacientes editados', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
]

const sidebarOpen = ref(false)
</script>

<template>
  <div>
    <h3 class="text-base font-semibold leading-6 text-gray-900">Nos últimos 30 dias</h3>

    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="item in stats" :key="item.id" class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
        <dt>
          <div class="absolute rounded-md bg-rose-700 p-3">
            <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ item.name }}</p>
        </dt>
        <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
          <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
          <p :class="[item.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']">
            <ArrowUpIcon v-if="item.changeType === 'increase'" class="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
            <ArrowDownIcon v-else class="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
            <span class="sr-only"> {{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by </span>
            {{ item.change }}
          </p>
          <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
            <div class="text-sm">
              <a href="/patients" class="font-medium text-rose-600 hover:text-rose-500">Ver todos</a>
            </div>
          </div>
        </dd>
      </div>
    </dl>
    <!-- <MobileSidebar :nav="navigation" :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <StaticSidebar :nav="navigation" />

    <div class="lg:pl-72">
      <Header :userNav="userNavigation" @openSidebar="sidebarOpen = true" />

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          Conteúdo...
        </div>
      </main>
    </div> -->
  </div>
</template>
