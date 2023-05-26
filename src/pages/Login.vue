<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useStore } from 'vuex'

import {
  EnvelopeIcon,
  KeyIcon
} from '@heroicons/vue/24/outline'

import Button from '@/components/atoms/Button.vue'
import FormInput from '@/components/atoms/FormInput.vue'
import LoginBanner from '@/components/LoginBanner.vue'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const saveUser = (user: User) => store.dispatch('saveUser', user)

const doLogin = async () => {
  isLoading.value = true
  try {
    const response = await axios.post('/api/login', {
      email: email.value,
      password: password.value
    })
    saveUser(response.data.user)
    router.push({ name: 'home' })
    console.log(response)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <div class="h-full">
    <div class="flex min-h-full flex-1">
      <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img class="h-10 w-auto" src="/logo.png" alt="OM30" />
            <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Faça login em sua conta</h2>
          </div>

          <div class="mt-10">
            <div>
              <form @submit.prevent="doLogin()" class="space-y-6">
                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                  <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <FormInput type="email" icon="EnvelopeIcon" name="email" placeholder="seu@mail.com" v-model="email" />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Senha</label>
                  <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <KeyIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <FormInput type="password" icon="KeyIcon" name="password" placeholder="Digite sua senha" v-model="password" />
                  </div>
                </div>

                <div class="py-4">
                  <Button type="submit" :disabled="isLoading">Entrar</Button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
      <LoginBanner />
    </div>
  </div>
</template>
