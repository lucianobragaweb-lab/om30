<template>
  <component :is="iconComponent" :class="iconClasses" aria-hidden="true" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { KeyIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'

interface Props {
  name: string
}

const props = defineProps<Props>()

const iconMap: Record<string, any> = {
  KeyIcon,
  EnvelopeIcon
}

const iconComponent = computed(() => {
  return iconMap[props.name] || null
})

const iconClasses = 'h-5 w-5 text-gray-400'
</script>
