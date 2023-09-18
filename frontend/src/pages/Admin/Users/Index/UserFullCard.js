import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import CardLayout from "./CardLayout"
import { Tag } from "../../../../shared"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { faTelegram } from "@fortawesome/free-brands-svg-icons"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../contexts"
import { backend_url } from "../../../../constants"
import useApi from "../../../../hooks/useApi"


export default function UserFullCard({userId}){
    const {authFetch} = useContext(UserContext)
    const [userData, setUserData] = useState(null) 
    const {api} = useApi()


    const handleTelegramRedirect = () => {
        const url = `https://t.me/${user.phone_number}`
        window.open(url, "_blank")
    }

    // useEffect(() => {
    //     api.auth.get(`user/info/${userId}`)
    //     .then(data => setUserData(data))
    // }, [userId])

    useEffect(() => {
        authFetch(`${backend_url}/user/info/${userId}`, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Admin user full info fetch error")
        })
        .then(data => setUserData(data))
        .catch(error => console.log(error))
    }, [userId])

    if(!userData){
        return <></>
    }

    // separate user data
    const {user, events, appointments} = userData

    return (
        <CardLayout>
            <CardLayout.Body>
                <Card.Img src={user.photo_url ? user.photo_url : ""} style={{width: "250px", height: "250px"}} alt="user picture"/>

                <CardLayout.Body.Header>
                    <Card.Text className="m-0 p-0 fs-2 text-dark fw-semibold">
                        {`${user.first_name ? user.first_name : ""} ${user.last_name ? user.last_name : ""}`}
                    </Card.Text>
                    <Card.Text className="m-0 p-0 fs-3 text-muted">
                        {`${user.username ? "@" + user.username : ""}`}
                    </Card.Text>

                    <Button 
                        onClick={handleTelegramRedirect}
                        disabled={!user.phone_number}
                        className="mt-3" 
                        variant="outline-dark" 
                        size="lg"
                    >
                        Написати <FontAwesomeIcon icon={faTelegram}/> 
                    </Button>
                </CardLayout.Body.Header>

                <CardLayout.Body.Stats>
                    <Container 
                        as={Link} 
                        to={appointments.link} 
                        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center text-decoration-none"
                    >
                        <Card.Text className="m-0 p-0 fs-5 text-dark fw-semibold">
                            {appointments.count}
                        </Card.Text>
                        <Card.Text className="m-0 p-0 fs-6 text-muted">
                            консультацій
                        </Card.Text>
                    </Container>
                    <Container 
                        as={Link} 
                        to={events.link} 
                        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center text-decoration-none"
                    >
                        <Card.Text className="m-0 p-0 fs-5 text-dark fw-semibold">
                            {events.count}
                        </Card.Text>
                        <Card.Text className="m-0 p-0 fs-6 text-muted">
                            івентів
                        </Card.Text>
                    </Container>
                </CardLayout.Body.Stats>

                <CardLayout.Body.Info>
                    <Tag icon={faPhone}>
                        {user.phone_number ? user.phone_number : ""}
                    </Tag>
                </CardLayout.Body.Info>

                <Button 
                    as={Link} to={`/admin/appointments/assign?user=${encodeURIComponent(JSON.stringify(user))}`} 
                    variant="outline-dark" size="md" 
                    className="text-decoration-none"
                >
                    Записати Користувача<br />
                    на Консультацію
                </Button>
            </CardLayout.Body>
        </CardLayout>
    )
}