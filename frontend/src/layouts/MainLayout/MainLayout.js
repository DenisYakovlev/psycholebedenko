import { Outlet } from "react-router";
import Container from "react-bootstrap/Container"

import NavBar from "./NavBar";
import Footer from "./Footer";

export default function MainLayout(){
    return (
        <Container style={{minWidth: "350px"}} fluid className="p-0">
            <NavBar />
            <Outlet />
            <Footer />
        </Container>
    )
}