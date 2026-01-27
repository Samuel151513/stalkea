<template>
  <div class="min-h-screen bg-black text-white font-sans flex flex-col font-sans overflow-hidden max-w-[450px] mx-auto relative shadow-2xl border-x border-gray-800">
    
    <!-- Red Alert Header -->
    <div class="bg-gradient-to-r from-red-900 via-red-800 to-red-900 border-b border-red-700/50 p-3 text-center relative z-20 shadow-lg">
        <div class="flex flex-col items-center gap-1">
            <div class="flex items-center gap-2 animate-pulse">
                <div class="w-2 h-2 rounded-full bg-white"></div>
                <span class="font-bold text-sm text-white drop-shadow-md">Atenção, não saia dessa página!</span>
            </div>
            <span class="text-[10px] text-red-100">Sua compra ainda não foi 100% concluída</span>
        </div>
        <!-- Shine effect on header -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full -translate-x-full animate-shine pointer-events-none"></div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col px-6 pt-8 pb-12 relative overflow-y-auto">
        <!-- Background Effects -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0">
             <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900 rounded-full blur-[100px] opacity-30"></div>
             <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-900 rounded-full blur-[100px] opacity-30"></div>
        </div>

        <!-- Parabéns Card -->
        <div class="w-full bg-[#111113] border border-gray-800 rounded-2xl p-6 mb-8 text-center relative z-10 animate-enter delay-100 shadow-2xl">
            <h2 class="text-2xl font-bold text-[#8b5cf6] mb-2 flex items-center justify-center gap-2">
                Parabéns! <span class="animate-bounce">🎉</span>
            </h2>
            
            <p class="text-white font-semibold text-lg max-w-[280px] mx-auto leading-tight mb-4">
                Seu acesso ao <span class="text-[#8b5cf6]">Stalkea.ai</span><br>está quase concluído!
            </p>
            
            <p class="text-gray-400 text-sm mb-6 leading-relaxed">
                Para garantir <strong class="text-white">total sigilo da sua identidade</strong>, é necessário realizar um pagamento único de uma pequena taxa de <strong class="text-[#8b5cf6]">Firewall & Sigilo</strong>.
            </p>
            
            <!-- Warning Box -->
            <div class="bg-[#1C1C1E] border border-yellow-600/30 rounded-xl p-4 flex gap-3 text-left relative overflow-hidden">
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-yellow-600"></div>
                <UIcon name="i-lucide-triangle-alert" class="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <p class="text-[11px] text-yellow-500/90 leading-relaxed font-medium">
                    <strong class="text-yellow-500">Ativação obrigatória:</strong> sem essa taxa, o Instagram pode notificar seu cônjuge que está sendo monitorado e expor sua identidade por medidas de segurança.
                </p>
            </div>
        </div>

        <!-- Headline -->
        <div class="text-center mb-8 relative z-10 animate-enter delay-300">
            <h1 class="text-xl font-bold leading-tight mb-2">
                Ative o <span class="text-purple-500">Firewall</span> e acesse<br>
                o <span class="text-purple-500">Instagram</span> agora mesmo!
            </h1>
        </div>

        <!-- Offer Card Container (Pricing + FAQ wrapper or just separate) -->
        <div class="animate-enter delay-500">
            <!-- Offer Card -->
            <div class="w-full bg-[#1C1C1E] border border-gray-800 rounded-3xl p-1 relative shadow-2xl mb-8 z-10">
                <!-- Badge -->
                <div class="absolute -top-3 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-purple-400/30">
                    Limitado
                </div>

                <div class="bg-[#151517] rounded-[20px] p-5 flex flex-col items-center border border-gray-800/50">
                    <h2 class="text-purple-400 font-bold mb-6 flex items-center gap-2 text-sm">
                        Oferta Especial <span class="text-lg">🔥</span>
                    </h2>

                    <!-- Checklist -->
                    <div class="w-full flex flex-col gap-3 mb-8">
                        <div class="flex items-center gap-3 bg-[#1C1C1E] p-3 rounded-xl border border-gray-800/50">
                            <UIcon name="i-lucide-check" class="w-4 h-4 text-purple-500 shrink-0" />
                            <span class="text-[11px] text-gray-300">Proteção total dos seus dados e identidade</span>
                        </div>
                        <div class="flex items-center gap-3 bg-[#1C1C1E] p-3 rounded-xl border border-gray-800/50">
                            <UIcon name="i-lucide-check" class="w-4 h-4 text-purple-500 shrink-0" />
                            <span class="text-[11px] text-gray-300">100% de sigilo na investigação</span>
                        </div>
                        <div class="flex items-center gap-3 bg-[#1C1C1E] p-3 rounded-xl border border-gray-800/50">
                            <UIcon name="i-lucide-check" class="w-4 h-4 text-purple-500 shrink-0" />
                            <span class="text-[11px] text-gray-300">Liberação de backups automáticos</span>
                        </div>
                        <div class="flex items-center gap-3 bg-[#1C1C1E] p-3 rounded-xl border border-gray-800/50">
                            <UIcon name="i-lucide-check" class="w-4 h-4 text-purple-500 shrink-0" />
                            <span class="text-[11px] text-gray-300">Firewall ativo por 1 ano após o pagamento</span>
                        </div>
                    </div>

                    <!-- Price -->
                    <div class="w-full bg-[#1C1C1E] border border-gray-800 rounded-2xl p-4 text-center mb-6 relative overflow-hidden">
                        <div class="absolute top-2 right-2 bg-purple-500/10 text-purple-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-purple-500/20">
                             R$60 OFF
                        </div>
                        <p class="text-gray-500 text-[10px] line-through mb-1">R$ 97,90</p>
                        <div class="flex items-center justify-center gap-1 text-purple-500 font-bold">
                            <span class="text-sm">R$</span>
                            <span class="text-4xl tracking-tighter">27</span>
                            <span class="text-sm">,00</span>
                        </div>
                        <p class="text-gray-400 text-[10px] mt-1">Pagamento único</p>
                    </div>

                    <!-- CTA Button -->
                    <button @click="goToCheckout" class="w-full group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] p-1 shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02]">
                        <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <div class="relative bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] rounded-[10px] py-4 flex flex-col items-center justify-center gap-1">
                            <div class="flex items-center gap-2">
                                 <UIcon name="i-lucide-lock" class="w-4 h-4 text-yellow-300 fill-yellow-300" />
                                 <span class="font-bold text-white text-sm">Proteger meus dados e sigilo</span>
                            </div>
                            <span class="text-[10px] text-purple-200">E acessar o instagram agora mesmo</span>
                        </div>
                    </button>
                </div>
            </div>

            <!-- FAQ Section -->
            <div class="w-full mb-12 relative z-10">
                <h3 class="text-center font-bold text-lg mb-6">Perguntas Frequentes</h3>
                
                <div class="flex flex-col gap-3">
                    <div 
                      v-for="(item, index) in localFaq" 
                      :key="index" 
                      class="bg-[#1C1C1E] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300"
                      :class="{'border-purple-500/30': item.open}"
                    >
                        <button 
                          @click="toggleFaq(index)" 
                          class="w-full px-5 py-4 flex items-center justify-between text-left active:bg-gray-800/50 transition-colors"
                        >
                            <span class="font-medium text-sm text-gray-200 pr-4">{{ item.question }}</span>
                            <UIcon 
                              :name="item.open ? 'i-lucide-x' : 'i-lucide-plus'" 
                              class="w-5 h-5 text-purple-500 shrink-0 transition-transform duration-300" 
                              :class="{'rotate-90': item.open && false}" 
                            />
                        </button>
                        
                        <div 
                          v-show="item.open" 
                          class="px-5 pb-5 text-xs text-gray-400 leading-relaxed border-t border-gray-800/50 pt-3"
                        >
                            {{ item.answer }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Logo -->
        <div class="flex flex-col items-center gap-1 opacity-50 pb-8">
            <div class="flex items-center gap-1">
                <UIcon name="i-lucide-search" class="w-4 h-4 text-white" />
                <span class="font-bold text-white text-xs tracking-widest">STALKEA<span class="text-purple-500">.AI</span></span>
            </div>
            <p class="text-[10px] text-gray-500">© 2025 Stalkea.ai — Todos os direitos reservados.®</p>
            <div class="flex gap-3 text-[9px] text-gray-600 mt-2">
                <a href="#" class="hover:text-gray-400">Termos de Uso</a>
                <a href="#" class="hover:text-gray-400">Política de Privacidade</a>
            </div>
        </div>

    </div>

  </div>
</template>

<script setup lang="ts">

// SEO
useHead({
  title: 'Firewall de Segurança | Stalkea.ai',
  meta: [
    { name: 'description', content: 'Proteja seus dados e mantenha sigilo total na sua investigação.' },
    { name: 'theme-color', content: '#000000' }
  ]
})

const goToCheckout = () => {
    navigateTo(UPSELL_SIGILO_CHECKOUT_URL, { external: true })
}

const localFaq = ref([
    {
        question: 'Preciso fazer outro pagamento?',
        answer: 'Sim, este é um custo adicional único para garantir o sigilo total através do firewall. O acesso à ferramenta já está garantido, o firewall é uma camada extra de proteção.',
        open: false
    },
    {
        question: 'Aparece o nome do app na cobrança?',
        answer: 'Não. Na sua fatura aparecerá apenas um nome genérico como "PAYT" ou "DIGITAL", garantindo total discrição.',
        open: false
    },
    {
        question: 'Essa taxa é realmente obrigatória?',
        answer: 'Para garantir o nível de segurança e anonimato que prometemos, o uso do firewall é indispensável nesta etapa.',
        open: false
    },
    {
        question: 'Posso usar o app sem ativar o firewall?',
        answer: 'Por questões de segurança da nossa infraestrutura e dos usuários, não é possível prosseguir sem a ativação do firewall neste momento.',
        open: false
    }
])

const toggleFaq = (index: number) => {
    const item = localFaq.value[index]
    if (item) {
        item.open = !item.open
    }
}
</script>

<style scoped>
.animate-shine {
    animation: shine 2.5s infinite linear;
}

@keyframes shine {
    0% { transform: translateX(-100%); }
    20% { transform: translateX(100%); }
    100% { transform: translateX(100%); }
}

/* Entry Animations */
.animate-enter {
    animation: enter-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
}


.delay-100 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 2.2s; }
.delay-500 { animation-delay: 3.2s; }

@keyframes enter-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
