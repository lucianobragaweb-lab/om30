<template>
  <button :type="type" :disabled="disabled" class="flex w-full justify-center rounded-md bg-rose-700 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-800">
    <slot>Entrar</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type: 'submit' | 'button' | 'reset',
  disabled: boolean
}>()
</script>
