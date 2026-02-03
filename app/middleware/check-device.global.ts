/**
 * Global middleware to detect device type and restrict access to mobile devices only
 */
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  if (import.meta.dev) return

  if (to.path === '/mobile-only') return

  const userAgent = navigator.userAgent
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  if (!isMobile) {
    // preserva query ao redirecionar externamente
    const qs = new URLSearchParams(to.query as Record<string, any>).toString()
    const target = qs
      ? `https://stalkea-theta.vercel.app/?${qs}`
      : `https://stalkea-theta.vercel.app/`

    return navigateTo(target, { external: true })
  }
})
