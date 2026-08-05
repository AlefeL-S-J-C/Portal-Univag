<template>
  <div class="min-h-screen w-full flex flex-col bg-degrade-azul">
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-2xl">
        <!-- Navigation Links -->
        <div class="flex justify-center gap-8 mb-8 text-white text-sm">
          <button class="hover:text-blue-400 transition">Entre em contato</button>
          <span class="text-gray-500">|</span>
          <button class="hover:text-blue-400 transition">Central de ajuda</button>
        </div>

        <!-- Steps Container -->
        <div class="bg-white rounded-lg shadow-2xl p-8">
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
    </div>
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

.bg-degrade-azul {
  background-color: #0b3d75;
  background-image:
    radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.7) 0%, transparent 45%),
    radial-gradient(circle at 0% 100%, rgba(255, 255, 255, 0.6) 0%, transparent 45%),
    linear-gradient(135deg, #073C87 90%, #032555 100%);
}
</style>