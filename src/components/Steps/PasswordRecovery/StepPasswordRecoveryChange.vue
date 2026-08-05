<template>
  <div>
    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-bold text-gray-800">Altere sua senha</h2>
        <span class="text-gray-600 text-sm">Passo 3 de 4</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 75%"></div>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleChangePassword" class="space-y-4">
      <!-- New Password Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Nova Senha
        </label>
        <div class="relative">
          <input
            v-model="formData.novaSenha"
            :type="showNewPassword ? 'text' : 'password'"
            placeholder="Digite sua senha"
            @input="checkPasswordRequirements"
            class="form-input"
            required
          />
          <button
            type="button"
            @click="showNewPassword = !showNewPassword"
            class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            <i :class="showNewPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" />
          </button>
        </div>

        <!-- Password Requirements -->
        <div class="mt-4 space-y-2">
          <div
            :class="['requirement', { 'met': requirements.minLength }]"
          >
            <i :class="requirements.minLength ? 'pi pi-check' : 'pi pi-times'" />
            <span>No mínimo 8 caracteres</span>
          </div>
          <div :class="['requirement', { 'met': requirements.uppercase }]">
            <i :class="requirements.uppercase ? 'pi pi-check' : 'pi pi-times'" />
            <span>Letras maiúsculas e minúsculas</span>
          </div>
          <div :class="['requirement', { 'met': requirements.numbers }]">
            <i :class="requirements.numbers ? 'pi pi-check' : 'pi pi-times'" />
            <span>Conter números</span>
          </div>
          <div :class="['requirement', { 'met': requirements.special }]">
            <i :class="requirements.special ? 'pi pi-check' : 'pi pi-times'" />
            <span>Caractere especial (@#$!)</span>
          </div>
        </div>
      </div>

      <!-- Confirm Password Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Confirme a nova senha
        </label>
        <div class="relative">
          <input
            v-model="formData.confirmeSenha"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Digite novamente sua senha"
            class="form-input"
            required
          />
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            <i :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" />
          </button>
        </div>
        <div v-if="formData.confirmeSenha && !passwordsMatch" class="error-message">
          As senhas não correspondem
        </div>
      </div>

      <!-- Action Buttons -->
      <button
        type="submit"
        :disabled="!isFormValid"
        class="btn-primary mt-6"
      >
        Criar nova senha
      </button>

      <button
        type="button"
        @click="handleBack"
        class="btn-secondary"
      >
        Voltar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

const emit = defineEmits(['next', 'back'])
const toast = useToast()

const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const formData = ref({
  novaSenha: '',
  confirmeSenha: ''
})

const requirements = ref({
  minLength: false,
  uppercase: false,
  numbers: false,
  special: false
})

const passwordsMatch = computed(() => {
  return formData.value.novaSenha === formData.value.confirmeSenha
})

const isFormValid = computed(() => {
  return (
    requirements.value.minLength &&
    requirements.value.uppercase &&
    requirements.value.numbers &&
    requirements.value.special &&
    passwordsMatch.value
  )
})

const checkPasswordRequirements = () => {
  const password = formData.value.novaSenha

  requirements.value.minLength = password.length >= 8
  requirements.value.uppercase = /[a-z]/.test(password) && /[A-Z]/.test(password)
  requirements.value.numbers = /\d/.test(password)
  requirements.value.special = /[@#$!]/.test(password)
}

const handleChangePassword = async () => {
  if (!isFormValid.value) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha a senha conforme os requisitos',
      life: 3000
    })
    return
  }

  try {
    // Simular mudança de senha com backend
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Senha alterada com sucesso',
      life: 2000
    })

    setTimeout(() => {
      emit('next')
    }, 1500)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao alterar senha',
      life: 3000
    })
  }
}

const handleBack = () => {
  emit('back')
}
</script>

<style scoped>
:deep(.pi) {
  font-size: 0.875rem;
  margin-right: 0.5rem;
}

.requirement i {
  min-width: 1rem;
}
</style>
