/**
 * Global middleware to protect routes from unauthorized access
 * Redirects to CTA if the 5-minute access timer has expired
 * Also prevents searching for new profiles once a search has been initiated
 */
export default defineNuxtRouteMiddleware((to) => {
  if (typeof window === 'undefined') return
  if (import.meta.dev) return

  // 🔥 Mescla UTMs salvos com o query atual
  const saved = localStorage.getItem('utm_params') || ''
  const savedObj = Object.fromEntries(new URLSearchParams(saved))
  const mergedQuery = { ...savedObj, ...(to.query as Record<string, any>) }

  const { isAccessExpired, hasTimerStarted } = useAccessTimer()

  const alwaysAccessible = ['/cta', '/sigilo', '/planos']
  const searchPages = ['/', '/analysis']

  // Se tentar voltar pras páginas de busca depois de iniciar, manda pro CTA mantendo UTMs
  if (searchPages.includes(to.path) && hasTimerStarted()) {
    return navigateTo({
      path: '/cta',
      query: {
        ...mergedQuery,
        reason: 'limit'
      }
    })
  }

  // Não bloqueia essas rotas
  if (
    alwaysAccessible.includes(to.path) ||
    to.path === '/instagram-login' ||
    searchPages.includes(to.path)
  ) {
    return
  }

  // Se expirou, manda pro CTA mantendo UTMs
  if (isAccessExpired()) {
    return navigateTo({
      path: '/cta',
      query: {
        ...mergedQuery,
        expired: 'true'
      }
    })
  }
})
