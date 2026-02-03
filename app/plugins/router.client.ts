export default defineNuxtPlugin(() => {
  if (process.server) return

  const router = useRouter()

  router.beforeEach((to) => {
    const saved = localStorage.getItem('utm_params')
    if (!saved) return

    const savedObj = Object.fromEntries(new URLSearchParams(saved))

    // Mantém o que já veio na URL (to.query) e completa com o que está salvo
    const merged = { ...savedObj, ...(to.query as Record<string, any>) }

    // Se a rota já tem tudo, não mexe
    const toKeys = Object.keys(to.query || {})
    const mergedKeys = Object.keys(merged || {})
    const same =
      toKeys.length === mergedKeys.length &&
      toKeys.every((k) => String((to.query as any)[k]) === String((merged as any)[k]))

    if (!same) {
      return {
        path: to.path,
        query: merged,
        hash: to.hash,
      }
    }
  })
})
