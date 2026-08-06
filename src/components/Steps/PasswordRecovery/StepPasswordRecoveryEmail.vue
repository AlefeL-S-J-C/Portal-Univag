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

    <div class="flex-4 flex flex-col justify-start pt-10">

      <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">
        Recuperação de Senha
      </h2>

      <p class="text-gray-600 mb-16 text-justify text-lg">
        Informe e-mail cadastrado para receber o código de recuperação.
      </p>

      <form @submit.prevent="handleContinue" class="flex flex-col flex-1">
        <div>
          <label class="block text-md font-medium text-gray-700 mb-2">E-mail</label>
          <input v-model="formData.email" type="email" placeholder="nomesobrenome@gmail.com" class="form-input"
            required />
        </div>

        <button type="submit" class="btn-primary mt-12">
          Continuar
        </button>
  

      <button type="button" @click="handleReturnToLogin" class="btn-tertiary mt-4">
        Voltar ao Login
      </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const emit = defineEmits(['next'])
const toast = useToast()
const router = useRouter()

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

const handleReturnToLogin = () => {
  router.push('/login')
}
</script>
<style scoped>
/* Styles específicos do componente */
</style>