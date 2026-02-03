export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const url = query.url as string

    if (!url) {
        throw createError({
            statusCode: 400,
            statusMessage: 'URL is required'
        })
    }

    try {
        const response = await fetch(url, {
            headers: {
                // Mimic a browser request to avoid some basic bot detection if necessary, 
                // though usually not needed for public CDN images.
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
            }
        })

        if (!response.ok) {
            throw createError({
                statusCode: response.status,
                statusMessage: 'Failed to fetch image'
            })
        }

        // Forward important headers
        const contentType = response.headers.get('content-type')
        if (contentType) {
            setHeader(event, 'Content-Type', contentType)
        }

        // Cache control - cache for a long time as these are static assets
        setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

        return response.body
    } catch (error) {
        console.error('Proxy error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error fetching image'
        })
    }
})
