import { Suspense, useContext, useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import { UserContext } from "../../contexts"
import LoadSpinner from "../LoadSpinner"


const backend_url = process.env.REACT_APP_BACKEND_URL 

const styles = {
    card: {
        maxWidth: "80vw",
        width: "500px",
        minHeight: "80vh",
        height: "fit-content",
    }
}

export default function AppointmentForm(){
    const {user, authFetch} = useContext(UserContext)
    const [phone, setPhone] = useState()

    const fetchUserPhone = () => {
        authFetch(`${backend_url}/user/phone`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => setPhone(data.phone_number))
    }

    useEffect(() => {
        if(!user){
            return 
        }

        fetchUserPhone()
    }, [])

    useEffect(() => {
        fetchUserPhone()
    }, [user])

    return (
        <Suspense fallback={<LoadSpinner />}>
            <Card style={styles.card} bg="light" data-bs-theme="light" className="m-0 p-0 shadow border-0">
                <Card.Header className="p-0 mx-auto mt-5 fs-2 fw-bold bg-light border-0">
                    Запис на прийом
                </Card.Header>
                <Card.Body className="m-0 p-0 d-flex flex-column justify-content-center align-items-center">
                    <Card.Text className="p-0 mb-3 fs-5 text-muted text-justify text-center">
                        Side Text
                    </Card.Text>
                </Card.Body>
            </Card>  
        </Suspense>
    )
}