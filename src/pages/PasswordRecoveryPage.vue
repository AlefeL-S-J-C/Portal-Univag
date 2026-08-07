<template>
  <!-- Container Principal que aplica o fundo degradê e ocupa a tela inteira -->
  <div class="min-h-screen w-full flex flex-col bg-degrade-azul">

    <header class="w-full mt-6 flex justify-center gap-8 py-4 flex-shrink-0">
      <button class="text-white hover:text-blue-400 transition pb-1 font-regular text-sm md:text-base "
        :class="activeTab === 'portal' ? 'border-blue-400 text-blue-400' : 'border-transparent'"
        @click="showContactModal = true">
        Entre em contato
      </button>

      <img src="../images/logo-univag.png" alt="Logo Univag" class="h-10 md:h-12">

      <button class="text-white hover:text-blue-400 transition pb-1 font-regular text-sm md:text-base border-b-2"
        :class="activeTab === 'help' ? 'border-blue-400 text-blue-400' : 'border-transparent'"
        @click="showHelpModal = true">
        Central de ajuda
      </button>
    </header>

    <main class="flex-1 flex items-center justify-center p-4">
      <!-- Alterado de max-w-2xl para max-w-md para deixar o cartão estreito -->
      <div class="w-full max-w-md">

        <div class="modal-card p-8 min-h-[550px] flex flex-col justify-start relative">
          <!-- Steps Container usando a classe universal 'modal-card' -->
          <template v-if="currentStep === 1">
            <StepPasswordRecoveryEmail @next="handleStepNext" />
          </template>

          <!-- Step 2: Token Validation -->
          <template v-else-if="currentStep === 2">
            <StepPasswordRecoveryToken @next="handleStepNext" @back="handleStepBack" />
          </template>

          <!-- Step 3: Change Password -->
          <template v-else-if="currentStep === 3">
            <StepPasswordRecoveryChange @next="handleStepNext" @back="handleStepBack" />
          </template>

          <!-- Step 4: Success -->
          <template v-else-if="currentStep === 4">
            <StepPasswordRecoverySuccess />
          </template>
        </div>
      </div>
    </main>
    <!-- Modal de Contato -->
    <ContactModal :isOpen="showContactModal" @close="showContactModal = false" />
    <!-- Modal de Central de Ajuda -->
    <HelpCenterModal :isOpen="showHelpModal" @close="showHelpModal = false"
      @contact="showHelpModal = false; showContactModal = true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StepPasswordRecoveryEmail from '../components/steps/PasswordRecovery/StepPasswordRecoveryEmail.vue'
import StepPasswordRecoveryToken from '../components/steps/PasswordRecovery/StepPasswordRecoveryToken.vue'
import StepPasswordRecoveryChange from '../components/steps/PasswordRecovery/StepPasswordRecoveryChange.vue'
import StepPasswordRecoverySuccess from '../components/steps/PasswordRecovery/StepPasswordRecoverySuccess.vue'
import ContactModal from '../components/ContactModal.vue'
import HelpCenterModal from '../components/HelpCenterModal.vue'

const currentStep = ref(1)
const showContactModal = ref(false)
const showHelpModal = ref(false)

const handleStepNext = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const handleStepBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
</script>

<style scoped>
:deep(.pi) {
  font-size: 1rem;
}
</style>