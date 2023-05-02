<script setup lang="ts">
import axios from 'axios'
import { ref, computed, reactive, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PhotoIcon } from '@heroicons/vue/24/solid'
// import PatientForm from '../components/forms/PatientForm.vue'
import { required, helpers, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from 'vuex'

const props = defineProps<{
  isOpen: boolean
  patient: Patient
}>()

const emit = defineEmits(['close', 'update'])
const close = () => emit('close')
const update = () => emit('update')

const store = useStore()

const getByCep = async () => {
  const response = await store.dispatch('getByCep', form.value.address?.cep)
  const { bairro, gia, localidade, logradouro, uf, cep } = response

  form.value.address = { bairro, gia, localidade, logradouro, uf, cep }
}

function cpfValidation (cpf) {
  cpf = cpf.replace(/\D/g, '')
  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false
  var result = true;
  [9, 10].forEach(function (j) {
    var soma = 0, r
    cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
      soma += parseInt(e) * ((j + 2) - (i + 1))
    })
    r = soma % 11
    r = (r < 2) ? 0 : 11 - r
    if (r != cpf.substring(j, j + 1)) result = false
  })
  return result
}

const cnsValidation = (s: string) => {
  s = s.replace(/ /g, '')

  if (/^[1-2]\d{10}00[0-1]\d$/.test(s) || /^[7-9]\d{14}$/.test(s)) {
    return somaPonderada(s) % 11 === 0
  }
  return false
}

const somaPonderada = (s: string) => {
  const cs = s.split("")
  let soma = 0
  for (let i = 0; i < cs.length; i++) {
    soma += parseInt(cs[i], 10) * (15 - i)
  }
  return soma
}

const validators = {
  required: helpers.withMessage("Este campo é obrigatório", required),
  validDate: helpers.withParams(
    { type: 'date' },
    (value: string) => !Number.isNaN(Date.parse(value))
  ),
  cnsValidation: helpers.withMessage("CNS inválido", cnsValidation),
  cpfValidation: helpers.withMessage("CPF inválido", cpfValidation)
}

const rules = {
  name: { required: validators.required },
  mother: { required: validators.required },
  birth: {
    required: validators.required, validDate: validators.validDate
  },
  cpf: { required: validators.required, cpfValidation: validators.cpfValidation },
  cns: { required: validators.required, cnsValidation: validators.cnsValidation },
  address: {
    bairro: '',
    cep: { required: validators.required },
    gia: { required: validators.required, numeric },
    localidade: '',
    logradouro: '',
    uf: '',
  }
}

const form = ref<Patient>({
  id: props.patient?.id,
  name: props.patient?.name,
  photo: props.patient?.photo,
  mother: props.patient?.mother,
  birth: new Date(),
  cpf: props.patient?.cpf,
  cns: props.patient?.cns,
  address: props.patient?.address
})

const v$ = useVuelidate(rules, form)

watch(() => props.patient, (newVal) => {
  form.value = newVal
})

const updatePatient = async () => {
  const isValid = await v$.value.$validate()
  console.log(isValid)

  if (!isValid) return

  try {
    axios.put(`/api/patients/${props.patient.id}`, form.value).then(function (response) {
      console.log(response)
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
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Editar Paciente</DialogTitle>
                    <!-- <pre>
                      {{ form }}
                    </pre> -->
                    <!-- {{ form }} -->
                    <!-- {{ v$.$invalid }}
                    <pre>
                      {{ v$ }}
                    </pre> -->
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Preencha o formulário abaixo para atualizar as informações do paciente.</p>
                    </div>
                    <!-- <PatientForm /> -->

                    <div class="pt-2 mt-4 border-t grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                      <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nome completo</label>
                        <input v-model.trim="v$.name.$model" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'ring-red-600 focus:ring-red-600': v$.name.$error }" />
                        <div v-if="v$.name.$error" class="text-red-600">{{ v$.name.$errors[0].$message }}</div>
                      </div>

                      <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nome da mãe</label>
                        <input v-model.trim="v$.mother.$model" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'ring-red-600 focus:ring-red-600': v$.mother.$error }" />
                        <div v-if="v$.mother.$error" class="text-red-600">{{ v$.mother.$errors[0].$message }}</div>
                      </div>

                      <div class="sm:col-span-2">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Data de nascimento</label>
                        <input v-model.trim="v$.birth.$model" type="date" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'ring-red-600 focus:ring-red-600': v$.birth.$error }" />
                        <div v-if="v$.birth.$error" class="text-red-600">{{ v$.birth.$errors[0].$message }}</div>
                      </div>

                      <div class="sm:col-span-2">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">CPF</label>
                        <input v-model.trim="v$.cpf.$model" v-mask="'###.###.###-##'" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'ring-red-600 focus:ring-red-600': v$.cpf.$error }" />
                        <div v-if="v$.cpf.$error" class="text-red-600">{{ v$.cpf.$errors[0].$message }}</div>
                      </div>

                      <div class="sm:col-span-2">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">CNS</label>
                        <input v-model.trim="v$.cns.$model" v-mask="'### #### #### ####'" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'ring-red-600 focus:ring-red-600': v$.cns.$error }" />
                        <div v-if="v$.cns.$error" class="text-red-600">{{ v$.cns.$errors[0].$message }}</div>
                      </div>

                      <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">CEP</label>
                        <input v-model.trim="v$.address.cep.$model" v-mask="'#####-###'" @input="getByCep" type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'ring-red-600 focus:ring-red-600': v$.address.cep.$error }" />
                        <div v-if="v$.address.cep.$error" class="text-red-600">{{ v$.address.cep.$errors[0].$message }}</div>
                      </div>

                      <div class="col-span-4">
                        <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Logradouro</label>
                        <input v-model.trim="v$.address.logradouro.$model" disabled type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'ring-red-600 focus:ring-red-600': v$.address?.logradouro.$error }" />
                        <div v-if="v$.address.logradouro.$error" class="text-red-600">{{ v$.address.logradouro.$errors[0].$message }}</div>
                      </div>

                      <div class="col-span-2">
                        <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">N</label>
                        <input v-model.trim="v$.address.gia.$model" type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'ring-red-600 focus:ring-red-600': v$.address?.gia.$error }" />
                        <div v-if="v$.address.gia.$error" class="text-red-600">{{ v$.address.gia.$errors[0].$message }}</div>
                      </div>

                      <div class="sm:col-span-2">
                        <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Cidade</label>
                        <input v-model.trim="v$.address.localidade.$model" disabled type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'ring-red-600 focus:ring-red-600': v$.address?.localidade.$error }" />
                        <div v-if="v$.address.localidade.$error" class="text-red-600">{{ v$.address.localidade.$errors[0].$message }}</div>
                      </div>

                      <div class="sm:col-span-2">
                        <label for="region" class="block text-sm font-medium leading-6 text-gray-900">Estado</label>
                        <input v-model.trim="v$.address.uf.$model" disabled type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :class="{ 'ring-red-600 focus:ring-red-600': v$.address?.uf.$error }" />
                        <div v-if="v$.address.uf.$error" class="text-red-600">{{ v$.address.uf.$errors[0].$message }}</div>
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
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 sm:ml-3 sm:w-auto" @click="updatePatient">Salvar</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="close" ref="cancelButtonRef">Cancelar</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


