<template>
  <div class="min-h-screen bg-black text-white font-sans relative overflow-hidden flex flex-col" style="background-color: #000; min-height: 100vh; display: flex; flex-direction: column; overflow: hidden; position: relative;">
    
    <!-- Matrix Background -->
    <canvas ref="matrixCanvas" class="fixed inset-0 w-full h-full opacity-20 pointer-events-none z-0" style="position: fixed; inset: 0; width: 100%; height: 100%; opacity: 0.2; pointer-events: none; z-index: 0;"></canvas>
    
    <!-- Content Wrapper -->
    <div class="relative z-10 flex-1 flex flex-col items-center pb-24 overflow-y-auto w-full max-w-[450px] mx-auto border-x border-gray-800/50 bg-black/50 backdrop-blur-sm" style="position: relative; z-index: 10; flex: 1; display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 450px; margin-left: auto; margin-right: auto; background-color: rgba(0,0,0,0.5);">
      
      <!-- Logo Area -->
      <div class="pt-8 pb-2 flex flex-col items-center gap-2">
          <div class="flex items-center gap-2">
              <UIcon name="i-lucide-search" class="w-6 h-6 text-purple-500" />
              <span class="text-xl font-bold tracking-widest text-white">STALKEA<span class="text-purple-500">.AI</span></span>
          </div>
          <h1 class="text-2xl font-bold text-center leading-tight mt-4">
            A maior ferramenta<br>
            de <span class="text-purple-500">Stalker</span> do Brasil
          </h1>
      </div>

      <!-- User Card -->
      <div class="w-full px-6 mt-6">
        <div class="bg-[#1C1C1E] border border-gray-800 p-5 rounded-3xl flex items-center gap-4 shadow-xl">
             <div class="p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full">
                 <div class="bg-black p-[2px] rounded-full">
                    <img 
                        v-if="userProfile?.profile_pic_url"
                        :src="getProxyUrl(userProfile.profile_pic_url)" 
                        class="w-16 h-16 rounded-full object-cover"
                    />
                    <div v-else class="w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
                 </div>
             </div>
             <div class="flex flex-col">
                 <span class="font-bold text-lg text-white">{{ userProfile?.username || username }}</span>
                 <span class="text-gray-400 text-sm">@{{ userProfile?.username || username }}</span>
             </div>
        </div>
      </div>

      <!-- Success Banner -->
      <div class="w-full px-6 mt-6">
          <div class="bg-[#1a0b2e] border border-purple-500/30 rounded-2xl p-4 text-center shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden">
               <!-- Shine effect -->
               <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full animate-shine"></div>
               
               <p class="font-bold text-white mb-1">Espionagem 100% finalizada! 🥳</p>
               <p class="text-gray-400 text-xs">
                   Adquira seu acesso VIP e tenha<br>acesso imediatamente a:
               </p>
          </div>
      </div>

      <!-- Arrow Down -->
      <div class="my-8 animate-bounce">
          <UIcon name="i-lucide-arrow-down" class="w-8 h-8 text-white" />
      </div>

      <!-- Media Section -->
      <div class="w-full px-6 mb-8">
          <div class="flex items-center gap-3 mb-4">
              <UIcon name="i-lucide-smartphone" class="w-5 h-5 text-purple-500" />
              <h2 class="font-bold text-lg">Veja Mídias de {{ userProfile?.username || 'Usuário' }}</h2>
          </div>
          <p class="text-gray-400 text-xs mb-4 pl-8 -mt-2">
              Veja todas as mídias recebidas e<br>enviadas, incluindo itens apagados.
          </p>

          <div class="grid grid-cols-2 gap-3">
               <!-- Blurred Items -->
               <div v-for="i in 4" :key="i" class="aspect-square bg-zinc-900 rounded-2xl overflow-hidden relative border border-gray-800">
                   <!-- Fake blurred content -->
                <img :src="getProxyUrl(fakeImages[(i-1) % fakeImages.length] || '')" class="w-full h-full object-cover blur-xs scale-110" />
                    <div class="absolute inset-0 flex items-center justify-center">
                        <UIcon name="i-lucide-lock" class="w-6 h-6 text-white/70" />
                    </div>
               </div>
          </div>
      </div>

      <!-- Location Section -->
      <div class="w-full px-6 mb-8">
          <div class="flex items-center gap-3 mb-4">
              <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-purple-500" />
              <h2 class="font-bold text-lg">Localização em tempo real</h2>
          </div>
          <p class="text-gray-400 text-xs mb-4 pl-8 -mt-2">
              Veja onde {{ userProfile?.username || 'o alvo' }} está agora, e<br>os últimos locais por onde passou.
          </p>

          <div class="bg-zinc-900 rounded-2xl overflow-hidden border border-gray-800 h-48 relative">
              <!-- Fake Map BG -->
              <div class="w-full h-full bg-[#242f3e] opacity-80 relative">
                    <!-- Simple CSS Grid pattern for map look -->
                    <div class="absolute inset-0" style="background-image: linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px); background-size: 20px 20px; opacity: 0.3;"></div>
                    <!-- Streets -->
                    <div class="absolute top-1/2 left-0 w-full h-2 bg-gray-600/50 rotate-12"></div>
                    <div class="absolute top-0 left-1/3 w-2 h-full bg-gray-600/50 -rotate-12"></div>
              </div>
              
              <!-- Location Card Overlay -->
              <div class="absolute bottom-4 left-4 right-4 bg-[#1C1C1E] p-3 rounded-xl border border-gray-700 flex flex-col items-center">
                   <div class="w-12 h-12 bg-gray-700 rounded-full mb-2 flex items-center justify-center">
                       <UIcon name="i-lucide-user" class="w-6 h-6 text-white" />
                   </div>
                   <span class="font-bold text-sm">Localização Atual</span>
                   <span class="text-gray-400 text-xs">@{{ userProfile?.username || username }}</span>
                   
                   <button @click="goToCheckout" class="w-full mt-3 bg-[#2C2C2E] py-2 rounded-lg text-xs font-bold hover:bg-zinc-700 text-white border border-gray-600" style="width: 100%; cursor: pointer;">
                       Ver
                   </button>
              </div>
          </div>
      </div>

      <!-- Hidden Stories Section -->
      <div class="w-full px-6 mb-8">
           <div class="flex items-center gap-3 mb-4">
              <UIcon name="i-lucide-eye" class="w-5 h-5 text-purple-500" />
              <h2 class="font-bold text-lg">Stories e posts ocultos</h2>
          </div>
          <p class="text-gray-400 text-xs mb-4 pl-8 -mt-2">
              Veja stories de "Melhores Amigos" e<br>posts que {{ userProfile?.username || 'ele(a)' }} ocultou de você.
          </p>

          <div class="flex gap-3 justify-center">
              <div v-for="i in 2" :key="`story-${i}`" class="w-[140px] h-[220px] bg-zinc-900 rounded-2xl border border-gray-800 relative overflow-hidden">
                   <img :src="getProxyUrl(fakeImages[i % fakeImages.length] || '')" class="w-full h-full object-cover opacity-20 blur-md" />
                   <div class="absolute inset-0 flex flex-col items-center justify-center gap-2">
                       <UIcon name="i-lucide-lock" class="w-8 h-8 text-white/80" />
                       <span class="text-[10px] text-white/80">Conteúdo restrito</span>
                   </div>
                   <!-- Green dot for CF -->
                   <div v-if="i===2" class="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
              </div>
          </div>
      </div>

      <!-- Direct Messages Section -->
      <div class="w-full px-6 mb-8">
           <div class="flex items-center gap-3 mb-4">
              <UIcon name="i-lucide-message-circle" class="w-5 h-5 text-purple-500" />
              <h2 class="font-bold text-lg">Mensagens do Direct</h2>
          </div>
          <p class="text-gray-400 text-xs mb-4 pl-8 -mt-2">
              Veja literalmente todas as mensagens de<br>{{ userProfile?.username || username }}, incluindo mensagens temporárias
          </p>

          <div class="bg-[#1C1C1E] border border-gray-800 rounded-3xl p-4 relative overflow-hidden">
                <!-- Chat Header -->
                <div class="flex justify-between items-center border-b border-gray-800 pb-3 mb-3">
                     <div class="flex items-center gap-3">
                         <div class="relative">
                            <img 
                                v-if="userProfile?.profile_pic_url"
                                :src="getProxyUrl(userProfile.profile_pic_url)" 
                                class="w-10 h-10 rounded-full object-cover"
                            />
                            <div v-else class="w-10 h-10 rounded-full bg-gray-700"></div>
                            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1C1C1E] rounded-full"></div>
                         </div>
                         <div class="flex flex-col">
                             <span class="font-bold text-sm text-white">{{ userProfile?.username }}</span>
                             <span class="text-[10px] text-gray-400">online</span>
                         </div>
                     </div>
                     <div class="flex gap-4 text-gray-400">
                         <UIcon name="i-lucide-phone" class="w-5 h-5" />
                         <UIcon name="i-lucide-video" class="w-5 h-5" />
                     </div>
                </div>

                <!-- Fake Messages -->
                <div class="flex flex-col gap-3">
                    <div class="bg-zinc-800 self-start rounded-2xl rounded-tl-none px-4 py-2 max-w-[85%]">
                        <p class="text-gray-300 text-sm">E aí, bora ver tudo do instagram de {{ userProfile?.username || '...' }}?</p>
                    </div>

                    <!-- CTA Button inside chat -->
                    <button @click="goToCheckout" class="bg-gradient-to-r from-purple-600 to-indigo-600 self-end rounded-full px-6 py-3 mt-2 shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                        <span class="text-white font-bold text-sm">Boraa, vou comprar meu acesso VIP 🔥</span>
                    </button>
                    
                    <div class="text-[10px] text-gray-600 text-center mt-2">Hoje 10:42</div>
                </div>
          </div>
      </div>

      <!-- Arrow Down -->
      <div class="my-6 animate-bounce">
          <UIcon name="i-lucide-arrow-down" class="w-8 h-8 text-white" />
      </div>

      <!-- Pricing Section -->
      <div class="w-full px-6 mb-8">
          <div class="bg-[#0f0f11] border border-gray-800/80 rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
               <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
               
               <div class="flex flex-col items-center text-center mb-6">
                   <div class="flex items-center gap-1 mb-3">
                        <UIcon name="i-lucide-search" class="w-5 h-5 text-purple-500" />
                        <span class="font-bold text-white tracking-widest">STALKEA<span class="text-purple-500">.AI</span></span>
                   </div>
                   <h2 class="text-xl font-bold leading-tight">
                       Com o <span class="text-purple-500">Stalkea.ai</span> você vai ter<br>acesso completo ao instagram<br>de {{ userProfile?.username || username }} por apenas:
                   </h2>
               </div>

               <!-- Price Box -->
               <div class="bg-[#161618] border border-purple-500/20 rounded-2xl p-4 text-center mb-6 relative">
                   <span class="text-gray-500 text-sm line-through block mb-1">De: R$ 279,90</span>
                   <span class="text-4xl font-black text-purple-500">R$ 27<span class="text-2xl">,00</span></span>
                   
                   <div class="flex justify-center gap-4 mt-3 text-[10px] text-gray-400">
                       <span class="flex items-center gap-1"><UIcon name="i-lucide-zap" class="w-3 h-3 text-purple-400" /> Acesso imediato</span>
                       <span class="flex items-center gap-1"><UIcon name="i-lucide-lock" class="w-3 h-3 text-purple-400" /> Pagamento seguro</span>
                   </div>
               </div>

               <!-- Features -->
               <div class="flex flex-col gap-3">
                   <div class="bg-[#1C1C1E] border border-gray-800 p-3 rounded-xl flex items-center gap-3">
                       <UIcon name="i-lucide-check" class="w-5 h-5 text-purple-500 shrink-0" />
                       <span class="text-xs text-gray-200">Todas as mensagens do direct de {{ userProfile?.username || username }}</span>
                   </div>
                   <div class="bg-[#1C1C1E] border border-gray-800 p-3 rounded-xl flex items-center gap-3">
                       <UIcon name="i-lucide-check" class="w-5 h-5 text-purple-500 shrink-0" />
                       <span class="text-xs text-gray-200">Todas as fotos sem censura (incluindo apagadas)</span>
                   </div>
                   <div class="bg-[#1C1C1E] border border-gray-800 p-3 rounded-xl flex items-center gap-3">
                       <UIcon name="i-lucide-check" class="w-5 h-5 text-purple-500 shrink-0" />
                       <span class="text-xs text-gray-200">Localização em tempo real e locais que esteve</span>
                   </div>
                   <div class="bg-[#1C1C1E] border border-gray-800 p-3 rounded-xl flex items-center gap-3">
                       <UIcon name="i-lucide-check" class="w-5 h-5 text-purple-500 shrink-0" />
                       <span class="text-xs text-gray-200">Alerta sempre que {{ userProfile?.username || username }} interagir com alguém</span>
                   </div>
                   <div class="bg-[#1C1C1E] border border-gray-800 p-3 rounded-xl flex items-center gap-3">
                       <UIcon name="i-lucide-check" class="w-5 h-5 text-purple-500 shrink-0" />
                       <span class="text-xs text-gray-200">2 bônus surpresa avaliados em R$120,00</span>
                   </div>
               </div>
          </div>
      </div>

      <!-- Main CTA -->
      <div class="w-full px-6 mb-8">
          <button @click="goToCheckout" class="w-full bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] rounded-2xl p-1 shadow-[0_0_20px_rgba(139,92,246,0.5)] group transform transition hover:scale-[1.02]" style="width: 100%; cursor: pointer;">
              <div class="bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] rounded-[14px] py-4 px-6 flex flex-col items-center" style="display: flex; flex-direction: column; align-items: center;">
                  <span class="text-xl font-bold text-white mb-1">Acessar tudo agora mesmo</span>
                  <span class="text-xs text-purple-200">Acesso liberado em até 2 minutos</span>
              </div>
          </button>
      </div>
      
      <!-- Arrow Down -->
      <div class="mb-6 animate-bounce">
          <UIcon name="i-lucide-arrow-down" class="w-6 h-6 text-white" />
      </div>

      <!-- Testimonials Section -->
      <div class="w-full px-6 mb-8">
          <h3 class="text-center font-bold text-lg mb-1">Veja o que falam as pessoas</h3>
          <p class="text-center text-gray-400 text-sm mb-6">que usam o <span class="text-purple-500 font-bold">Stalkea.ai</span></p>
          
          <div class="bg-[#0f0f11] border border-gray-800 rounded-2xl p-5 relative">
               <div class="flex items-center gap-3 mb-3">
                   <div class="w-10 h-10 rounded-full bg-gray-700 p-[2px] bg-gradient-to-tr from-pink-500 to-purple-500">
                       <img :src="getProxyUrl('https://i.pravatar.cc/150?u=marcos')" class="w-full h-full rounded-full border border-black" />
                   </div>
                   <div class="flex flex-col">
                       <span class="font-bold text-sm text-white">Marcosvianad</span>
                       <span class="text-xs text-gray-500">3h</span>
                   </div>
               </div>
               <p class="text-gray-300 text-xs leading-relaxed">
                   Achei q era golpe mas testei msm assim. Paguei, em 3 min recebi o acesso. Tava tudo lá: directs, fotos q ele apagava, até a localização funcionou. Valeu cada centavo.
               </p>
               
               <!-- Dots -->
               <div class="flex justify-center gap-2 mt-4">
                   <div class="w-2 h-2 rounded-full bg-gray-600"></div>
                   <div class="w-6 h-2 rounded-full bg-purple-600"></div>
                   <div class="w-2 h-2 rounded-full bg-gray-600"></div>
               </div>
          </div>
      </div>

      <!-- Warning Section -->
      <div class="w-full px-6 mb-8">
          <div class="bg-[#2a1212]/80 border border-red-900/50 rounded-xl p-4 flex items-start gap-3">
              <UIcon name="i-lucide-triangle-alert" class="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              <p class="text-xs text-red-200/90 leading-relaxed">
                  As informações acessadas são <span class="font-bold">extremamente sensíveis</span>. Use com responsabilidade.
              </p>
          </div>
      </div>
      
      <!-- User FAQ Section -->
      <div class="w-full px-6 mb-8">
          <h3 class="text-center font-bold text-lg mb-6">Perguntas Frequentes</h3>
          
          <div class="flex flex-col gap-3">
              <div 
                v-for="(item, index) in faqItems" 
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
      
      <!-- Bottom Spacing -->
      <div class="h-8"></div>

    </div>

    <!-- Fixed Bottom Bar -->
    <div class="fixed bottom-0 left-0 right-0 bg-[#151517]/95 backdrop-blur-md border-t border-gray-800 p-4 pb-6 z-50" style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background-color: rgba(21, 21, 23, 0.95);">
        <div class="max-w-[450px] mx-auto flex items-center justify-between gap-4">
             <div class="flex flex-col">
                 <span class="font-bold text-white text-sm">Finalize sua compra agora!</span>
                 <span class="text-[10px] text-gray-400 leading-tight">Não saia ou recarregue essa página, a<br>espionagem não pode ser realizada novamente.</span>
             </div>
             
             <button @click="goToCheckout" class="bg-[#584cea] hover:bg-[#4a3fcb] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg whitespace-nowrap leading-tight">
                 Desbloquear<br>Acesso Agora
             </button>
        </div>
    </div>

    <!-- Expired Access Modal -->
    <div v-if="showExpiredModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6">
       <div class="bg-[#1C1C1E] border border-gray-800 w-full max-w-[320px] rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl relative">
          <div class="mb-4">
             <UIcon name="i-lucide-clock" class="w-12 h-12 text-purple-500" />
          </div>
          
          <h3 class="text-white text-lg font-bold mb-3">
             {{ modalTitle }}
          </h3>
          
          <p class="text-gray-300 text-sm mb-6 leading-relaxed">
             Você só pode fazer uma busca, para espionar o perfil é necessário adquirir o plano vip
          </p>
          
          <button @click="goToCheckout" class="w-full bg-gradient-to-r from-[#7C4DFF] to-[#9A6CFF] text-white font-semibold py-3 rounded-xl transition-colors hover:opacity-90 mb-3">
             Adquirir Plano VIP
          </button>
          
          <button @click="showExpiredModal = false" class="text-gray-400 text-sm hover:text-white">
             Fechar
          </button>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { StalkeaService } from '~/services/stalkea.service'
import { CHECKOUT_URL } from '~/utils/constants'
import type { InstagramFeedResponse, PerfilBuscado } from '~/types/instagram'

const route = useRoute()
const username = ref(route.query.username as string)
const feedData = ref<InstagramFeedResponse | null>(null)
const matrixCanvas = ref<HTMLCanvasElement | null>(null)
const showExpiredModal = ref(false)
const modalTitle = ref('Tempo Esgotado')

const userProfile = computed<PerfilBuscado | undefined>(() => feedData.value?.perfil_buscado)



const fakeImages = [
  '/user-midias-fake/nudes1-chat1.jpg',
  '/user-midias-fake/nudes1-chat2.jpg',
  '/user-midias-fake/nudes1-chat3.jpg',
  '/user-midias-fake/pack1.1.chat2.png'
]

const fakeImages2 = [
    '/user-midias-fake/nudes1-chat3.jpg',
    '/user-midias-fake/nude1.jpeg',
]

const goToCheckout = () => {
    navigateTo(CHECKOUT_URL, { external: true })
}

// FAQ Data
const faqItems = ref([
    {
        question: 'A ferramenta realmente funciona?',
        answer: 'Sim! O Stalkea.ai utiliza tecnologia avançada para acessar dados do Instagram de forma completamente invisível. Milhares de usuários já confirmaram a eficácia da ferramenta.',
        open: true
    },
    {
        question: 'A pessoa vai saber que eu stalkeei o perfil dela?',
        answer: 'Não! Todo o processo é realizado de forma 100% anônima e segura. O alvo jamais saberá que foi monitorado.',
        open: false
    },
    {
        question: 'Funciona em perfis privados?',
        answer: 'Sim! Nossa tecnologia exclusiva permite visualizar dados e stories mesmo de contas configuradas como privadas.',
        open: false
    },
    {
        question: 'Preciso instalar alguma coisa?',
        answer: 'Não! O Stalkea.ai funciona diretamente no seu navegador. Não é necessário baixar nenhum aplicativo ou software.',
        open: false
    },
    {
        question: 'Como funciona a garantia?',
        answer: 'Oferecemos garantia total de satisfação. Se você não conseguir acessar os dados prometidos, devolvemos 100% do seu dinheiro.',
        open: false
    },
    {
        question: 'Quanto tempo tenho acesso?',
        answer: 'O pagamento é único e você terá acesso imediato e vitalício à ferramenta para o perfil selecionado.',
        open: false
    }
])

const toggleFaq = (index: number) => {
    const item = faqItems.value[index]
    if (item) {
        item.open = !item.open
    }
}

// Matrix Effect
onMounted(async () => {
    // Check if user was redirected due to expired access or search limit
    if (route.query.expired === 'true' || route.query.reason === 'limit') {
        showExpiredModal.value = true
        if (route.query.reason === 'limit') {
            modalTitle.value = 'Busca Bloqueada'
        } else {
            modalTitle.value = 'Tempo Esgotado'
        }
    }
    
    // Canvas Matrix
    const canvas = matrixCanvas.value
    if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            const fontSize = 14
            const columns = canvas.width / fontSize
            const drops: number[] = []
            
            for(let i=0; i<columns; i++) drops[i] = 1;
            
            const draw = () => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = '#6b21a8'; // Purple
                ctx.font = fontSize + 'px monospace';
                
                for(let i=0; i<drops.length; i++){
                    const text = letters.charAt(Math.floor(Math.random() * letters.length));
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    
                    if(drops[i] * fontSize > canvas.height && Math.random() > 0.975)
                        drops[i] = 0;
                    
                    drops[i]++;
                }
            }
            setInterval(draw, 50)
        }
    }

    // Load Data
    try {
        if (username.value) {
            feedData.value = await StalkeaService.getProfileFeed(username.value)
        }
    } catch (e) {
        console.error("Failed to load profile data", e)
    }
})
</script>

<style scoped>
.animate-shine {
    animation: shine 3s infinite linear;
}

@keyframes shine {
    0% { transform: translateX(-100%); }
    20% { transform: translateX(100%); }
    100% { transform: translateX(100%); }
}
</style>
