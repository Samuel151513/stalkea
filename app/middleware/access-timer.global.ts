/**
 * Global middleware to protect routes from unauthorized access
 * Redirects to CTA if the 5-minute access timer has expired
 * Also prevents searching for new profiles once a search has been initiated
 */
export default defineNuxtRouteMiddleware((to) => {
    // Only run on client side
    if (typeof window === 'undefined') {
        return
    }

    const { isAccessExpired, hasTimerStarted } = useAccessTimer()

    // Pages that are always accessible (even after timer expires or search starts)
    const alwaysAccessible = ['/cta']

    // Pages that should be blocked once a search has been initiated
    const searchPages = ['/', '/analysis']

    // If user tries to access search pages after already starting a search,
    // redirect them to CTA
    if (searchPages.includes(to.path) && hasTimerStarted()) {
        return navigateTo({
            path: '/cta',
            query: {
                ...to.query,
                reason: 'limit'
            }
        })
    }

    // Skip timer expiration check for always accessible pages and login page
    if (alwaysAccessible.includes(to.path) || to.path === '/instagram-login') {
        return
    }

    // Check if access has expired for protected pages (feed, etc)
    if (isAccessExpired()) {
        return navigateTo({
            path: '/cta',
            query: {
                ...to.query,
                expired: 'true'
            }
        })
    }
})
