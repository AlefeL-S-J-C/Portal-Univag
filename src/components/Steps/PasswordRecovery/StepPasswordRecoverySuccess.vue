<template>
  <div class="flex flex-col h-full w-full pt-3">
    <!-- Barra superior -->
    <div class="absolute top-0 left-0 w-full">
      <div class="progress-bar rounded-none rounded-t-lg h-2">
        <div class="progress-fill" style="width: 100%"></div>
      </div>
      <div class="w-full text-right px-8 pt-1">
        <span class="text-gray-500 text-xs font-medium">Passo 4 de 4</span>
      </div>
    </div>

    <!-- Container principal ocupando o resto da tela -->
    <div class="flex-1 flex flex-col justify-start pt-10 pb-6 text-center">
      
      <!-- Container do Ícone e Textos centralizados -->
      <div class="flex flex-col items-center justify-center flex-1 mt-6">
        <!-- Success Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 flex items-center justify-center rounded-lg">
            <i class="pi pi-check-circle text-blue-500" style="font-size: 3.5rem"></i>
          </div>
        </div>

        <!-- Success Message -->
        <h3 class="text-2xl font-bold text-gray-800 mb-4">
          Senha Alterada com Sucesso!
        </h3>

        <p class="text-gray-600 text-sm px-4">
          Você já pode acessar o portal com suas novas credenciais.
        </p>
      </div>

      <!-- Container do Botão fixo no fundo da tela -->
      <div class="mt-auto flex flex-col gap-3 items-center w-full">
        <button @click="handleReturnToLogin" class="btn-secondary w-full max-w-xs">
          Retornar ao login
        </button>

        <p class="text-gray-500 text-sm">
          Redirecionando em {{ countdown }} segundos...
        </p>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(10)
let intervalId

// Se quiser que redirecione sozinho sem o usuário clicar, é só descomentar o bloco abaixo:
// onMounted(() => {
//   intervalId = setInterval(() => {
//     countdown.value--
//     if (countdown.value <= 0) {
//       handleReturnToLogin()
//     }
//   }, 1000)
// })

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const handleReturnToLogin = () => {
  if (intervalId) clearInterval(intervalId)
  router.push('/login')
}
</script>

<style scoped>
.pi-check-circle {
  color: #3b82f6;
}
</style>