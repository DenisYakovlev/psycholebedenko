import { createContext, useState, useEffect } from "react"
import { backend_url } from "../constants"


const UserContext = createContext({})

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('tokens')))

    const checkPhoneVerification = async () => {
        if(!user){
            return false
        }

        const response = await authFetch(`${backend_url}/user/phone`, {
            method: "GET"
        })

        if(response.status == 200){
            const data = await response.json()
            return data.phone_number ? true : false
        }
        else{
            return null
        }
    }

    // validate user token
    const tokenIsValid = async () => {
        return await fetch(`${backend_url}/auth/verify`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: `${user.access}`})
        })
        .then(response => {return response.ok})
        .catch(error => console.log(error))
    }

    // refresh token
    const refreshToken = async () => {
        return await fetch(`${backend_url}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({refresh: `${user?.refresh}`})
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }
            
            throw new Error("refresh Token error")
        })
        .then(data => {
            // update user
            const _user = {...user, access: data.access}
            setUser({..._user})
            localStorage.setItem('tokens', JSON.stringify({..._user}))

            return data.access
        })
        .catch(error => {
            localStorage.removeItem('tokens')
            setUser(null)
        })
    }

    // Fetch with user Authorization token. If access token is expired,
    // refreshToken() function will try to refresh access token.
    // If refresh token is expired, it is considered that user is not
    // authorized anymore and must login again for new tokens. 
    // Refresh token errors are handled in refreshToken function.
    const fetchWithCredentials = async (url, params) => {
        const response = await fetch(url, params)

        // handle token refresh
        if(response.status == 401){
            try{
                const token = await refreshToken()

                // resend request
                params.headers = {
                    ...params.headers,
                    "Authorization": `Bearer ${token}`
                }

                return await fetch(url, params)
            }
            catch(error){
                // user is sign out. Do something here
                return null
            }
        }

        return response
    }

    // Authorized request with user access token
    const authFetch = async (url, params) => {
        params.headers = {
            ...params.headers,
            "Authorization": `Bearer ${user?.access}`
        }

        return await fetchWithCredentials(url, params)
    }

    // Public request. User can be both authorized and not.
    const publicFetch = async (url, params) => {
        params.headers= {
            ...params.headers,
            "Authorization": user ? `Bearer ${user.access}` : ""
        }

        return await fetchWithCredentials(url, params)
    }

    return (
        <UserContext.Provider value={{user, setUser, authFetch, publicFetch, refreshToken, checkPhoneVerification}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}