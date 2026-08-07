<template>
  <!-- Overlay com blur -->
  <div v-if="isOpen" class="fixed inset-0 z-40 backdrop-blur-sm bg-black/20" @click="closeModal"></div>

  <!-- Modal -->
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <div class="flex items-center gap-2">
          <i class="pi pi-question-circle text-blue-600 text-xl"></i>
          <h2 class="text-lg font-bold text-gray-800">Central de Ajuda</h2>
        </div>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <!-- Subtitle -->
      <p class="px-6 pt-4 text-sm text-gray-600">
        Encontre rapidamente respostas para suas dúvidas sobre o Portal do Aluno.
      </p>

      <!-- Search -->
      <div class="px-6 py-4">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="O que você está procurando?" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <!-- FAQ Items -->
      <div class="px-6 pb-6">
        <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <i class="pi pi-star-fill text-yellow-500"></i>
          DÚVIDAS FREQUENTES
        </h3>

        <div class="space-y-3">
          <div 
            v-for="(item, index) in faqs"
            :key="index"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button 
              @click="toggleFAQ(index)"
              class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div class="flex items-center gap-3 text-left">
                <i :class="item.icon" class="text-lg" :style="{ color: item.color }"></i>
                <span class="text-sm font-medium text-gray-700">{{ item.title }}</span>
              </div>
              <i :class="expandedFAQ === index ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-gray-500"></i>
            </button>
            <div v-if="expandedFAQ === index" class="px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- No results message -->
      <div v-if="!faqs.length" class="px-6 py-8 text-center">
        <p class="text-gray-500 text-sm mb-4">Não encontrou o que procurava?</p>
        <p class="text-gray-600 text-sm mb-4">Entre em contato com nossa equipe para receber ajuda</p>
        <button @click="$emit('contact')" class="w-full btn-primary">
          Entre em contato
        </button>
      </div>

      <!-- Contact button at bottom -->
      <div v-else class="px-6 py-4 border-t bg-gray-50">
        <p class="text-sm text-gray-600 mb-3">Não encontrou o que procurava?</p>
        <button @click="$emit('contact')" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition">
          Entre em contato
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'contact'])

const searchQuery = ref('')
const expandedFAQ = ref(0)

const allFAQs = [
  {
    title: 'Como consultar minhas notas?',
    answer: 'Acesse a seção "Notas e Faltas" no menu principal. Lá você encontrará todas as notas de suas disciplinas organizadas por período.',
    icon: 'pi pi-star',
    color: '#8b5cf6'
  },
  {
    title: 'Como consultar minhas faltas?',
    answer: 'Vá para "Notas e Faltas" no menu e você terá acesso ao relatório de presença de todas as suas disciplinas.',
    icon: 'pi pi-times-circle',
    color: '#ef4444'
  },
  {
    title: 'Como visualizar meu horário acadêmico?',
    answer: 'Clique em "Horário" no menu principal para visualizar seu calendário de aulas.',
    icon: 'pi pi-calendar',
    color: '#06b6d4'
  },
  {
    title: 'Como acessar o Portal AVA?',
    answer: 'O Portal AVA está integrado ao Portal do Aluno. Procure pela seção "Portal AVA" para acessar suas disciplinas online.',
    icon: 'pi pi-book',
    color: '#3b82f6'
  },
  {
    title: 'Como consultar minhas mensalidades?',
    answer: 'Acesse "Financeiro" no menu para visualizar seus boletos e histórico de pagamentos.',
    icon: 'pi pi-wallet',
    color: '#10b981'
  },
  {
    title: 'Como consultar minhas pendências?',
    answer: 'Vá para "Pendências" no menu para ver se há alguma documentação ou informação faltando em seu cadastro.',
    icon: 'pi pi-exclamation-triangle',
    color: '#f59e0b'
  }
]

const faqs = computed(() => {
  if (!searchQuery.value.trim()) {
    return allFAQs
  }
  return allFAQs.filter(faq =>
    faq.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleFAQ = (index) => {
  expandedFAQ.value = expandedFAQ.value === index ? -1 : index
}

const closeModal = () => {
  searchQuery.value = ''
  expandedFAQ.value = 0
  emit('close')
}
</script>

<style scoped>
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition;
}
</style>
