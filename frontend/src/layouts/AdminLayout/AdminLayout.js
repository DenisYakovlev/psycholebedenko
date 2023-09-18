import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import SideMenu from "./SideMenu/SideMenu";
import NavBar from "./NavBar/NavBar";
import Container from "react-bootstrap/Container";
import useApi from "../../hooks/useApi";


export default function AdminLayout(){
    const navigate = useNavigate()
    const {baseAuthFetch} = useApi()

    // check is user is admin and navigate him to home page
    // if he is not
    useEffect(() => {
        const fetchUser = async () => {
            await baseAuthFetch.get('user/me')
            .then(response => {
                if(response.ok){
                    return response.json()
                }

                throw new Error("User Admin Status fetch error")
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