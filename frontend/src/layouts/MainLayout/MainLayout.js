import { Outlet } from "react-router";
import Container from "react-bootstrap/Container"
import { useContext, useEffect, useState, lazy, Suspense } from "react"
import { UserContext } from "../../contexts"
import LoadSpinner from "../../shared/Base/LoadSpinner";
import useApi from "../../hooks/useApi";

const NavBar = lazy(() => import("./Components/NavBar"))
const Footer = lazy(() => import("./Components/Footer"))


export default function MainLayout(){
    const {user} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const { verifyToken, refreshToken} = useApi()

    useEffect(() => {
        const refresh = async () => {
            setIsLoading(true)
            const tokenIsValid = await verifyToken()

            if(!tokenIsValid){
                await refreshToken()
            }
            setIsLoading(false)
        }

        if(!user){
            return 
        }

        refresh()
    }, [])

    return (
        isLoading ?
            <LoadSpinner />
            :
            <Suspense fallback={<LoadSpinner />}>
                <Container  fluid className="p-0">
                    <NavBar />
                    <Outlet />
                    <Footer />
                </Container>
            </Suspense>
    )
}