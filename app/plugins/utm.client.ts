export default defineNuxtPlugin(() => {
  if (process.server) return

  const params = new URLSearchParams(window.location.search)
  if (params.toString()) {
    localStorage.setItem('utm_params', params.toString())
  }
})
