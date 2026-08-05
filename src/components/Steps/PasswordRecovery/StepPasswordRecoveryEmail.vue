<template>
  <div>
    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-bold text-gray-800">Recuperação de Senha</h2>
        <span class="text-gray-600 text-sm">Passo 1 de 4</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 25%"></div>
      </div>
    </div>

    <!-- Subtitle -->
    <p class="text-gray-600 mb-6 text-center text-sm">
      Informe e-mail cadastrado para receber o código de recuperação.
    </p>

    <!-- Form -->
    <form @submit.prevent="handleContinue" class="space-y-4">
      <!-- Email Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
        <input
          v-model="formData.email"
          type="email"
          placeholder="nomesobrenome@gmail.com"
          class="form-input"
          required
        />
      </div>

      <!-- Action Button -->
      <button type="submit" class="btn-primary mt-6">
        Continuar
      </button>
    </form>

    <!-- Back Link -->
    <div class="mt-6 text-center">
      <router-link to="/login" class="text-blue-500 text-sm hover:underline">
        Voltar para login
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const emit = defineEmits(['next'])
const toast = useToast()

const formData = ref({
  email: ''
})

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleContinue = async () => {
  if (!formData.value.email) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha o campo de e-mail',
      life: 3000
    })
    return
  }

  if (!validateEmail(formData.value.email)) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Digite um e-mail válido',
      life: 3000
    })
    return
  }

  try {
    // Simular busca e envio de código
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Código enviado para seu e-mail',
      life: 2000
    })

    setTimeout(() => {
      emit('next')
    }, 1500)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'E-mail não encontrado no sistema',
      life: 3000
    })
  }
}
</script>

<style scoped>
/* Styles específicos do componente */
</style>
