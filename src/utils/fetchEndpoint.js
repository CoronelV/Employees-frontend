const API_BASE_URL = 'https://localhost:7055/api'

export const fetchEndpoint = async (url, object = {}, method = 'GET') => {
    try {
        const fullUrl = `${API_BASE_URL}${url}`
        const options = {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        let response
        if (method.toUpperCase() === 'GET') {
            const queryParams = new URLSearchParams()
            Object.keys(object).forEach((key) => {
                if (object[key] !== null && object[key] !== undefined && object[key] !== '') {
                    queryParams.append(key, object[key])
                }
            })
            const queryString = queryParams.toString()
            const finalUrl = queryString ? `${fullUrl}?${queryString}` : fullUrl

            response = await fetch(finalUrl, options)
        } else if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
            options.body = JSON.stringify(object)
            response = await fetch(fullUrl, options)
        } else {
            throw new Error(`Método HTTP no soportado: ${method}`)
        }

        const result = await response.json()

        if (!response.ok || result.status === false || result.status === 'error') {
            const errorMessage = result.message || `Error en la petición: ${response.status}`
            const error = new Error(errorMessage)
            error.response = result
            throw error
        }

        return result.data
    } catch (error) {
        console.error('Error en fetchEndpoint:', error)
        throw error
    }
}

