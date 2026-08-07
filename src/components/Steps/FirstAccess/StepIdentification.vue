<template>
 <div class="flex flex-col h-full w-full pt-3">
    <div class="absolute top-0 left-0 w-full">
      <div class="progress-bar rounded-none rounded-t-lg h-2">
        <div class="progress-fill" style="width: 25%"></div>
      </div>
      <div class="w-full text-right px-8 pt-1">
        <span class="text-gray-500 text-xs font-medium">Passo 1 de 4</span>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 text-center">Identifique-se</h2>
    <!-- Subtitle -->
    <p class="text-gray-600 mb-20 text-center">
      Por favor, preencha os campos
    </p>

    <!-- Form -->
    <form @submit.prevent="handleContinue" class="flex flex-col flex-1">
      <!-- CPF Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">CPF</label>
        <input
          v-model="formData.cpf"
          type="text"
          placeholder="000.000.000-00"
          @input="formatCPF"
          class="form-input"
          required
        />
      </div>

      <!-- Matricula Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Matrícula</label>
        <input
          v-model="formData.matricula"
          type="text"
          placeholder="#0987654321"
          class="form-input"
          required
        />
      </div>

      <!-- Action Buttons -->
      <button type="submit" class="btn-primary mt-28">
        Continuar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const emit = defineEmits(['next'])
const toast = useToast()

const formData = ref({
  cpf: '',
  matricula: ''
})

const formatCPF = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  formData.value.cpf = value
}

const handleContinue = async () => {
  if (!formData.value.cpf || !formData.value.matricula) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha todos os campos obrigatórios',
      life: 3000
    })
    return
  }

  try {
    // Simular validação com backend
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Dados validados com sucesso',
      life: 2000
    })

    setTimeout(() => {
      emit('next')
    }, 1500)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao validar dados',
      life: 3000
    })
  }
}
</script>

<style scoped>
/* Step-specific styles */
</style>
