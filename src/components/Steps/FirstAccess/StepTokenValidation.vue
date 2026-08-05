<template>
  <div>
    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-bold text-gray-800">Validação do Token</h2>
        <span class="text-gray-600 text-sm">Passo 2 de 4</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 50%"></div>
      </div>
    </div>

    <!-- Subtitle -->
    <p class="text-gray-600 mb-6 text-center text-sm">
      Enviamos um código de verificação de 6 dígitos em seu email registrado
    </p>

    <!-- Form -->
    <form @submit.prevent="handleVerify" class="space-y-4">
      <!-- Token Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Código de verificação
        </label>
        <input
          v-model="formData.token"
          type="text"
          placeholder="000-000"
          @input="formatToken"
          class="form-input text-center text-lg tracking-widest"
          maxlength="7"
          required
        />
      </div>

      <!-- Resend Link -->
      <p class="text-blue-500 text-xs hover:underline cursor-pointer text-center">
        Reenviar código em 00:59
      </p>

      <!-- Action Buttons -->
      <button type="submit" class="btn-primary mt-6">
        Verifique e continue
      </button>

      <button
        type="button"
        @click="handleBack"
        class="btn-secondary"
      >
        Cancelar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const emit = defineEmits(['next', 'back'])
const toast = useToast()

const formData = ref({
  token: ''
})

const formatToken = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length > 0) {
    value = value.substring(0, 6).replace(/(\d{3})(\d{0,3})/, '$1-$2')
  }
  formData.value.token = value
}

const handleVerify = async () => {
  if (!formData.value.token || formData.value.token.length < 7) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Digite os 6 dígitos do código',
      life: 3000
    })
    return
  }

  try {
    // Simular validação com backend
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Token validado com sucesso',
      life: 2000
    })

    setTimeout(() => {
      emit('next')
    }, 1500)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Código inválido ou expirado',
      life: 3000
    })
  }
}

const handleBack = () => {
  emit('back')
}
</script>

<style scoped>
input::placeholder {
  letter-spacing: 0.1em;
}
</style>
