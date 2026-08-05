<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Portal do Aluno UNIVAG</h1>
          <p class="text-sm text-gray-600">{{ selectedCourse?.name || 'Dashboard' }}</p>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-gray-600 text-sm">{{ userName }}</span>
          <button
            @click="handleLogout"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
      <!-- Welcome Card -->
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">
          Bem-vindo ao Portal!
        </h2>
        <p class="text-gray-600">
          Você está acessando o curso: <strong>{{ selectedCourse?.name }}</strong>
        </p>
      </div>

      <!-- Course Info Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Course Details -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Informações do Curso</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Semestre:</span>
              <span class="font-semibold text-gray-800">{{ selectedCourse?.semester }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Turno:</span>
              <span class="font-semibold text-gray-800">{{ selectedCourse?.shift }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Código:</span>
              <span class="font-semibold text-gray-800">{{ selectedCourse?.code }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Status:</span>
              <span
                :class="[
                  'px-3 py-1 rounded text-white text-xs font-semibold',
                  selectedCourse?.status === 'ativa'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                ]"
              >
                {{ selectedCourse?.status === 'ativa' ? 'Ativo' : 'Trancado' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Ações Rápidas</h3>
          <div class="space-y-3">
            <button
              class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-left"
            >
              <i class="pi pi-book mr-2"></i>
              Aulas
            </button>
            <button
              class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-left"
            >
              <i class="pi pi-file mr-2"></i>
              Materiais
            </button>
            <button
              class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-left"
            >
              <i class="pi pi-check-square mr-2"></i>
              Atividades
            </button>
            <button
              @click="handleBackToCourses"
              class="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition text-left"
            >
              <i class="pi pi-arrow-left mr-2"></i>
              Voltar à seleção de cursos
            </button>
          </div>
        </div>
      </div>

      <!-- Announcements -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          <i class="pi pi-bell mr-2"></i>
          Avisos
        </h3>
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p class="text-gray-700">
            Bem-vindo ao portal! Este é um ambiente de simulação. 
            Explore os recursos disponíveis.
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white text-center py-4 border-t border-gray-200 mt-auto">
      <p class="text-gray-600 text-sm">
        © Copyright 2026 - Portal do Aluno - Sistemas UNIVAG
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const userName = ref('Usuário')
const selectedCourse = ref(null)

onMounted(() => {
  // Carrega dados do usuário
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser)
      userName.value = user.nome || 'Usuário'
    } catch (e) {
      console.error('Erro ao carregar dados do usuário', e)
    }
  }

  // Carrega curso selecionado
  const storedCourse = localStorage.getItem('selectedCourse')
  if (storedCourse) {
    try {
      selectedCourse.value = JSON.parse(storedCourse)
    } catch (e) {
      console.error('Erro ao carregar curso', e)
      router.push('/cursos')
    }
  } else {
    router.push('/cursos')
  }

  // Verificar autenticação
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  }
})

const handleBackToCourses = () => {
  router.push('/cursos')
}

const handleLogout = () => {
  // Limpar dados armazenados
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('selectedCourse')

  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Logout realizado com sucesso',
    life: 2000
  })

  // Redirecionar para login
  setTimeout(() => {
    router.push('/login')
  }, 1500)
}
</script>

<style scoped>
button i {
  display: inline;
}
</style>
