<template>
  <div
    @click="$emit('select')"
    :class="[
      'p-4 rounded-lg cursor-pointer transition-all duration-200 border-2',
      isSelected
        ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
        : 'bg-blue-100 text-gray-800 border-blue-200 hover:border-blue-400 hover:shadow-md'
    ]"
  >
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <h3 class="font-bold mb-1">{{ course.name }}</h3>
        <p :class="isSelected ? 'text-blue-100' : 'text-gray-600'" class="text-sm">
          {{ course.semester }}, {{ course.turn }}, {{ course.matricula }}
        </p>
        <p :class="isSelected ? 'text-blue-100' : 'text-gray-600'" class="text-sm">
          {{ course.modality }}
        </p>
      </div>
      
      <!-- Status Badge -->
      <span
        :class="[
          'px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ml-4',
          course.status === 'ativa'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        ]"
      >
        {{ course.status === 'ativa' ? 'ativa' : 'Trancada' }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  course: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])
</script>

<style scoped>
/* Styles específicos do componente */
</style>
