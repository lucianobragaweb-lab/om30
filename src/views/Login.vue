<script setup lang="ts">
import {
  EnvelopeIcon,
  KeyIcon
} from '@heroicons/vue/24/outline'

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
              <form action="#" method="POST" class="space-y-6">
                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                  <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="email" name="email" id="email" class="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="seu@mail.com" />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Senha</label>
                  <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <KeyIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="password" name="password" id="password" class="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Digite sua senha" />
                  </div>
                </div>

                <div class="py-4">
                  <RouterLink to="/" class="flex w-full justify-center rounded-md bg-rose-700 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-800">
                    Entrar
                  </RouterLink>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
      <div class="relative hidden w-0 flex-1 lg:block">
        <img class="absolute inset-0 h-full w-full object-cover" src="/gestor.png" alt="" />
      </div>
    </div>
  </div>
</template>
