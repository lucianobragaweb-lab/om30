<script setup lang="ts">
import axios from 'axios'
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PhotoIcon } from '@heroicons/vue/24/solid'
// import PatientForm from '../components/forms/PatientForm.vue'

defineProps<{
  isOpen: boolean
}>()

const patient = ref<Patient>({
  name: '',
  photo: '',
  mother: '',
  birth: new Date(),
  cpf: '',
  cns: '',
  address: ''
})

const emit = defineEmits(['close', 'update'])
const close = () => emit('close')
const update = () => emit('update')

const newPatient = async () => {
  try {
    axios.post('/api/patients', patient.value).then(function (response) {
      close()
    })
  } catch (error) {
    console.error(error)
  } finally {
    update()
  }
}
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
              <div class="bg-white px-4 pb-4 pt-5 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Novo Paciente</DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Preencha as informações abaixo para cadastrar um novo paciente.</p>
                    </div>
                    <!-- {{ patient }} -->
                    <!-- <PatientForm @update="updateForm" /> -->
                    <div class="pt-2 mt-4 border-t grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                      <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nome completo</label>
                        <input v-model="patient.name" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nome da mãe</label>
                        <input v-model="patient.mother" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div class="sm:col-span-2">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Data de nascimento</label>
                        <input v-model="patient.birth" type="date" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div class="sm:col-span-2">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">CPF</label>
                        <input v-model="patient.cpf" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div class="sm:col-span-2">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">CNS</label>
                        <input v-model="patient.cns" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">CEP</label>
                        <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div class="col-span-4">
                        <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Rua</label>
                        <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div class="col-span-2">
                        <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Num.</label>
                        <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div class="sm:col-span-2">
                        <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Cidade</label>
                        <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div class="sm:col-span-2">
                        <label for="region" class="block text-sm font-medium leading-6 text-gray-900">Estado</label>
                        <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <div class="col-span-full">
                        <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Foto do paciente</label>
                        <div class="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-2">
                          <div class="text-center">
                            <PhotoIcon class="mx-auto h-6 w-6 text-gray-300" aria-hidden="true" />
                            <div class="mt-4 flex text-sm leading-6 text-gray-600">
                              <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Faça upload</span>
                                <input ref="fileInput" id="file-upload" name="file-upload" type="file" class="sr-only" />
                              </label>
                              <p class="pl-1">ou arraste e solte uma imagem aqui.</p>
                            </div>
                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF de até 5MB</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 sm:ml-3 sm:w-auto" @click="newPatient">Salvar</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="close" ref="cancelButtonRef">Cancelar</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


