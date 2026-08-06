<template>
  <header class="w-full mt-6 flex justify-center gap-8 py-4 flex-shrink-0"> 
        
      <button class="text-white hover:text-blue-400 transition pb-1 font-regular text-sm md:text-base "
        :class="activeTab === 'portal' ? 'border-blue-400 text-blue-400' : 'border-transparent'"
        @click="activeTab = 'portal'">
        Entre em contato
      </button>

        <img src="../images/logo-univag.png" alt="Logo Univag" class="h-10 md:h-12">

      <button class="text-white hover:text-blue-400 transition pb-1 font-regular text-sm md:text-base border-b-2"
        :class="activeTab === 'help' ? 'border-blue-400 text-blue-400' : 'border-transparent'"
        @click="activeTab = 'help'">
        Central de ajuda
      </button>

  </header>

  <div class="flex-1 flex items-center justify-center p-4">
    <div class="w-full max-w-3xl">
      <!-- Courses Selection Card -->
      <div class="bg-white rounded-lg shadow-2xl p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <i class="pi pi-users text-blue-500" style="font-size: 2.5rem"></i>
          </div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Seleção de Cursos</h1>
          <p class="text-gray-600 text-sm">
            Por favor, selecione o curso que deseja acessar.
          </p>
        </div>

        <!-- Courses List -->
        <div class="space-y-4 mb-8">
          <div
            v-for="course in courses"
            :key="course.id"
            @click="selectCourse(course)"
            :class="[
              'p-4 rounded-lg cursor-pointer transition duration-200 border-2',
              selectedCourse?.id === course.id
                ? 'bg-blue-500 border-blue-600 text-white'
                : 'bg-blue-50 border-transparent text-gray-800 hover:bg-blue-100'
            ]"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-bold text-lg">{{ course.name }}</h3>
                <p class="text-sm opacity-90">
                  X °{{ course.semester }}, {{ course.shift }}, {{ course.code }}
                </p>
                <p class="text-sm opacity-90">{{ course.modality }}</p>
              </div>
              <div class="flex gap-2">
                <span
                  v-if="course.status === 'ativa'"
                  class="px-3 py-1 rounded text-white text-xs font-semibold"
                  :style="{ backgroundColor: '#10b981' }"
                >
                  ativa
                </span>
                <span
                  v-else-if="course.status === 'trancada'"
                  class="px-3 py-1 rounded text-white text-xs font-semibold"
                  style="background-color: #ef4444"
                >
                  Trancada
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <button
          @click="handleAccessCourse"
          :disabled="!selectedCourse"
          class="w-full px-4 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Acessar esse perfil
        </button>

        <!-- Logout Button -->
        <button
          @click="handleLogout"
          class="w-full mt-3 px-4 py-3 bg-white text-blue-500 border-2 border-blue-500 rounded-md font-medium hover:bg-blue-50 transition duration-200"
        >
          Sair
        </button>
      </div>

      <!-- User Info Section -->
      <div class="mt-8 bg-white bg-opacity-10 rounded-lg p-4 text-white text-center">
        <p class="text-sm">
          Bem-vindo, <span class="font-semibold">{{ userName }}</span>
        </p>
      </div>
    </div>
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

const courses = ref([
  {
    id: 1,
    name: 'Sistemas de Informação',
    semester: 'Semestre',
    shift: 'Turno',
    code: '1234567890',
    modality: 'Modalidade',
    status: 'ativa'
  },
  {
    id: 2,
    name: 'Análise e Desenv. De Sistemas',
    semester: 'Semestre',
    shift: 'Turno',
    code: '1234567890',
    modality: 'Modalidade',
    status: 'trancada'
  }
])

onMounted(() => {
  // Simular carregamento de dados do usuário
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser)
      userName.value = user.nome || 'Usuário'
    } catch (e) {
      console.error('Erro ao carregar dados do usuário', e)
    }
  }

  // Verificar se usuário está autenticado
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  }
})

const selectCourse = (course) => {
  if (course.status === 'ativa') {
    selectedCourse.value = course
  } else {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Este curso está indisponível',
      life: 3000
    })
  }
}

const handleAccessCourse = async () => {
  if (!selectedCourse.value) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Selecione um curso',
      life: 3000
    })
    return
  }

  if (selectedCourse.value.status !== 'ativa') {
    router.push('/acesso-limitado')
    return
  }

  try {
    // Simular acesso ao curso
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: `Acessando ${selectedCourse.value.name}...`,
      life: 2000
    })

    // Salvar curso selecionado
    localStorage.setItem('selectedCourse', JSON.stringify(selectedCourse.value))

    // Redirecionar após pequeno delay
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao acessar o curso',
      life: 3000
    })
  }
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
.pi-users {
  color: #3b82f6;
}
</style>
