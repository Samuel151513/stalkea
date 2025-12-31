<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
    <div class="max-w-md w-full space-y-8 relative z-10">
      <!-- Icon/Visual -->
      <div class="flex justify-center mb-8">
        <div class="relative">
          <div class="absolute inset-0 bg-primary-500/20 blur-xl rounded-full animate-pulse"></div>
          <UIcon name="i-lucide-smartphone" class="w-24 h-24 text-primary-500 relative z-10" />
        </div>
      </div>

      <!-- Main Content -->
      <div class="space-y-4">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Disponível apenas no Mobile
        </h1>
        
        <p class="text-gray-400 text-lg">
          Para garantir a melhor experiência e segurança, o Stalkea Clone foi projetado para ser usado exclusivamente em dispositivos móveis.
        </p>
      </div>

      <!-- Divider -->
      <div class="relative py-4">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t border-gray-800" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-black px-2 text-gray-500">Acesse pelo celular</span>
        </div>
      </div>

      <!-- Action -->
      <div class="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
        <p class="text-sm text-gray-400 mb-2">Abra o navegador do seu celular e acesse:</p>
        <div class="bg-black/50 p-3 rounded-lg border border-gray-800 font-mono text-primary-400 break-all">
          {{ currentUrl }}
        </div>
      </div>
    </div>

    <!-- Background Grid Effect -->
    <div class="absolute inset-0 opacity-20 pointer-events-none" 
      style="background-image: radial-gradient(#333 1px, transparent 1px); background-size: 30px 30px;">
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false // No default layout to avoid navbars/global UI leaking
})

const currentUrl = ref('')

onMounted(() => {
  currentUrl.value = window.location.origin
})
</script>
