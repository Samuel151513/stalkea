<template>
  <div class="relative min-h-screen bg-[#0B0B0E] flex flex-col items-center pt-8 pb-12 overflow-x-hidden">
    <MatrixBackground />

    <div class="w-full max-w-[400px] px-4 relative z-10 flex flex-col gap-6">
      <!-- Confirmation Card -->
      <div class="bg-[#0F0F13]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
        <h2 class="text-[#7C4DFF] text-2xl font-bold mb-4">
          Confirme o Instagram
        </h2>

        <p class="text-white/80 text-base mb-1">
          Você deseja espionar o perfil
        </p>
        <p class="text-[#7C4DFF] text-lg font-bold mb-6">
          @{{ username }}?
        </p>

        <!-- Profile Stats -->
        <div v-if="profile" class="flex items-start gap-4 mb-6 w-full px-4">
          <!-- Avatar -->
          <div class="w-20 h-20 rounded-full bg-[#2D2D33] overflow-hidden flex-shrink-0 ring-2 ring-[#7C4DFF]/20">
            <img 
              v-if="profile.profile_pic_url" 
              :src="getProxyUrl(profile.profile_pic_url)" 
              :alt="profile.username"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <UIcon name="i-lucide-user" class="w-10 h-10 text-[#52525C]" />
            </div>
          </div>

          <!-- Stats -->
          <div class="flex flex-1 justify-between pt-2 gap-2">
            <div class="text-center flex flex-col items-center">
              <p class="text-white text-xl font-bold leading-none mb-1">{{ formatNumber(profile.media_count) }}</p>
              <p class="text-[#9A9AA6] text-xs font-medium">posts</p>
            </div>
            <div class="text-center flex flex-col items-center">
              <p class="text-white text-xl font-bold leading-none mb-1">{{ formatNumber(profile.follower_count) }}</p>
              <p class="text-[#9A9AA6] text-xs font-medium">seguidores</p>
            </div>
            <div class="text-center flex flex-col items-center">
              <p class="text-white text-xl font-bold leading-none mb-1">{{ formatNumber(profile.following_count) }}</p>
              <p class="text-[#9A9AA6] text-xs font-medium">seguindo</p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="flex items-start gap-4 mb-6 w-full px-4">
          <div class="w-20 h-20 rounded-full bg-[#2D2D33] animate-pulse flex-shrink-0"></div>
          <div class="flex flex-1 justify-between pt-2">
            <div class="text-center">
              <div class="w-8 h-6 bg-[#2D2D33] rounded animate-pulse mb-1 mx-auto"></div>
              <p class="text-[#9A9AA6] text-xs">posts</p>
            </div>
            <div class="text-center">
              <div class="w-8 h-6 bg-[#2D2D33] rounded animate-pulse mb-1 mx-auto"></div>
              <p class="text-[#9A9AA6] text-xs">seguidores</p>
            </div>
            <div class="text-center">
              <div class="w-8 h-6 bg-[#2D2D33] rounded animate-pulse mb-1 mx-auto"></div>
              <p class="text-[#9A9AA6] text-xs">seguindo</p>
            </div>
          </div>
        </div>

        <!-- Warning -->
        <div class="flex items-start gap-2 bg-[#1C1C21] border border-[#2D2D33] rounded-xl p-4 mb-8 w-full">
          <UIcon name="i-lucide-alert-triangle" class="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <p class="text-[11px] text-left leading-[1.6]">
            <span class="text-[#F59E0B] font-bold">Aviso:</span>
            <span class="text-[#9A9AA6]"> Limite de apenas 1 pesquisa por dispositivo, certifique-se que digitou o usuário corretamente.</span>
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 w-full">
          <button 
            @click="goBack"
            class="flex-1 h-[56px] text-sm bg-[#16161A] border border-[#2D2D33]  flex items-center justify-center gap-2 text-white font-bold hover:bg-[#1E1E24] transition-colors p-2 rounded"
          >
            Corrigir @
          </button>
          <button 
            @click="confirmAnalysis"
            class="flex-1 h-[56px] text-sm bg-gradient-to-r from-[#7C4DFF] to-[#9A6CFF] flex items-center justify-center gap-2 text-white font-bold shadow-[0_8px_30px_rgba(124,77,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-transform p-2 rounded"
          >
            Confirmar
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Stats Footer -->
      <div class="text-center">
        <p class="text-[#7C4DFF] font-bold text-xs tracking-wide">
          <span class="text-white/90 font-black">+{{ analyticsCount }}</span> perfis analisados hoje ({{ currentDay }})
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StalkeaService } from '~/services/stalkea.service'

const router = useRouter()
const route = useRoute()
const username = ref(route.query.username || '')
const profile = ref(null)
const analyticsCount = ref('8.821')

const currentDay = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date())
  .split('-')[0]

const formatNumber = (num) => {
  if (!num && num !== 0) return '0'
  return num.toLocaleString('pt-BR')
}

const handleImageError = (e) => {
  e.target.style.display = 'none'
}

const goBack = () => {
  router.push('/')
}

const confirmAnalysis = () => {
  if (!profile.value) return
  
  sessionStorage.setItem('stalkeaProfile', JSON.stringify(profile.value))
  
  router.push({
    path: '/instagram-login',
    query: { username: username.value }
  })
}

onMounted(async () => {

  if (username.value) {
  
       StalkeaService.getProfile(username.value).then( response  => {
        console.log('response', response)
        profile.value = response
      })    
  }

  setInterval(() => {
    const increment = Math.floor(Math.random() * 3)
    const current = parseInt(analyticsCount.value.replace(/\./g, ''))
    analyticsCount.value = (current + increment).toLocaleString('pt-BR')
  }, 1000)
})

watch(() => profile.value, () => {
  console.log('profile v', profile.value)
})
</script>
