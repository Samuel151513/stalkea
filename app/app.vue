<script setup>
import { useRouter } from 'vue-router'

const colorMode = useColorMode()
colorMode.preference = 'dark'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  script: [
    {
      children: `!function (w, d, t) {
  w.TiktokAnalyticsObject=t;
  var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}; 
  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.load=function(e){
    var n=document.createElement("script");
    n.async=!0;
    n.src="https://analytics.tiktok.com/i18n/pixel/events.js?sdkid="+e+"&lib="+t;
    var s=document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(n,s)
  };
  ttq.load('D5RTRI3C77UECCBSD1F0');
}(window, document, 'ttq');`
    }
  ]
})

const router = useRouter()

onMounted(() => {
  if (window.ttq) {
    window.ttq.page()
  }
})

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    if (window.ttq) {
      window.ttq.page()
    }
  }
)
</script>

<template>
  <NuxtPage />
</template>
