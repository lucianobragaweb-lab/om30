<script setup lang="ts">
import { ref, watch } from 'vue'
import { PhotoIcon } from '@heroicons/vue/24/solid'

const patient = ref<Patient>({
  photo:
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  name: 'Maria da silva braga',
  mother: 'Joana da silva braga',
  birth: new Date('2020-10-25'),
  cpf: '052.188.324-25',
  cns: '052.188.338-25',
  address: 'Rua das pedras, 25, pereiros, Meruoca-CE, 125-458-000'
})

const emit = defineEmits(['update'])
const update = () => emit('update', patient.value)

</script>

<template>
  <form>
    <div class="pt-2 mt-4 border-t grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nome completo</label>
        <input v-model="patient.name" @input="update" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>

      <div class="sm:col-span-3">
        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nome da mãe</label>
        <input v-model="patient.mother" @input="update" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>

      <div class="sm:col-span-2">
        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Data de nascimento</label>
        <input v-model="patient.birth" @input="update" type="date" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>

      <div class="sm:col-span-2">
        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">CPF</label>
        <input v-model="patient.cpf" @input="update" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>

      <div class="sm:col-span-2">
        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">CNS</label>
        <input v-model="patient.cns" @input="update" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                <input id="file-upload" name="file-upload" type="file" class="sr-only" />
              </label>
              <p class="pl-1">ou arraste e solte uma imagem aqui.</p>
            </div>
            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF de até 5MB</p>
          </div>
        </div>
      </div>

    </div>
  </form>
</template>


