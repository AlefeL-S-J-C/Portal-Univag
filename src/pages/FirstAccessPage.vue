<template>
  <!-- Container Principal com o fundo degradê -->
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
      <!-- Alterado de max-w-2xl para max-w-md para deixar o cartão estreito -->
      <div class="w-full max-w-md">

        <div class="modal-card p-8 min-h-[550px] flex flex-col justify-center relative">
          <!-- Step 1: Identification -->
          <template v-if="currentStep === 1">
            <StepIdentification @next="handleStepNext" />
          </template>

          <!-- Step 2: Token Validation -->
          <template v-else-if="currentStep === 2">
            <StepTokenValidation @next="handleStepNext" @back="handleStepBack" />
          </template>

          <!-- Step 3: Create Password -->
          <template v-else-if="currentStep === 3">
            <StepCreatePassword @next="handleStepNext" @back="handleStepBack" />
          </template>

          <!-- Step 4: Success -->
          <template v-else-if="currentStep === 4">
            <StepSuccess />
          </template>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import StepIdentification from '../components/steps/FirstAccess/StepIdentification.vue'
import StepTokenValidation from '../components/steps/FirstAccess/StepTokenValidation.vue'
import StepCreatePassword from '../components/steps/FirstAccess/StepCreatePassword.vue'
import StepSuccess from '../components/steps/FirstAccess/StepSuccess.vue'

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
</style>