import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { backend_url } from "../constants"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import { AlertContext } from "../contexts";
const moment = require("moment-timezone")



export default function useApi(){
    const {user, setUser} = useContext(UserContext)
    const {showAlert} = useContext(AlertContext)
    let navigate = useNavigate()

    // validate user token
    const verifyToken = async () => {
        return await fetch(`${backend_url}/auth/verify`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: `${user.access}`})
        })
        .then(response => response.ok)
        .catch(error => console.log(error))
    }

    // check if token is expired
    // threshold is extra value in seconds for token exp date
    const checkIfExpired = async () => {
        const decodedToken = jwt_decode(user.access)
        const threshold = 60

        return moment().tz("Europe/Kiev").unix() + threshold < decodedToken.exp
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

    // manage token validation and refresh
    // refresh errors are handled in refreshToken function
    const getToken = async () => {
        const tokenIsValid = await checkIfExpired()
        
        if(tokenIsValid){
            return user.access
        }
        else{
            const newToken = await refreshToken()
            return newToken
        }
    }

    // manage token validation/refresh and return args for auth fetch
    const getAuthArgs = async (url, params, method) => {
        const _url = `${backend_url}/${url}`
        const token = await getToken()
        const _params = {
            ...params,
            headers: {
                ...params?.headers,
                "Authorization": `Bearer ${token}`
            },
            method: method
        }

        return {_url, _params}
    }

    // manage/skip token validation/refresh and return args for public fetch
    // used for api calls that can be both authorized and not
    const getPublicArgs = async (url, params, method) => {
        const _url = `${backend_url}/${url}`
        const token = user ? await getToken() : null
        const _params = {
            ...params,
            headers: {
                ...params?.headers,
                "Authorization": token ? `Bearer ${token}` : ""
            },
            method: method
        }

        return {_url, _params}
    }

    // auth fetch with error handling
    const genericAuthFetch = async (url, params, method) => {
        const {_url, _params} = await getAuthArgs(url, params, method)

        return await fetch(_url, _params)
        .then(response => {
            if(response.ok){
                return response.json()
            }

            return response.json().then(data => {throw new Error(JSON.stringify(data))})
        })
        .catch(error => {
            console.log(error)
            showAlert(error.toString())
        })
    }

    // public fetch with error handling
    const genericPublicFetch = async(url, params, method) => {
        const {_url, _params} = await getPublicArgs(url, params, method)

        return await fetch(_url, _params)
        .then(response => {
            if(response.ok){
                return response.json()
            }

            return response.json().then(data => {throw new Error(JSON.stringify(data))})
        })
        .catch(error => {
            console.log(error)
            showAlert(error.toString())
        })
    }

    // auth fetch without error handling
    const _baseAuthFetch = async (url, params, method) => {
        const {_url, _params} = await getAuthArgs(url, params, method)

        return await fetch(_url, _params)
    }

    // public fetch without error handling
    const _basePublicFetch = async (url, params, method) => {
        const {_url, _params} = await getPublicArgs(url, params, method)

        return await fetch(_url, _params)
    }

    // use for api calls with auth tokens
    const authFetch = {
        get: async (url, params) => await genericAuthFetch(url, params, "GET"),
        post: async (url, params) => await genericAuthFetch(url, params, "POST"),
        put: async (url, params) => await genericAuthFetch(url, params, "PUT"),
        delete: async (url, params) => await genericAuthFetch(url, params, "DELETE")
    }

    // use for api calls with/without auth tokens
    const publicFetch = {
        get: async (url, params) => await genericPublicFetch(url, params, "GET"),
        post: async (url, params) => await genericPublicFetch(url, params, "POST"),
        put: async (url, params) => await genericPublicFetch(url, params, "PUT"),
        delete: async (url, params) => await genericPublicFetch(url, params, "DELETE")
    }

    // use for api calls with auth tokens and custom error handling
    const baseAuthFetch = {
        get: async (url, params) => await _baseAuthFetch(url, params, "GET"),
        post: async (url, params) => await _baseAuthFetch(url, params, "POST"),
        put: async (url, params) => await _baseAuthFetch(url, params, "PUT"),
        delete: async (url, params) => await _baseAuthFetch(url, params, "DELETE")
    }

    // use for api calls with/without auth tokens and custom error handling
    const basePublicFetch = {
        get: async (url, params) => await _basePublicFetch(url, params, "GET"),
        post: async (url, params) => await _basePublicFetch(url, params, "POST"),
        put: async (url, params) => await _basePublicFetch(url, params, "PUT"),
        delete: async (url, params) => await _basePublicFetch(url, params, "DELETE")
    }

    return { authFetch, publicFetch, baseAuthFetch, basePublicFetch, verifyToken, refreshToken }
}