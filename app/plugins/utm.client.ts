export default defineNuxtPlugin(() => {
  if (process.server) return

  const params = new URLSearchParams(window.location.search)

  if (params.toString()) {
    localStorage.setItem('utm_params', params.toString())
  }

  const saved = localStorage.getItem('utm_params')

  if (saved && !window.location.search.includes(saved)) {
    const newUrl =
      window.location.pathname +
      '?' +
      saved +
      window.location.hash

    window.history.replaceState({}, '', newUrl)
  }
})

