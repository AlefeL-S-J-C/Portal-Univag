<template>
  <div class="text-center">
    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-bold text-gray-800">Senha Alterada com Sucesso!</h2>
        <span class="text-gray-600 text-sm">Passo 4 de 4</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 100%"></div>
      </div>
    </div>

    <!-- Success Content -->
    <div class="py-8">
      <!-- Success Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 flex items-center justify-center rounded-lg">
          <i class="pi pi-check-circle text-blue-500" style="font-size: 3rem"></i>
        </div>
      </div>

      <!-- Success Message -->
      <h3 class="text-2xl font-bold text-gray-800 mb-4">
        Senha Alterada com Sucesso!
      </h3>

      <p class="text-gray-600 text-sm mb-8">
        Você já pode acessar o portal com suas novas credenciais.
      </p>

      <!-- Action Button -->
      <button
        @click="handleReturnToLogin"
        class="btn-secondary max-w-xs mx-auto mb-4"
      >
        Retornar ao login
      </button>

      <!-- Redirect Message -->
      <p class="text-gray-500 text-sm">
        Redirecionando em {{ countdown }} segundos...
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(10)
let intervalId

onMounted(() => {
  intervalId = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      handleReturnToLogin()
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const handleReturnToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.pi-check-circle {
  color: #3b82f6;
}
</style>
