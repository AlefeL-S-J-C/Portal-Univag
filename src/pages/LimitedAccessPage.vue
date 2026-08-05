<template>
  <div class="flex-1 flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">
      <!-- Navigation Links -->
      <div class="flex justify-center gap-8 mb-8 text-white text-sm">
        <button class="hover:text-blue-400 transition">Entre em contato</button>
        <span class="text-gray-500">|</span>
        <button class="hover:text-blue-400 transition">Central de ajuda</button>
      </div>

      <!-- Limited Access Card -->
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-auto">
        <!-- Warning Icon -->
        <div class="flex justify-center mb-6">
          <i class="pi pi-exclamation-triangle text-blue-500" style="font-size: 3rem"></i>
        </div>

        <!-- Title -->
        <h1 class="text-2xl font-bold text-gray-800 text-center mb-4">
          Acesso limitado ao portal
        </h1>

        <!-- Message -->
        <p class="text-gray-600 text-center text-sm mb-8 leading-relaxed">
          Você está navegando com acesso limitado! as ferramentas de estudo foram pausadas. 
          Regularize seu financeiro ou solicite a reativação para liberar o acesso.
        </p>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button
            @click="handleAccessPortal"
            class="w-full px-4 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition duration-200"
          >
            Acessar portal
          </button>

          <button
            @click="handleBackToCourses"
            class="w-full px-4 py-3 bg-white text-blue-500 border-2 border-blue-500 rounded-md font-medium hover:bg-blue-50 transition duration-200"
          >
            Voltar
          </button>
        </div>

        <!-- Additional Info -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-gray-600 text-xs text-center">
            Dúvidas sobre sua situação? 
            <span class="text-blue-500 cursor-pointer hover:underline">
              Entre em contato com o financeiro
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const handleAccessPortal = () => {
  toast.add({
    severity: 'info',
    summary: 'Informação',
    detail: 'Entre em contato com o departamento financeiro para resolver sua situação',
    life: 3000
  })
}

const handleBackToCourses = () => {
  router.push('/cursos')
}
</script>

<style scoped>
.pi-exclamation-triangle {
  color: #3b82f6;
}
</style>
