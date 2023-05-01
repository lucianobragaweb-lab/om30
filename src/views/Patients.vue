<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

import {
  PlusIcon,
  CalendarIcon,
  TrashIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/vue/24/outline'

import NewPatient from '../components/NewPatientModal.vue'
import ShowPatient from '../components/ShowPatientModal.vue'
import EditPatient from '../components/EditPatientModal.vue'
import DeletePatient from '../components/DeletePatientModal.vue'

const newPatientOpen = ref(false)
const showPatientOpen = ref(false)
const editPatientOpen = ref(false)
const deletePatientOpen = ref(false)

const patients = ref<Patient[]>()
const patient = ref<Patient>()
const isLoading = ref(true)

const getPatients = () => {
  isLoading.value = true
  axios.get('api/patients').then(res => {
    patients.value = res.data.patients
  })
}

const getPatient = async (id: number) => {
  try {
    axios.get(`api/patients/${id}`).then(res => {
      console.log(res.data.patient)
      patient.value = res.data.patient
    })
  } catch (error) {
    console.error(error)
  }
}

const edit = async (id: number) => {
  await getPatient(id)
  editPatientOpen.value = true
}

const show = async (id: number) => {
  await getPatient(id)
  showPatientOpen.value = true
}

const destroy = async (id: number) => {
  await getPatient(id)
  deletePatientOpen.value = true
}

const removePatient = (id: number) => {
  isLoading.value = true
  axios.delete(`api/patients/${id}`).then(res => {
    getPatients()
    deletePatientOpen.value = false
  })
}

onMounted(() => {
  getPatients()
  console.log('mounted in the composition api!')
})

</script>

<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Pacientes</h1>
        <p class="mt-2 text-sm text-gray-700">Uma lista dos pacientes cadastrados.</p>
      </div>
      <NewPatient :isOpen="newPatientOpen" @close="newPatientOpen = false" @update="getPatients" />
      <ShowPatient :isOpen="showPatientOpen" @close="showPatientOpen = false" :patient="patient" />
      <EditPatient :isOpen="editPatientOpen" @close="editPatientOpen = false" :patient="patient" />
      <DeletePatient :isOpen="deletePatientOpen" @close="deletePatientOpen = false" @destroy="removePatient" :patient="patient" />

      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button @click="newPatientOpen = true" type="button" class="block flex rounded-md bg-rose-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
          <PlusIcon class="h-5 w-5 mr-3" aria-hidden="true" />
          Novo Paciente
        </button>
      </div>
    </div>

    <div v-if="patients?.length" class="mt-8 flow-root border rounded-lg">
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
              <tr v-for="patient in patients" :key="patient.cpf">
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                  <div class="flex items-center">
                    <div class="h-11 w-11 flex-shrink-0">
                      <img class="h-11 w-11 rounded-full" :src="patient.photo" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">{{ patient.name }}</div>
                      <div class="mt-1 text-gray-500">{{ patient.address }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">
                    <span class="inline-flex items-center rounded bg-rose-50 px-1 py-.5 text-xs text-rose-700 ring-1 ring-inset ring-rose-600/20">CPF</span>
                    {{ patient.cpf }}
                  </div>
                  <div class="mt-1 text-gray-500">
                    <span class="inline-flex items-center rounded bg-rose-50 px-1 py-.5 text-xs text-rose-700 ring-1 ring-inset ring-rose-600/20">CNS</span>
                    {{ patient.cns }}
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="flex align-center">
                    <CalendarIcon class="h-5 w-5 mr-2" aria-hidden="true" /> {{ patient.birth }}
                  </div>
                  <div class="mt-1 text-gray-500">
                    <span class="inline-flex items-center rounded bg-rose-50 px-1 py-.5 text-xs text-rose-700 ring-1 ring-inset ring-rose-600/20">Mãe</span>
                    {{ patient.mother }}
                  </div>
                </td>
                <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                  <span class="isolate inline-flex rounded-md shadow-sm">
                    <button @click="show(patient.id)" type="button" class="relative inline-flex items-center rounded-l-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                      <EyeIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button @click="edit(patient.id)" type="button" class="relative -ml-px inline-flex items-center bg-white px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                      <PencilIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button @click="destroy(patient.id)" type="button" class="relative -ml-px inline-flex items-center rounded-r-md px-2 py-1 text-sm font-semibold text-white ring-1 ring-inset bg-rose-600 ring-rose-500 hover:bg-rose-500 focus:z-10">
                      <TrashIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <button @click="newPatientOpen = true" v-else type="button" class="relative block mt-4 w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6" />
      </svg>
      <h3 class="mt-2 text-sm font-semibold text-gray-900">Nenhum Paciente cadastrado</h3>
      <p class="mt-1 text-sm text-gray-500">Comece criando um novo paciente.</p>
    </button>
  </div>
</template>
