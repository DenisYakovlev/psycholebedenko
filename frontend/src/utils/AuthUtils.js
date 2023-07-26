const backend_url = process.env.REACT_APP_BACKEND_URL

const getTokens = () => {
    try{
        const tokens = JSON.parse(localStorage.getItem("tokens"))
        return tokens
    }
    catch(errors){
        console.log(errors)
    }
}

const getParams = params => {
    const tokens = getTokens()

    return {
        ...params,
        headers: {
            ...params.headers,
            "Authorization": `Bearer ${tokens.access}`
        }
    }
}

const tokenIsValid = async () => {
    const tokens = getTokens()

    return await fetch(`${backend_url}/auth/verify`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({token: `${tokens.access}`})
    })
    .then(response => response.ok)
}

const refreshToken = async () => {
    const tokens = getTokens()

    return await fetch(`${backend_url}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({refresh: `${tokens.refresh}`})
    })
    .then(response => {
        if(response.ok){
            return response.json()
        }
        
        throw new Error("refresh Token error")
    })
    .then(data => {
        localStorage.setItem('tokens', JSON.stringify({...tokens, access: data.access}))
    })
    .catch(error => console.log(error))
}

const authFetch = async (url, params) => {
    const isValid = await tokenIsValid()
    if (isValid){
        return fetch(url, getParams(params))
    }
    
    await refreshToken()
    return fetch(url, getParams(params))
} 

export {authFetch, refreshToken, tokenIsValid}