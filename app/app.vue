<script setup>
useHead({
  script: [
    {
      children: `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;
  var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
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
  ttq.page();
}(window, document, 'ttq');
      `
    }
  ]
})
</script>

<template>
  <NuxtPage />
</template>
