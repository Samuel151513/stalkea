export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const username = query.username as string

    if (!username) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Username is required'
        })
    }

    const config = useRuntimeConfig()

    try {
        const response = await $fetch('https://stalkea.ai/api/instagram.php', {
            method: 'GET',
            query: {
                tipo: 'perfil',
                username: username
            },
            headers: {
                'accept': 'application/json',
                'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                'priority': 'u=1, i',
                'referer': 'https://stalkea.ai/',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1'
            }
        })

        return response
    } catch (error) {
        console.error('Proxy Error:', error)
        throw createError({
            statusCode: 502,
            statusMessage: 'Failed to fetch from upstream',
            data: error
        })
    }

})
