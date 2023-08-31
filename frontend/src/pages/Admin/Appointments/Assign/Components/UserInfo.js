import { useContext, useEffect, useState } from "react"
import LayoutMainWrapper from "../LayoutMainWrapper"
import Container from "react-bootstrap/Container"
import { UserContext } from "../../../../../contexts"
import { backend_url } from "../../../../../constants"


export default function UserInfo({userId}){
    const {authFetch} = useContext(UserContext)
    const [userData, setUserData] = useState(null)

    const fetchUser = () => {
        if(!userId){
            return
        }

        authFetch(`${backend_url}/user/info/${userId}`, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Admin user info fetch error")
        })
        .then(data => setUserData(data))
        .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        fetchUser()
    }, [userId])


    return (
        <Container className="p-0 d-flex flex-column">
            <LayoutMainWrapper.Card.Text>
                Ім'я: {userData?.user?.first_name ? userData.user.first_name : ""}
            </LayoutMainWrapper.Card.Text>

            <LayoutMainWrapper.Card.Text>
                Номер телефона: {userData?.user?.phone_number ? userData.user.phone_number : ""}
            </LayoutMainWrapper.Card.Text>

            <LayoutMainWrapper.Card.Text>
                Юзернейм: {userData?.user?.username ? userData.user.username : ""}
            </LayoutMainWrapper.Card.Text>
        </Container>
    )
}