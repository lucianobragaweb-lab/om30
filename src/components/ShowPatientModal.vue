<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  patient: Patient
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
const close = () => emit('close')
</script>

<template>
  <TransitionRoot as="template" :show="props.isOpen">
    <Dialog as="div" class="relative z-50">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
              <div class="bg-white px-4 pb-4 pt-5 sm:pb-4">
                <div class="">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Detalhes do Paciente</DialogTitle>

                    <dl class="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                      <div class="sm:pr-4">
                        <dt class="inline text-gray-500">Nome: </dt>
                        <dd class="inline text-gray-700 font-semibold">{{ props.patient?.name }}</dd>
                      </div>

                      <div class="sm:pr-4">
                        <dt class="inline text-gray-500">Mãe: </dt>
                        <dd class="inline text-gray-700 font-semibold">{{ props.patient?.mother }}</dd>
                      </div>
                    </dl>

                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="close" ref="cancelButtonRef">Fechar</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

