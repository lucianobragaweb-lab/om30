<script setup lang="ts">
import {
  PlusIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline'

import NewPatient from '../components/NewPatientModal.vue'

const people = [
  {
    photo:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: 'Maria da silva melo',
    mother: 'Joana da silva melo',
    birth: '25/12/2020',
    cpf: '052.188.328-25',
    cns: '052.188.328-25',
    address: 'Rua das pedras, 25, pereiros, Meruoca-CE, 125-458-000'
  },
  // More people...
]
</script>

<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Pacientes</h1>
        <p class="mt-2 text-sm text-gray-700">Uma lista dos pacientes cadastrados.</p>
      </div>
      <NewPatient />
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" class="block flex rounded-md bg-rose-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
          <PlusIcon class="h-5 w-5 mr-3" aria-hidden="true" />
          Novo Paciente
        </button>
      </div>
    </div>

    <div class="mt-8 flow-root border rounded-lg">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Paciente</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Documentos</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nascimento e Filiação</th>
                <th scope="col" class="px-3 py-3.5 pr-4 text-right text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="person in people" :key="person.cpf">
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                  <div class="flex items-center">
                    <div class="h-11 w-11 flex-shrink-0">
                      <img class="h-11 w-11 rounded-full" :src="person.photo" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">{{ person.name }}</div>
                      <div class="mt-1 text-gray-500">{{ person.address }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">
                    <span class="inline-flex items-center rounded bg-rose-50 px-1 py-.5 text-xs text-rose-700 ring-1 ring-inset ring-rose-600/20">CPF</span>
                    {{ person.cpf }}
                  </div>
                  <div class="mt-1 text-gray-500">
                    <span class="inline-flex items-center rounded bg-rose-50 px-1 py-.5 text-xs text-rose-700 ring-1 ring-inset ring-rose-600/20">CNS</span>
                    {{ person.cns }}
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="flex align-center">
                    <CalendarIcon class="h-5 w-5 mr-2" aria-hidden="true" /> {{ person.birth }}
                  </div>
                  <div class="mt-1 text-gray-500">
                    <span class="inline-flex items-center rounded bg-rose-50 px-1 py-.5 text-xs text-rose-700 ring-1 ring-inset ring-rose-600/20">Mãe</span>
                    {{ person.mother }}
                  </div>
                </td>
                <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
