<template>
  <div class="bg-black h-screen text-white flex flex-col font-sans overflow-hidden max-w-[450px] mx-auto relative shadow-2xl border-x border-gray-800">
    
    <!-- Top Bar -->
    <header class="flex justify-between items-center px-4 py-3 bg-black z-50 shrink-0 border-b border-gray-800/40">
      <div class="flex items-center gap-1">
        <!-- Logo -->
        <!-- Fallback font for Instagram logo style -->
        <h1 class="text-2xl font-serif italic tracking-tighter" style="font-family: 'Billabong', cursive, sans-serif;">Instagram</h1>
        
        <button @click="openBlockedModal">
            <UIcon name="i-lucide-chevron-down" class="w-4 h-4 mt-1" />
        </button>
      </div>
      
      <div class="flex items-center gap-5">
        <button class="relative" @click="openBlockedModal">
          <UIcon name="i-lucide-heart" class="w-7 h-7" />
          <span class="absolute top-0 right-0 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-black"></span>
        </button>

        <button class="relative" @click="navigateTo({ path: '/direct', query: { username } })">
           <svg aria-label="Mensagens" class="w-7 h-7" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Mensagens</title><path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line></svg>
           <span class="absolute -top-1 -right-1 bg-red-600 text-[10px] font-bold px-1 h-3.5 min-w-[14px] flex items-center justify-center rounded-full border border-black">3</span>
        </button>
      </div>
    </header>

    <!-- Scrollable Content Area -->
    <div class="flex-1 overflow-y-auto scrollbar-hide">
        <!-- Stories Rail -->
        <div class="pt-2 pb-4 border-b border-gray-800/40">
          <div class="flex overflow-x-auto gap-4 px-4 scrollbar-hide pb-2">
            
            <!-- User Story (Add) -->
            <button class="flex flex-col items-center gap-1.5 min-w-[72px]" @click="openBlockedModal">
              <div class="relative">
                 <div class="w-[72px] h-[72px] rounded-full p-[2px]">
                   <img 
                    v-if="userProfile?.profile_pic_url" 
                    :src="getProxyUrl(userProfile.profile_pic_url)" 
                    class="w-full h-full rounded-full object-cover border border-gray-800"
                    alt="Seu story"
                   />
                   <div v-else class="w-full h-full rounded-full bg-gray-800 animate-pulse"></div>
                 </div>
                 <div class="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
                   <UIcon name="i-lucide-plus" class="w-4 h-4 text-white" />
                 </div>
              </div>
              <span class="text-xs text-center truncate w-full text-zinc-400">Seu story</span>
            </button>

            <!-- Unlocked Stories -->
            <button 
              v-for="story in unlockedStories" 
              :key="story.username" 
              class="flex flex-col items-center gap-1.5 min-w-[72px]"
              @click="openBlockedModal"
            >
              <div class="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px] rounded-full">
                <div class="bg-black p-[2px] rounded-full">
                  <img 
                    :src="getProxyUrl(story.profile_pic_url)" 
                    class="w-[64px] h-[64px] rounded-full object-cover"
                    :alt="story.username"
                  />
                </div>
              </div>
              <span class="text-xs text-center truncate w-[74px]">{{ story.username }}</span>
            </button>

            <!-- Locked Stories -->
            <button 
              v-for="story in lockedStories" 
              :key="`locked-${story.username}`" 
              class="flex flex-col items-center gap-1.5 min-w-[72px]"
              @click="openBlockedModal"
            >
                <!-- Same gradient border style for consistency, or gray if "unavailable" but request implied locked view -->
              <div class="bg-gradient-to-tr from-gray-700 via-gray-600 to-gray-700 p-[2px] rounded-full opacity-80">
                 <div class="bg-black p-[2px] rounded-full relative w-[68px] h-[68px] flex items-center justify-center">
                    <!-- Using a blurred or placeholder background -->
                    <div class="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center relative overflow-hidden">
                        <!-- Lock Icon Overlay -->
                        <UIcon name="i-lucide-lock" class="w-6 h-6 text-zinc-400 z-10" />
                        <!-- Blurred img background optional -->
                        <img v-if="story.profile_pic_url" :src="getProxyUrl(story.profile_pic_url)" class="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" />
                    </div>
                 </div>
              </div>
              <span class="text-xs text-center truncate w-[74px] text-zinc-500">
                {{ getMaskedUsername(story.username) }}
              </span>
            </button>

          </div>
        </div>

        <!-- Feed Area -->
        <main class="flex flex-col bg-black">
           <!-- Empty state if no posts -->
            <div v-if="!posts.length && !loading" class="flex flex-col items-center justify-center py-20 gap-4 opacity-40">
                <UIcon name="i-lucide-camera" class="w-16 h-16 text-zinc-700" />
                <p class="text-lg font-bold text-zinc-700">Nenhuma publicação ainda</p>
            </div>

            <!-- Feed Posts -->
            <div v-for="postItem in posts" :key="postItem.post.id" class="flex flex-col mb-4 border-b border-gray-900 pb-2">
                <!-- Header -->
                <div class="flex items-center justify-between px-3 py-2">
                    <div class="flex items-center gap-2">
                        <div class="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px] rounded-full">
                             <div class="bg-black p-[2px] rounded-full">
                                <img 
                                    :src="getProxyUrl(postItem.de_usuario.profile_pic_url)"
                                    class="w-8 h-8 rounded-full object-cover" 
                                />
                             </div>
                        </div>
                        <span class="text-xs font-semibold">{{ postItem.de_usuario.username }}</span>
                    </div>
                    <button @click="openBlockedModal">
                        <UIcon name="i-lucide-more-horizontal" class="w-5 h-5" />
                    </button>
                </div>

                <!-- Image/Content -->
                <div class="w-full bg-zinc-900 aspect-square relative">
                     <img 
                        v-if="postItem.post.image_url"
                        :src="getProxyUrl(postItem.post.image_url)" 
                        class="w-full h-full object-cover"
                        loading="lazy"
                     />
                     <div v-else class="w-full h-full flex items-center justify-center">
                        <UIcon name="i-lucide-image-off" class="w-10 h-10 text-gray-700" />
                     </div>
                </div>

                <!-- Actions -->
                <div class="px-3 pt-3 flex justify-between items-center mb-2">
                    <div class="flex items-center gap-4">
                        <button @click="openBlockedModal">
                            <UIcon name="i-lucide-heart" class="w-6 h-6 hover:text-gray-400 transition cursor-pointer" />
                        </button>
                        <button @click="openBlockedModal">
                            <UIcon name="i-lucide-message-circle" class="w-6 h-6 -rotate-90 hover:text-gray-400 transition cursor-pointer" />
                        </button>
                        <button @click="openBlockedModal">
                            <UIcon name="i-lucide-send" class="w-6 h-6 hover:text-gray-400 transition cursor-pointer" />
                        </button>
                    </div>
                    <button @click="openBlockedModal">
                         <UIcon name="i-lucide-bookmark" class="w-6 h-6 hover:text-gray-400 transition cursor-pointer" />
                    </button>
                </div>

                <!-- Likes & Caption -->
                <div class="px-3 flex flex-col gap-1">
                    <span v-if="postItem.post.like_count > 0" class="text-sm font-semibold">
                        {{ postItem.post.like_count }} curtidas
                    </span>
                    
                    <div class="text-sm">
                        <span class="font-semibold mr-1">{{ postItem.de_usuario.username }}</span>
                        <span class="text-gray-100" v-html="formatCaption(postItem.post.caption)"></span>
                    </div>

                    <span class="text-[10px] text-gray-500 uppercase mt-1">
                        {{ formatDate(postItem.post.taken_at) }}
                    </span>
                </div>
            </div>
            
        </main>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bg-black border-t border-gray-800 h-[65px] px-6 flex justify-between items-center z-50 shrink-0 relative">
      <button class="flex flex-col items-center justify-center w-10 h-full" @click="openBlockedModal">
        <UIcon name="i-lucide-home" class="w-7 h-7 text-white" /> 
      </button>
      
      <button class="flex flex-col items-center justify-center w-10 h-full" @click="openBlockedModal">
        <UIcon name="i-lucide-search" class="w-7 h-7 text-white" />
      </button>
      
      <button class="flex flex-col items-center justify-center w-10 h-full" @click="openBlockedModal">
         <!-- Reels Video Icon replacement -->
         <svg aria-label="Reels" class="w-7 h-7" color="#fff" fill="#fff" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path></svg>
      </button>
      
      <button class="flex flex-col items-center justify-center w-10 h-full relative" @click="navigateTo({ path: '/direct', query: { username } })">
         <svg aria-label="Mensagens" class="w-7 h-7" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Mensagens</title><path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line></svg>
         <span class="absolute top-2 right-1.5 bg-red-600 text-[10px] font-bold px-1 h-3.5 min-w-[14px] flex items-center justify-center rounded-full border border-black">3</span>
      </button>

      <button class="flex flex-col items-center justify-center w-10 h-full" @click="openBlockedModal">
         <div class="w-7 h-7 rounded-full overflow-hidden border border-gray-500">
             <img 
              v-if="userProfile?.profile_pic_url" 
              :src="getProxyUrl(userProfile.profile_pic_url)" 
              class="w-full h-full object-cover"
             />
             <div v-else class="w-full h-full bg-gray-700"></div>
         </div>
      </button>
    </nav>

    <!-- Fixed Bottom Bar -->
    <div class="absolute bottom-[65px] left-0 w-full bg-[#151517]/95 backdrop-blur-md border-t border-gray-800 p-4 z-40">
        <div class="max-w-[450px] mx-auto flex items-center justify-between gap-4">
             <div class="flex flex-col">
                 <div class="flex items-center gap-2 text-white font-bold text-sm mb-0.5">
                     <UIcon name="i-lucide-zap" class="w-4 h-4 fill-yellow-300 text-yellow-300" />
                     <span>Oferta expira em {{ timerString }}</span>
                     <UIcon name="i-lucide-clock" class="w-3.5 h-3.5 opacity-80" />
                 </div>
                 <span class="text-[10px] text-gray-400 leading-tight">Não saia ou recarregue essa página, a<br>espionagem não pode ser realizada novamente.</span>
             </div>
             
             <button @click="handleVipClick" class="bg-[#584cea] hover:bg-[#4a3fcb] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg whitespace-nowrap leading-tight">
                 Desbloquear<br>Acesso Agora
             </button>
        </div>
    </div>

    <!-- Blocked Action Modal -->
    <div v-if="showBlockedModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6">
       <div class="bg-[#1C1C1E] border border-gray-800 w-full max-w-[320px] rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl relative">
          <!-- Close click outside is standard, but maybe forced interaction? using button to close/navigate -->
          
          <div class="mb-4">
             <UIcon name="i-lucide-triangle-alert" class="w-8 h-8 text-white" />
          </div>
          
          <h3 class="text-white text-lg font-bold mb-2">Ação bloqueada</h3>
          
          <p class="text-gray-400 text-sm mb-6 leading-relaxed">
             Seja um membro VIP do Stalkea.ai para ter acesso aos stories
          </p>
          
          <button @click="handleVipClick" class="w-full bg-[#8A7178] hover:bg-[#9d828a] text-white font-semibold py-3 rounded-xl transition-colors">
             Adquirir Acesso VIP
          </button>
          
          <!-- Optional close button or click outside logic could go here, but for now strict modal -->
          <button @click="showBlockedModal = false" class="absolute top-4 right-4 text-gray-500 hover:text-white">
             <UIcon name="i-lucide-x" class="w-5 h-5" />
          </button>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { StalkeaService } from '~/services/stalkea.service'
import type { InstagramFeedResponse, PerfilPublico, PostItem, PerfilBuscado } from '~/types/instagram'

const route = useRoute()
const username = ref(route.query.username as string)
const feedData = ref<InstagramFeedResponse | null>(null)
const loading = ref(true)
const showBlockedModal = ref(false)

// Derived state
const userProfile = computed<PerfilBuscado | undefined>(() => feedData.value?.perfil_buscado)
const stories = computed<PerfilPublico[]>(() => feedData.value?.lista_perfis_publicos || [])
const posts = computed<PostItem[]>(() => feedData.value?.posts || [])

// Load Billabong font for logo
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.cdnfonts.com/css/billabong' 
    }
  ]
})

const openBlockedModal = () => {
   showBlockedModal.value = true
}

const handleVipClick = () => {
    navigateTo({ 
        path: '/cta',
        query: { username: username.value }
    })
    showBlockedModal.value = false
}

// Timer Logic
const { getRemainingTime } = useAccessTimer()
const remainingMs = ref(0) // Start at 0, will update immediately on mount

const timerString = computed(() => {
    const totalSeconds = Math.floor(remainingMs.value / 1000)
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
})

let timerInterval: any

onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval)
})

// Story logic
const storyLimit = 14

const unlockedStories = computed(() => {
    return stories.value.slice(0, storyLimit)
})

const lockedStories = computed(() => {
    // Determine how many "locked" or extra stories to show
    // response has perfis_na_lista (total) and perfis_publicos.
    // We can just show the rest of the list as locked if we want, or simulate it.
    // If the list is exhausted, we can use the difference between total and current list size.
    if (!feedData.value) return []
    
    // Remaining real items in list
    const remainingInList = stories.value.slice(storyLimit)
    
    // If we want to simulate the "locked" ones based on the count difference:
    const total = feedData.value.perfis_na_lista || 0
    const currentCount = stories.value.length
    const diff = total - currentCount
    
    // Combine real remaining + fake fillers for the "locked" visual
    const locked = [...remainingInList]
    
    // Add placeholders if needed to reach total (optional visual fluff)
    for (let i = 0; i < diff; i++) {
         locked.push({
             username: 'user_locked_' + i,
             full_name: 'Locked User',
             profile_pic_url: '', // Empty will trigger blur placeholder
             is_verified: false
         })
    }
    
    return locked.slice(0, 5) // Limit locked preview to 5
})


const getMaskedUsername = (name: string) => {
    if (!name) return '*******'
    if (name.startsWith('user_locked')) return '*******'
    return name.charAt(0) + '******'
}



const formatCaption = (text: string) => {
    if (!text) return ''
    // Limit lines or chars?
    return text.replace(/\n/g, '<br>')
}

const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Há alguns segundos'
    if (diffInSeconds < 3600) return `Há ${Math.floor(diffInSeconds / 60)} minutos`
    if (diffInSeconds < 86400) return `Há ${Math.floor(diffInSeconds / 3600)} horas`
    return `Há ${Math.floor(diffInSeconds / 86400)} dias`
}

onMounted(async () => {
    // Timer
    remainingMs.value = getRemainingTime()
    timerInterval = setInterval(() => {
        remainingMs.value = getRemainingTime()
    }, 1000)
    
    try {
        loading.value = true
        
        // First, try to get cached data from sessionStorage
        const cachedData = sessionStorage.getItem('stalkeaFeedData')
        if (cachedData) {
            try {
                feedData.value = JSON.parse(cachedData)
                // Clear the cache after using it
                sessionStorage.removeItem('stalkeaFeedData')
                loading.value = false
                return
            } catch (e) {
                console.error('Failed to parse cached data, fetching fresh:', e)
            }
        }
        
        // If no cache or parsing failed, fetch from API
        if (username.value) {
            feedData.value = await StalkeaService.getProfileFeed(username.value)
        }
    } catch (e) {
        console.error("Failed to load feed", e)
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
