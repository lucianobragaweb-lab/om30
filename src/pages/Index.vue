<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

import {
  UsersIcon,
} from '@heroicons/vue/24/outline'

const store = useStore()
const totalPatients = computed(() => store.getters.totalPatients)

const stats = [
  { id: 1, name: 'Pacientes', stat: totalPatients, icon: UsersIcon }
]

onMounted(() => {
  store.dispatch('getTotalPatients')
})
</script>

<template>
  <div>
    <h3 class="text-base font-semibold leading-6 text-gray-900">Seja bem vindo!</h3>

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
          <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
            <div class="text-sm">
              <RouterLink to="/patients" class="font-medium text-rose-600 hover:text-rose-500">Ver todos</RouterLink>
            </div>
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>
