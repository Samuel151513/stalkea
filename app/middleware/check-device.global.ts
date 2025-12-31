/**
 * Global middleware to detect device type and restrict access to mobile devices only
 */
export default defineNuxtRouteMiddleware((to) => {
    // Skip if already on the mobile-only page to avoid redirect loops
    if (to.path === '/mobile-only') {
        return
    }

    let userAgent = ''

    if (import.meta.server) {
        // On server, get UA from headers
        const headers = useRequestHeaders(['user-agent'])
        userAgent = headers['user-agent'] || ''
    } else {
        // On client, get UA from navigator
        userAgent = navigator.userAgent
    }

    // Comprehensive mobile regex
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

    console.log('Device Check:', { path: to.path, userAgent, isMobile, server: import.meta.server })

    // If not mobile, redirect to mobile-only page
    if (!isMobile) {
        console.log('Redirecting to google')
        return navigateTo('https://google.com.br', { external: true })
    }
})
