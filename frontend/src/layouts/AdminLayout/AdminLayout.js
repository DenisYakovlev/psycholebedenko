import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { UserContext } from "../../contexts";
import { backend_url } from "../../constants";
import { LoadSpinner } from "../../shared";
import SideMenu from "./SideMenu/SideMenu";
import NavBar from "./NavBar/NavBar";
import Container from "react-bootstrap/Container";


export default function AdminLayout(){
    const navigate = useNavigate()
    const {authFetch} = useContext(UserContext)

    // check is user is admin and navigate him to home page
    // if he is not
    useEffect(() => {
        const fetchUser = async () => {
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
            })
            .catch(error => {
                console.log(error)
                navigate("/")
            })
        }
        
        fetchUser()
    }, [])


    return (
        <Container className="p-0" fluid>
            <NavBar/>
            <Container className="p-0 d-flex" fluid>
                <SideMenu />
                <Outlet />
            </Container>
        </Container>
    )
}