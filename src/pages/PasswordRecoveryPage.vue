<template>
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

  <div class="flex-1 flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">

      <!-- Steps Container -->
      <div class="bg-white rounded-lg shadow-2xl p-8">
        <!-- Step 1: Email -->
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
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StepPasswordRecoveryEmail from '../components/steps/PasswordRecovery/StepPasswordRecoveryEmail.vue'
import StepPasswordRecoveryToken from '../components/steps/PasswordRecovery/StepPasswordRecoveryToken.vue'
import StepPasswordRecoveryChange from '../components/steps/PasswordRecovery/StepPasswordRecoveryChange.vue'
import StepPasswordRecoverySuccess from '../components/steps/PasswordRecovery/StepPasswordRecoverySuccess.vue'

const currentStep = ref(1)

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

.bg-degrade-azul {
  background-color: #0b3d75;
  background-image:
    radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.7) 0%, transparent 45%),
    radial-gradient(circle at 0% 100%, rgba(255, 255, 255, 0.6) 0%, transparent 45%),
    linear-gradient(135deg, #073C87 90%, #032555 100%);
}
</style>