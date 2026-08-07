<template>
  <!-- Overlay desfocado que aparece quando modal está aberto -->
  <transition name="fade">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <!-- Modal Card - não fecha ao clicar nele -->
      <div 
        class="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative"
        @click.stop
      >
        <!-- Botão Fechar (X) -->
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <i class="pi pi-times text-xl"></i>
        </button>

        <!-- Ícone de suporte -->
        <div class="flex justify-center mb-4">
          <div class="bg-[#073C87] rounded-full p-4 flex items-center justify-center">
            <i class="pi pi-headphones text-white text-2xl"></i>
          </div>
        </div>

        <!-- Título -->
        <h2 class="text-xl font-bold text-center text-gray-900 mb-2">
          Central de Atendimento ao Estudante (CAE)
        </h2>

        <!-- Descrição -->
        <p class="text-sm text-gray-600 text-center mb-6">
          Estamos aqui para ajudar. Entre em contato com nossa equipe para tirar suas dúvidas e receber atendimento.
        </p>

        <!-- Seção Telefone -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <p class="text-xs text-gray-500 font-semibold mb-2">ENTRE EM CONTATO</p>
          <div class="space-y-2">
            <div v-for="phone in phones" :key="phone.number" class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <i class="pi pi-phone text-blue-600"></i>
                <span class="font-semibold text-gray-900">{{ phone.display }}</span>
              </div>
              <button 
                @click="callCAE(phone.number)"
                class="bg-[#073C87] hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition text-sm flex items-center gap-1"
              >
                <i class="pi pi-phone text-sm"></i>
                Ligar
              </button>
            </div>
          </div>
        </div>

        <!-- Seção Horário de Atendimento -->
        <div class="mb-6">
          <div class="flex items-center gap-2 mb-3">
            <i class="pi pi-clock text-gray-700"></i>
            <h3 class="font-semibold text-gray-900">Horários de Atendimento</h3>
          </div>
          
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Segunda à sexta-feira</span>
              <span class="font-semibold text-gray-900">08h às 22h</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Sábado</span>
              <span class="font-semibold text-gray-900">08h às 12h</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Domingo e feriados</span>
              <span class="font-semibold text-red-600">Fechado</span>
            </div>
          </div>
        </div>

        <!-- Texto informativo -->
        <p class="text-xs text-gray-500 text-center mb-4">
          Nossa equipe está pronta para atender você.
        </p>

        <!-- Botão Fechar -->
        <button 
          @click="closeModal"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded transition"
        >
          Fechar
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

// Array de telefones - EDITE AQUI
const phones = ref([
  { display: '(65) 3688-6101', number: '6536886101' },
  { display: '(65) 3688-6080', number: '6536886080' },
  { display: '(65) 9648-4328', number: '6596484328' }
])

const closeModal = () => {
  emit('close')
}

const callCAE = (phone) => {
  window.location.href = `tel:+55${phone}`
}
</script>

<style scoped>
/* Transição suave do overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>