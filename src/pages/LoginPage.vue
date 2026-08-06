<template>
  <!-- O bg-degrade-azul agora vem do seu CSS global -->
  <div class="h-screen w-full flex flex-col bg-degrade-azul overflow-hidden">
    <div class="min-h-screen w-full flex flex-col bg-degrade-azul">

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
  
      <main class="flex-1 flex items-center justify-center p-4">
        <!-- Substituímos as classes repetidas pela sua classe universal 'modal-card' -->
        <div class="modal-card w-full max-w-3xl flex overflow-hidden">

          <div class="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <div class="text-center mb-6">
              <h1 class="text-xl md:text-2xl font-bold text-gray-800 mb-1">Bem-Vindo ao Portal!</h1>
            </div>

            <!-- O restante do seu formulário já usa suas classes universais (.form-input, .btn-primary, etc.) -->
            <form @submit.prevent="handleLogin" class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input v-model="formData.cpf" type="text" placeholder="000.000.000-00" @input="formatCPF"
                  class="input-field form-input text-sm p-2 w-full border rounded" required />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <div class="relative">
                  <input v-model="formData.senha" :type="showPassword ? 'text' : 'password'"
                    placeholder="Digite sua senha" class="form-input text-sm p-2 w-full border rounded" required />
                  <button type="button" @click="showPassword = !showPassword"
                    class="input-field absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                    <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" />
                  </button>
                </div>
                <p @click="goToPasswordRecovery" class="link-url">
                  Esqueci minha senha
                </p>
              </div>

              <div class="my-2 flex justify-center min-h-[78px] scale-90 md:scale-100 transform origin-center">
                <div id="vue-recaptcha-container"></div>
              </div>

              <div class="pt-2 flex flex-col gap-2">
                <button type="submit" class="btn-primary w-full">
                  Acessar o portal
                </button>
                <button type="button" @click="goToPrimeiroAcesso" class="btn-secondary w-full">
                  Primeiro Acesso
                </button>
              </div>
            </form>
          </div>

          <div class="hidden md:block md:w-1/2 bg-gray-200"></div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const activeTab = ref('portal')
const showPassword = ref(false)

// Estados reativos do Vue para o reCAPTCHA
const captchaVerified = ref(false)
const captchaToken = ref('')

const formData = ref({
  cpf: '',
  senha: ''
})

// Chave pública do reCAPTCHA (Substitua pela sua chave quando tiver)
const SITE_KEY = '6Ld_SUUqAAAAAA-X3x_example_key'

// Carregamento e renderização gerenciados 100% pelo lifecycle do Vue
onMounted(() => {
  const renderRecaptcha = () => {
    if (window.grecaptcha && window.grecaptcha.render) {
      window.grecaptcha.render('vue-recaptcha-container', {
        sitekey: SITE_KEY,
        callback: (response) => {
          captchaVerified.value = true
          captchaToken.value = response
        },
        'expired-callback': () => {
          captchaVerified.value = false
          captchaToken.value = ''
        }
      })
    }
  }

  // Verifica se o script já existe no documento, se não, insere dinamicamente
  if (!document.getElementById('recaptcha-script')) {
    window.onloadRecaptchaCallback = renderRecaptcha
    const script = document.createElement('script')
    script.id = 'recaptcha-script'
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  } else {
    renderRecaptcha()
  }
})

const formatCPF = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  formData.value.cpf = value
}

const handleLogin = async () => {
  if (!formData.value.cpf || !formData.value.senha) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha todos os campos',
      life: 3000
    })
    return
  }

  // Validação do Captcha no Vue
  /*
  if (!captchaVerified.value) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Por favor, confirme que você não é um robô',
      life: 3000
    })
    return
  }
  */

  try {
    const mockToken = 'mock_token_' + Date.now()
    const mockUser = {
      cpf: formData.value.cpf,
      nome: 'Fulano Beltrano',
      email: 'fulano@univag.edu.br'
    }

    localStorage.setItem('token', mockToken)
    localStorage.setItem('user', JSON.stringify(mockUser))

    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Login realizado com sucesso!',
      life: 2000
    })

    setTimeout(() => {
      router.push('/cursos')
    }, 1500)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao realizar login',
      life: 3000
    })
  }
}

const goToPrimeiroAcesso = () => {
  router.push('/primeiro-acesso')
}

const goToPasswordRecovery = () => {
  router.push('/recuperacao-senha')
}
</script>
<style scoped>
:deep(.pi) {
  font-size: 1rem;
  }
  </style>