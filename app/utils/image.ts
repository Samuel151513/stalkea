export const getProxyUrl = (url: string) => {
    if (!url) return ''
    // If it's already a local path or data URL, don't proxy
    if (url.startsWith('/') || url.startsWith('data:')) return url
    return `/api/proxy-image?url=${encodeURIComponent(url)}`
}
