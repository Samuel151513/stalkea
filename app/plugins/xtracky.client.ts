export default defineNuxtPlugin(() => {
  if (process.server) return

  const s = document.createElement('script')
  s.src = 'https://cdn.jsdelivr.net/gh/xTracky/static@latest/utm-handler.js'
  s.async = true
  s.setAttribute('data-token', '24ae3bea-1356-4d65-8380-b64d3ee28f44')

  document.head.appendChild(s)
})
