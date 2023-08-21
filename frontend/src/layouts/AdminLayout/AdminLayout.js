import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { UserContext } from "../../contexts";
import { backend_url } from "../../constants";
import { LoadSpinner } from "../../shared";


export default function AdminLayout(){
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const {authFetch} = useContext(UserContext)

    // check is user is admin and navigate him to home page
    // if he is not
    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true) 

            await authFetch(`${backend_url}/user/me`, {
                method: "GET"
            })
            .then(response => {
                if(response.ok){
                    return response.json()
                }
    
                throw new Error("user admin status fetch error")
            })
            .then(user => {
                if(!user.is_staff){
                    throw new Error("user is not admin")
                }
                console.log("admin is here")
            })
            .catch(error => {
                console.log(error)
                navigate("/")
            })

            setIsLoading(false)
        }
        
        fetchUser()
    }, [])


    if(isLoading){
        return <LoadSpinner />
    }


    return (
        <Outlet />
    )
}