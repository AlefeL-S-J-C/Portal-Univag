<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col">
    <Toast />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import Footer from './components/Footer.vue'

const toast = useToast()
</script>

<style scoped>
:deep(.p-toast) {
  top: 20px;
  right: 20px;
}
</style>
