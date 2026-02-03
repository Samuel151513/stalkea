export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return

  nuxtApp.$router.beforeEach((to, from, next) => {
    const saved = localStorage.getItem('utm_params')

    if (saved && Object.keys(to.query).length === 0) {
      const params = Object.fromEntries(new URLSearchParams(saved))
      next({
        path: to.path,
        query: params,
        hash: to.hash,
      })
    } else {
      next()
    }
  })
})
