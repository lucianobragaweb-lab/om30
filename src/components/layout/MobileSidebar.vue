<script setup lang="ts">
import type { MenuItem } from '@/types/MenuItem'

import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import {
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

defineProps<{
  isOpen: boolean
  nav?: Array<MenuItem>
}>()

const emit = defineEmits(['close'])
const close = () => emit('close')
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50 lg:hidden">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-900/80" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="close()">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div class="flex h-16 shrink-0 items-center">
                <RouterLink to="/">
                  <img class="h-8 w-auto" alt="OM30" src="/logo.png" />
                </RouterLink>
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in nav" :key="item.name">
                        <RouterLink v-if="item.to" :to="item.to" :class="[item.current ? 'bg-gray-50 text-rose-600' : 'text-gray-700 hover:text-rose-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                          <component :is="item.icon" :class="[item.current ? 'text-rose-600' : 'text-gray-400 group-hover:text-rose-600', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                          {{ item.name }}
                        </RouterLink>

                        <a v-else-if="item.href" :href="item?.href" :class="[item.current ? 'bg-gray-50 text-rose-600' : 'text-gray-700 hover:text-rose-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                          <component :is="item.icon" :class="[item.current ? 'text-rose-600' : 'text-gray-400 group-hover:text-rose-600', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="mt-auto">
                    <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                      <Cog6ToothIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" aria-hidden="true" />
                      Configurações
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
