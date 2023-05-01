<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps<{
  patient: Patient
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'destroy'])
const close = () => emit('close')
const destroy = (id: number) => emit('destroy', id)
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
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
              <div class="bg-white px-4 pb-4 pt-5 sm:pb-4">
                <div class="">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Ecluir Paciente</DialogTitle>

                    <p>Deseja realmente ecluir este paciente?</p>

                  </div>
                </div>
              </div>

              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="mt-3 ml-4 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="close" ref="cancelButtonRef">Cancelar</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-rose-600 hover:bg-rose-500 sm:mt-0 sm:w-auto" @click="destroy(props.patient.id)" ref="cancelButtonRef">Excluir</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


