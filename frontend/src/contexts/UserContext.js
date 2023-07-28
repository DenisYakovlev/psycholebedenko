import { createContext, useState, useEffect } from "react"


const backend_url = process.env.REACT_APP_BACKEND_URL

const UserContext = createContext({})

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('tokens')))

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
        const result = await fetch(`${backend_url}/auth/refresh`, {
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
            const _user = {...user, access: data.access}
            setUser({..._user})
            localStorage.setItem('tokens', JSON.stringify({..._user}))
        })
        .catch(error => {
            localStorage.removeItem('tokens')
            setUser(null)
        })
    }

    // Authorized request. Check if token is validand; refresh it if needed. 
    // Refresh token exceptions are handled in refreshToken function
    const authFetch = async (url, params) => {
        const _params = {
            ...params,
            headers: {
                ...params.headers,
                "Authorization": `Bearer ${user?.access}`
            }
        }

        return await fetch(url, _params).then(response => {
            if(response.ok){
                return response
            }
            else if(response.status == 401){
                refreshToken()
                return response
            }
        })
    } 

    return (
        <UserContext.Provider value={{user, setUser, authFetch}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}