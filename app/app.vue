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
      children: `!function (w, d, t) {
  w.TiktokAnalyticsObject=t;
  var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}; 
  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.instance=function(t){
    for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);
    return e
  };
  ttq.load=function(e,n){
    var r="https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i=ttq._i||{};
    ttq._i[e]=[];
    ttq._i[e]._u=r;
    ttq._t=ttq._t||{};
    ttq._t[e]=+new Date;
    ttq._o=ttq._o||{};
    ttq._o[e]=n||{};
    n=document.createElement("script");
    n.type="text/javascript";
    n.async=!0;
    n.src=r+"?sdkid="+e+"&lib="+t;
    e=document.getElementsByTagName("script")[0];
    e.parentNode.insertBefore(n,e)
  };

  ttq.load('D5RTRI3C77UECCBSD1F0');
  ttq.page();
}(window, document, 'ttq');`
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
  if (window.ttq) {
    window.ttq.page()
  }
})
</script>

<template>
  <UApp>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
