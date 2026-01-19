<template>
  <div class="min-h-screen bg-gradient-to-b from-[#0B0B0E] to-[#1a1a2e] relative overflow-hidden font-sans text-[#C7C7D1]">
    <!-- Particles Background -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div v-for="i in 50" :key="i" class="particle absolute rounded-full bg-[#8BC34A]/40 shadow-[0_0_10px_rgba(139,195,74,0.3)]" :style="getParticleStyle(i)"></div>
    </div>

    <!-- Success Banner -->
    <div class="relative z-10 bg-gradient-to-r from-[#6CA842] to-[#8BC34A] py-3 px-5 shadow-[0_4px_20px_rgba(139,195,74,0.3)]">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-0">
        <div class="flex items-center gap-1 text-white font-bold text-base">
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5" />
          <span>Sua identidade está preservada!</span>
        </div>
        <span class="text-white/90 text-sm font-normal">Conexão segura • Privacidade V2.4.1</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-2xl mx-auto py-6 sm:py-16 px-5">
      <!-- Logo -->
      <div class="text-center mb-4 sm:mb-8">
        <div class="inline-flex items-center justify-center w-8 h-8 sm:w-15 sm:h-15 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl mb-3 sm:mb-4 shadow-[0_8px_32px_rgba(102,126,234,0.3)] text-lg text-white">
          <UIcon name="i-heroicons-lock-closed" />
        </div>
        <div class="text-xs sm:text-[28px] font-bold tracking-[2px] mb-1">
          <span class="text-white">STALKEA</span><span class="text-[#8BC34A]">.AI</span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="w-full h-1 bg-[#8BC34A]/20 rounded-sm mb-6 sm:mb-10 overflow-hidden">
        <div class="h-full w-3/4 bg-gradient-to-r from-[#6CA842] to-[#8BC34A] rounded-sm shadow-[0_0_10px_rgba(139,195,74,0.5)] animate-pulse"></div>
      </div>

      <!-- Title Section -->
      <div class="text-center mb-6 sm:mb-10">
        <h1 class="text-2xl sm:text-4xl font-bold mb-3 sm:mb-5 text-white leading-tight">
          <span class="inline-block animate-bounce">🔖</span>
          Escolha seu <span class="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Plano</span>
        </h1>
        <p class="text-sm sm:text-base leading-relaxed text-[#C7C7D1]">
          Agora que sua conta já está com o <span class="bg-gradient-to-r from-[#667eea] to-[#764ba2] px-2 py-0.5 rounded text-white font-semibold">firewall ativo</span> e sua
          <br class="hidden sm:block" />
          <span class="font-semibold text-[#8BC34A]">identidade preservada</span>, selecione com qual <span class="font-semibold text-white">plano</span> você deseja prosseguir:
        </p>
      </div>

      <!-- Pricing Grids -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        <!-- Gold Plan -->
        <PricingCard
          title="Gold"
          price="R$67,00"
          theme="gold"
          button-text="Selecionar Gold"
          subtitle="824 vagas • Pagamento único"
          :features="[
            { text: 'Acesso vitalício', subtext: '(Acesso de 7 dias)', included: true },
            { text: 'Busca de apenas 1 perfil', included: true },
            { text: 'Monitoramento apenas do Insta', included: true },
            { text: 'Suporte em horário comercial pelo email', included: true },
            { text: 'Localização em Tempo Real', included: false },
            { text: 'Galeria de Fotos (incluindo fotos apagadas)', included: false },
            { text: 'BRINDE: Espião Completo do Facebook', included: false },
            { text: 'BRINDE: Espião Completo do Messenger', included: false }
          ]"
          @select="selectPlan('Gold')"
        />

        <!-- Diamond Plan -->
        <PricingCard
          title="Diamond"
          price="R$97,00"
          original-price="R$132,00"
          badge="Mais Vendido"
          theme="diamond"
          button-text="Selecionar Mais Vendido"
          subtitle="71 vagas • Pagamento único"
          class="transform md:-translate-y-4"
          :features="[
            { text: 'Acesso vitalício', subtext: '(Acesso de 1 mês)', included: true },
            { text: 'Busca de 3 perfis', included: true },
            { text: 'Monitoramento Completo', included: true },
            { text: 'Suporte 24h pelo WhatsApp', included: true },
            { text: 'Localização em Tempo Real', included: true },
            { text: 'Galeria de Fotos (incluindo fotos apagadas)', included: true },
            { text: 'BRINDE: Espião Completo do Facebook', included: false },
            { text: 'BRINDE: Espião Completo do Messenger', included: false }
          ]"
          @select="selectPlan('Diamond')"
        />

        <!-- Premium Plan -->
        <PricingCard
          title="Premium"
          price="R$127,00"
          original-price="R$254,00"
          badge="Melhor Custo Benefício"
          theme="premium"
          button-text="✨ Selecionar Custo Benefício"
          subtitle="139 vagas • Pagamento único"
          :features="[
            { text: 'Acesso Vitalício a Todos os Apps', included: true },
            { text: 'Busca de Perfis ILIMITADOS', included: true },
            { text: 'Monitoramento Completo', included: true },
            { text: 'Suporte 24h pelo WhatsApp', included: true },
            { text: 'Localização em Tempo Real', included: true },
            { text: 'Galeria de Fotos (incluindo fotos apagadas)', included: true },
            { text: 'BRINDE: Espião Completo do Facebook', included: true },
            { text: 'BRINDE: Espião Completo do Messenger', included: true }
          ]"
          @select="selectPlan('Premium')"
        />

      </div>

      <!-- Footer Note -->
      <div class="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
        <UIcon name="i-heroicons-shield-check" class="w-4.5 h-4.5 text-[#8BC34A]" />
        <span>Transação 100% segura e criptografada</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PLANO_GOLD_URL, PLANO_DIAMONG_URL, PLANO_PREMIUM_URL } from '~/utils/constants'

// Set dark mode
const colorMode = useColorMode()
colorMode.preference = 'dark'

// SEO Meta
useHead({
  title: 'Escolha seu Plano - Stalkea.AI',
  meta: [
    { name: 'description', content: 'Escolha o melhor plano para suas análises protegidas no Stalkea.AI' }
  ]
})

// Particle animation
const getParticleStyle = (index: number) => {
  const size = Math.random() * 3 + 1
  const left = Math.random() * 100
  const animationDuration = Math.random() * 20 + 10
  const animationDelay = Math.random() * 5
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${animationDelay}s`
  }
}

// Handle plan selection
const selectPlan = (plan: string) => {
  const links: Record<string, string> = {
    'Gold': PLANO_GOLD_URL,
    'Diamond': PLANO_DIAMONG_URL,
    'Premium': PLANO_PREMIUM_URL
  }

  const url = links[plan]
  if (url) {
    navigateTo(url, { external: true })
  }
}
</script>



<style>
@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.particle {
  animation: float linear infinite;
}
</style>
