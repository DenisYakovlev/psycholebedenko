import { Outlet } from "react-router";
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner";
import { useContext, useEffect, useState, lazy, Suspense } from "react"
import { UserContext } from "../../contexts"
import LoadSpinner from "../../shared/LoadSpinner";

const NavBar = lazy(() => import("./NavBar"))
const Footer = lazy(() => import("./Footer"))

export default function MainLayout(){
    const {user, refreshToken} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const refresh = async () => {
            const token = await refreshToken()
            setIsLoading(false)
        }

        if(!user){
            setIsLoading(false)
            return 
        }

        refresh()
    }, [])

    return (
        <Suspense fallback={<LoadSpinner />}>
            <Container style={{minWidth: "380px"}} fluid className="p-0">
                    <NavBar />
                    <Outlet />
                    <Footer />
                </Container>
        </Suspense>
    )
}