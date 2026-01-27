<script setup>
const colorMode = useColorMode()
colorMode.preference = 'dark'

console.log('APP VERSION', APP_VERSION)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ],
  script: [
    {
      src: 'https://analytics.tiktok.com/i18n/pixel/events.js',
      async: true
    }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' }
  ],
  style: [
    { children: 'body { background-color: #0B0B0E; color: #C7C7D1; font-family: "Inter", system-ui, sans-serif; }' }
  ],
  htmlAttrs: {
    lang: 'pt-BR',
    class: 'dark'
  },
  bodyAttrs: {
    class: 'bg-[#0B0B0E] text-[#C7C7D1] antialiased',
    style: 'background-color: #0B0B0E; color: #C7C7D1;'
  }
})

const title = 'Stalkea.AI - Descubra a Verdade'
const description = 'O que seu cônjuge faz quando está no Instagram? Descubra agora de forma 100% anônima.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
})

onMounted(() => {
  if (!window.ttq) {
    window.ttq = []
  }

  window.ttq.push(['init', 'D5RTRI3C77UECCBSD1F0'])
  window.ttq.push(['page'])
})
</script>

<template>
  <UApp>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
