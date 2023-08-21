import { Outlet } from "react-router";
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner";
import { useContext, useEffect, useState, lazy, Suspense } from "react"
import { UserContext } from "../../contexts"
import LoadSpinner from "../../shared/Base/LoadSpinner";

const NavBar = lazy(() => import("./Components/NavBar"))
const Footer = lazy(() => import("./Components/Footer"))

export default function MainLayout(){
    const {user, refreshToken} = useContext(UserContext)

    useEffect(() => {
        const refresh = async () => {
            await refreshToken()
        }

        if(!user){
            return 
        }

        refresh()
    }, [])

    return (
        <Suspense fallback={<LoadSpinner />}>
            <Container  fluid className="p-0">
                    <NavBar />
                    <Outlet />
                    <Footer />
                </Container>
        </Suspense>
    )
}