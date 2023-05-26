<template>
  <div class="relative">
    <input :type="type" :name="name" v-model="val" :class="inputClasses" :placeholder="placeholder" />
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <Icon :name="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import Icon from './Icon.vue'

interface Props {
  type: string,
  icon: string,
  name: string,
  placeholder: string,
  modelValue: any
}

const props = defineProps<Props>()

const {
  type,
  icon,
  name,
  placeholder,
  modelValue
} = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const val = computed({
  get () {
    return modelValue.value
  },
  set (val) {
    emit('update:modelValue', val)
  }
})

const inputClasses = 'block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
</script>

<style scoped>
input {}
</style>
