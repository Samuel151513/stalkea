/**
 * Global middleware to detect device type and restrict access to mobile devices only
 */
export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.server) {
        return
    }
    // Skip if already on the mobile-only page to avoid redirect loops
    if (to.path === '/mobile-only') {
        return
    }

    const userAgent = navigator.userAgent

    // Comprehensive mobile regex
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

    console.log('Device Check:', { path: to.path, userAgent, isMobile })

    // If not mobile, redirect to mobile-only page
    if (!isMobile) {
        console.log('Redirecting to google')
        return navigateTo('https://google.com.br', { external: true })
    }
})
